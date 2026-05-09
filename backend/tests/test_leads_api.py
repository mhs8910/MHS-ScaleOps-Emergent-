"""Backend API tests for MHS-ScaleOps /api/leads endpoints."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://expert-led-courses.preview.emergentagent.com').rstrip('/')


@pytest.fixture
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# Lead creation: POST /api/leads
class TestLeadCreate:
    def test_create_lead_success(self, api_client):
        payload = {
            "name": "TEST_QA Person",
            "email": "qa.lead@example.com",
            "expertise": "Software Engineering",
            "monthly_revenue": "$500 – $2,000 / month",
            "message": "Want to launch a course",
        }
        r = api_client.post(f"{BASE_URL}/api/leads", json=payload, timeout=20)
        assert r.status_code == 200, r.text
        data = r.json()
        # required fields
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["expertise"] == payload["expertise"]
        assert data["monthly_revenue"] == payload["monthly_revenue"]
        assert data["message"] == payload["message"]
        # generated fields
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 10
        assert "created_at" in data
        # email gracefully skipped (RESEND_API_KEY is placeholder)
        assert data["email_status"] == "skipped"
        # no _id leakage
        assert "_id" not in data

    def test_create_lead_minimal_required_only(self, api_client):
        # only required fields (name, email, expertise)
        payload = {
            "name": "TEST_Minimal",
            "email": "min.lead@example.com",
            "expertise": "Frontend dev",
        }
        r = api_client.post(f"{BASE_URL}/api/leads", json=payload, timeout=20)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["monthly_revenue"] is None
        assert data["message"] is None

    def test_create_lead_invalid_email(self, api_client):
        payload = {
            "name": "TEST_Bad Email",
            "email": "not-an-email",
            "expertise": "Coaching",
        }
        r = api_client.post(f"{BASE_URL}/api/leads", json=payload, timeout=15)
        assert r.status_code == 422

    def test_create_lead_missing_name(self, api_client):
        payload = {
            "email": "missing.name@example.com",
            "expertise": "Coaching",
        }
        r = api_client.post(f"{BASE_URL}/api/leads", json=payload, timeout=15)
        assert r.status_code == 422

    def test_create_lead_missing_expertise(self, api_client):
        payload = {
            "name": "TEST_NoExpertise",
            "email": "no.exp@example.com",
        }
        r = api_client.post(f"{BASE_URL}/api/leads", json=payload, timeout=15)
        assert r.status_code == 422


# Listing leads: GET /api/leads
class TestLeadList:
    def test_list_leads_returns_array_no_id_field_sorted_desc(self, api_client):
        # create a lead first
        payload = {
            "name": "TEST_ListProbe",
            "email": "list.probe@example.com",
            "expertise": "QA",
        }
        c = api_client.post(f"{BASE_URL}/api/leads", json=payload, timeout=20)
        assert c.status_code == 200
        created_id = c.json()["id"]

        r = api_client.get(f"{BASE_URL}/api/leads", timeout=15)
        assert r.status_code == 200
        lst = r.json()
        assert isinstance(lst, list)
        # _id absent
        for item in lst:
            assert "_id" not in item
        # newly-created lead present
        ids = [x.get("id") for x in lst]
        assert created_id in ids
        # sorted desc by created_at (parse ISO)
        timestamps = [x.get("created_at") for x in lst if x.get("created_at")]
        assert timestamps == sorted(timestamps, reverse=True)
