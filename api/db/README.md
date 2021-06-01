# PostgreSQL

We use PostgreSQL 13.x to store data for CompE+.

# Local Development

To run a Postgres instance locally we leverage Docker. The following instructions are based on [this](https://hackernoon.com/dont-install-postgres-docker-pull-postgres-bee20e200198).

## Setup

1. [Install Docker](https://www.docker.com/get-started)
2. Pull down the Postgres Docker image `docker pull postgres:13`
3. Create a directory to serve as the local host mount point for Postgres data files `mkdir -p $HOME/docker/volumes/postgres`
4. Install `psql` via `sudo apt-get install postgresql-client`. This only installs the `psql` client and not the entirity of Postgres which is why we use Docker.
5. Setup a file at `~/.psqlrc` with the following contents:
    ```
    \x
    \pset null 'Ø'
    ```

## Starting Postgres

`docker run --rm --name pg-docker -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=compe-plus -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres:13`

Verify that it is running with `docker ps` or kill it with `docker kill pg-docker`

## Connecting to Postgres

`psql -h localhost -U postgres -d compe-plus` (Password is "postgres")

# Production

In production a Postgres instance is provisioned via a Heroku add-on.

# Migrations

To manage migrations within Postgres we use [golang-migrate](https://github.com/golang-migrate/migrate). Look [here](https://github.com/golang-migrate/migrate/blob/master/database/postgres/TUTORIAL.md) for a decent high-level tutorial of the process.

## Setup

```bash
# Install the tool
cd ~/Downloads
curl -L https://github.com/golang-migrate/migrate/releases/download/v4.14.1/migrate.linux-amd64.tar.gz | tar xvz
mv migrate.linux-amd64.tar.gz /usr/local/bin/migrate

# Make sure it works
migrate --version
```

## Creating a new migration

`migrate create -ext sql -seq -digits 3 -dir db/migrations/ <NAME>`

## Applying a migration locally

`migrate -database 'postgres://postgres:postgres@localhost:5432/compe-plus?sslmode=disable' -path db/migrations up`

# Schema

![Schema](schema.png)
