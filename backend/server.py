from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend (optional — gracefully no-op if not configured)
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '').strip()
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
NOTIFICATION_EMAIL = os.environ.get('NOTIFICATION_EMAIL', '').strip()

if RESEND_API_KEY and not RESEND_API_KEY.startswith('placeholder'):
    import resend
    resend.api_key = RESEND_API_KEY
    EMAIL_ENABLED = True
else:
    resend = None
    EMAIL_ENABLED = False

app = FastAPI()
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class LeadCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    expertise: str = Field(..., min_length=2, max_length=200)
    monthly_revenue: Optional[str] = Field(None, max_length=80)
    message: Optional[str] = Field(None, max_length=2000)


class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    expertise: str
    monthly_revenue: Optional[str] = None
    message: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    email_status: str = "pending"


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    rows = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for r in rows:
        if isinstance(r['timestamp'], str):
            r['timestamp'] = datetime.fromisoformat(r['timestamp'])
    return rows


def _build_lead_email_html(lead: Lead) -> str:
    return f"""
    <table style="font-family:Manrope,Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0b0e;color:#ffffff;padding:32px;border:1px solid #1e293b;">
      <tr><td>
        <p style="color:#14b8a6;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:600;margin:0 0 8px 0;">MHS-ScaleOps · New Lead</p>
        <h2 style="font-family:Outfit,Arial,sans-serif;font-weight:900;color:#ffffff;font-size:28px;margin:0 0 24px 0;">{lead.name}</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:8px 0;color:#94a3b8;width:140px;">Email</td><td style="padding:8px 0;color:#ffffff;"><a href="mailto:{lead.email}" style="color:#2dd4bf;">{lead.email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#94a3b8;">Expertise</td><td style="padding:8px 0;color:#ffffff;">{lead.expertise}</td></tr>
          <tr><td style="padding:8px 0;color:#94a3b8;">Monthly Revenue</td><td style="padding:8px 0;color:#ffffff;">{lead.monthly_revenue or '—'}</td></tr>
        </table>
        <div style="border-top:1px solid #1e293b;margin:24px 0;"></div>
        <p style="color:#94a3b8;font-size:12px;text-transform:uppercase;letter-spacing:2px;margin:0 0 8px 0;">Message</p>
        <p style="color:#e2e8f0;font-size:15px;line-height:1.6;margin:0;">{(lead.message or '').replace(chr(10), '<br/>') or 'No message provided.'}</p>
        <div style="border-top:1px solid #1e293b;margin:24px 0;"></div>
        <p style="color:#64748b;font-size:11px;margin:0;">Lead ID: {lead.id} · {lead.created_at.isoformat()}</p>
      </td></tr>
    </table>
    """


async def _send_lead_email(lead: Lead) -> str:
    if not EMAIL_ENABLED or not NOTIFICATION_EMAIL:
        return "skipped"
    try:
        params = {
            "from": SENDER_EMAIL,
            "to": [NOTIFICATION_EMAIL],
            "subject": f"New MHS-ScaleOps lead — {lead.name}",
            "html": _build_lead_email_html(lead),
        }
        await asyncio.to_thread(resend.Emails.send, params)
        return "sent"
    except Exception as e:
        logger.error(f"Resend send failed: {e}")
        return f"failed: {str(e)[:120]}"


@api_router.post("/leads", response_model=Lead)
async def create_lead(input: LeadCreate):
    lead = Lead(**input.model_dump())
    doc = lead.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()

    try:
        await db.leads.insert_one(doc)
    except Exception as e:
        logger.error(f"Lead DB insert failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to save lead")

    status = await _send_lead_email(lead)
    if status != lead.email_status:
        lead.email_status = status
        await db.leads.update_one({"id": lead.id}, {"$set": {"email_status": status}})

    return lead


@api_router.get("/leads", response_model=List[Lead])
async def list_leads():
    rows = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for r in rows:
        if isinstance(r.get('created_at'), str):
            r['created_at'] = datetime.fromisoformat(r['created_at'])
    return rows


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
