# Idea Vault

Idea Vault is a platform that allows users to share their ideas with others.

## Getting Started

### Prerequisites

- Node.js (v20 or later)
- NPM (v8 or later)
- Nest CLI
- Docker and Docker Compose (for running with Docker)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/idea-vault.git
   cd idea-vault
   ```
2. Install dependencies:
   ```bash
   $ npm install
   ```
3. Set up the environment variables:
   ```bash
    $ cp .env.example .env
   ```
   modify the values in the .env file using your own values.

### Running the app

#### Without Docker

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

#### With Docker

1. make sure you have docker and docker-compose installed
2. build and start the docker containers

```bash
$ docker-compose up --build
```

3. navigate to http://localhost:3000

### Database Setup using Docker (development)

1. Start a PostgreSQL container:

```bash
npm run postgres
```

2. Create a database and user

```bash
npm run createdb
```

3. To drop the database

```bash
npm run dropdb
```
