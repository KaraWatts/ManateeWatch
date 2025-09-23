## Running the Database Locally

This project uses Docker Compose to run a local PostgreSQL database for development and testing. Follow these steps to set up and use the local database:

### 1. Prerequisites

- Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) for your operating system.
- Ensure Docker Compose is available (included with Docker Desktop).

### 2. Environment Variables

- Create or update your local environment file: `backend/.env.local`
- Example contents:
	```
	DB_NAME=local_manatee_db
	DB_USER=postgres
	DB_PASSWORD=LocalManateeWatch
	DB_HOST=db
	DB_PORT=5432
	```

### 3. Start the Database and Backend

From the project root, run:
```sh
docker compose -f docker-compose-dev.yml up
```
This will start the local database and backend services.

### 4. Apply Migrations

Once the containers are running, apply Django migrations to set up the database schema:
```sh
docker compose -f docker-compose-dev.yml exec backend python manage.py migrate
```

### 5. (Optional) Load Initial Data

To load fixture data:
```sh
docker compose -f docker-compose-dev.yml exec backend python manage.py loaddata <fixture_path>
```
Example:
```sh
docker compose -f docker-compose-dev.yml exec backend python manage.py loaddata map_app/fixtures/sighting_data.json
```

### 6. Accessing the Database

- The database runs inside a Docker container and is not exposed to the public.
- To connect using `psql`:
	```sh
	docker compose -f docker-compose-dev.yml exec db psql -U postgres -d local_manatee_db
	```

### 7. Resetting the Database

To remove all data and start fresh:
```sh
docker compose -f docker-compose-dev.yml down -v
docker compose -f docker-compose-dev.yml up
```

### 8. Switching Between Local and Production

- Use separate `.env` files for local and production.
- Update the `env_file` in `docker-compose-dev.yml` to point to your local env file.
