# Local Development And Testing

This guide describes how to run ManateeWatch locally and how to run the current backend and frontend test suites.

## Prerequisites

- Python 3.11 or newer
- Node.js and npm
- PostgreSQL running locally
- Git

The backend is configured for PostgreSQL. There is no SQLite fallback in the current Django settings.

## Backend Setup

Create and activate a Python virtual environment from the repo root:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
```

Create a local PostgreSQL database and user. One simple local setup is:

```bash
createuser --createdb manateewatch_local
createdb --owner=manateewatch_local manateewatch_local
```

Then create `backend/.env.local`. Django loads this file before `backend/.env`, so local settings can override production-like settings without editing shared files.

```env
DJANGO_SECRET_KEY=local-dev-secret-key
DEBUG=True
DB_NAME=manateewatch_local
DB_USER=manateewatch_local
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=5432
FRONTEND_URL=http://localhost:3000
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
```

If your local PostgreSQL user needs a password, set `DB_PASSWORD` to that value.

Run migrations:

```bash
cd backend
python manage.py migrate
```

Optional: load fixture data or generate test data.

```bash
python manage.py loaddata map_app/fixtures/sighting_data.json
python manage.py create_test_data --users 5 --sightings 20
```

Start the backend:

```bash
python manage.py runserver
```

The Django API should now be available at `http://localhost:8000/api/v1/`.

## Frontend Setup

Install dependencies:

```bash
cd frontend
npm install
```

Start the React dev server against the local backend:

```bash
REACT_APP_API_URL=http://localhost:8000 npm start
```

The app should open at `http://localhost:3000`.

To point the local frontend at production instead:

```bash
REACT_APP_API_URL=https://manateewatch.com npm start
```

## One-Command Startup Helper

The repo includes `startup.py`, which can install backend requirements, run migrations, create sample data, and open terminal tabs for the backend and frontend.

```bash
source .venv/bin/activate
python startup.py
```

This helper is macOS-oriented because it uses AppleScript to open Terminal tabs.

## Backend Tests

Run Django tests from the `backend` directory:

```bash
cd backend
python manage.py test
```

Run a specific app or test module:

```bash
python manage.py test map_app
python manage.py test map_app.tests.test_001_get_all_sighting_data
```

The backend tests use Django's test database. Your local PostgreSQL user must be able to create a test database. If tests fail with a database permission error, grant the local user createdb permission or run tests with a PostgreSQL user that has that privilege.

## Frontend Tests

Run frontend tests from the `frontend` directory:

```bash
cd frontend
npm test -- --watchAll=false
```

The frontend test command uses the repo's Jest configuration from `frontend/package.json` and `frontend/jest.preset.json`.

## Production-Like Docker Check

The production `docker-compose.yml` expects prebuilt images and production-style environment files. For local feature work, prefer running Django and React directly as described above.

If you need to test the compose topology locally, make sure all three services exist and are on the same compose network:

```bash
sudo docker-compose ps
sudo docker-compose up -d backend frontend nginx
sudo docker-compose logs --tail=120 nginx
```

Nginx will fail to start with `host not found in upstream "backend"` if the backend service is missing from the compose network.

## Common Local Issues

- `REACT_APP_API_URL` must be set before starting React. React reads environment variables at startup time.
- Restart React after changing `REACT_APP_API_URL`.
- Keep local values in `backend/.env.local`; do not put local credentials in committed files.
- Dollar signs in `.env` values need to be escaped as `$$` when Docker Compose reads them.
- CORS and CSRF already allow `http://localhost:3000` in Django settings.
