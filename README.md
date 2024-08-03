# Idea Vault

Idea Vault is a platform that allows users to save their ideas and share them with others.

## Live Demo

api : https://ideavault.ridhoafwani.dev/api/

swagger : https://ideavault.ridhoafwani.dev/swagger

## Design Patterns and Architecture

This project implements several design patterns and architectural choices to enhance maintainability, scalability, and adherence to best practices:

1. **Module Pattern**: The application is organized into modules (e.g., UsersModule, IdeasModule, FeedbacksModule) which encapsulate related functionality. This promotes separation of concerns and makes the codebase more manageable.

2. **Dependency Injection**: This app is using NestJS's built-in DI container, dependencies are injected into classes rather than being created inside them. This increases modularity and eases testing.

3. **Repository Pattern**: TypeORM repositories are used to abstract the data layer, providing a clean separation between the database and business logic.

4. **DTO (Data Transfer Object) Pattern**: DTOs like SignupDto and SigninDto are used to define the shape of data for input validation and documentation purposes.

5. **Guard Pattern**: The UsersGuard implements authentication logic, protecting routes that require authenticated access.

6. **Decorator Pattern**: Custom decorators like @GetUser are used to extract and provide user information in a reusable way.

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
