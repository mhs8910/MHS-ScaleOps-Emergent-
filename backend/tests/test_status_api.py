"""Backend API tests for MHS-ScaleOps status endpoints."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://expert-led-courses.preview.emergentagent.com').rstrip('/')


@pytest.fixture
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# Health: GET /api/
class TestHealth:
    def test_root(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert data.get("message") == "Hello World"


# Status CRUD
class TestStatus:
    def test_create_status(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/status", json={"client_name": "TEST_pytest_client"}, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["client_name"] == "TEST_pytest_client"
        assert "id" in data and isinstance(data["id"], str)
        assert "timestamp" in data

    def test_list_status_includes_created(self, api_client):
        # create one
        r = api_client.post(f"{BASE_URL}/api/status", json={"client_name": "TEST_list_client"}, timeout=15)
        assert r.status_code == 200
        created_id = r.json()["id"]

        # list
        r2 = api_client.get(f"{BASE_URL}/api/status", timeout=15)
        assert r2.status_code == 200
        lst = r2.json()
        assert isinstance(lst, list)
        # _id must not be exposed
        for item in lst:
            assert "_id" not in item
        ids = [x.get("id") for x in lst]
        assert created_id in ids

    def test_create_status_validation(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/status", json={}, timeout=15)
        assert r.status_code == 422
