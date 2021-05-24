# PostgreSQL

We use PostgreSQL 13.x to store data for CompE+.

# Local Development

To run a Postgres instance locally we leverage Docker. The following instructions are based on [this](https://hackernoon.com/dont-install-postgres-docker-pull-postgres-bee20e200198).

## Setup

1. [Install Docker](https://www.docker.com/get-started)
2. Pull down the Postgres Docker image `docker pull postgres:13`
3. Create a directory to serve as the local host mount point for Postgres data files `mkdir -p $HOME/docker/volumes/postgres`
4. Install `psql` via `sudo apt-get install postgresql-client`

## Starting Postgres

`docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres:13`

Verify that it is running with `docker ps` or kill it with `docker kill pg-docker`

## Connecting to Postgres

`psql -h localhost -U postgres -d postgres` (Password is "docker")

# Production

In production a Postgres instance is provisioned via a Heroku add-on.

# Migrations

To manage migrations within Postgres we use [golang-migrate](https://github.com/golang-migrate/migrate).

## Setup

```bash
# Install the tool
cd ~/Downloads
curl -L https://github.com/golang-migrate/migrate/releases/download/v4.14.1/migrate.linux-amd64.tar.gz | tar xvz
mv migrate.linux-amd64.tar.gz /usr/local/bin/migrate

# Make sure it works
migrate --version
```

## Performing a migration
