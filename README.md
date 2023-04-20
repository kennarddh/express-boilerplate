# Express Boilerplate

## Guide

### Install Dependencies

```bash
npm install
```

### Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number (optional, default: 8080)
PORT=8080

# URL of the Mongo DB (required)
DB_HOST=mongodb://127.0.0.1:27017/express-boilerplate

# JWT secret (required)
JWT_SECRET=

# Refresh token JWT secret (required)
REFRESH_JWT_SECRET=

# JWT secret (optional, default: 60 (1 minute))
JWT_EXPIRE=60

# Refresh token JWT secret (optional, default: 2592000 (30 days))
REFRESH_JWT_EXPIRE=2592000

# Rate limiter max (optional, default: 100)
RATE_LIMITER_MAX=100

# Rate limiter window ms (optional, default: 60000 (1 minute))
RATE_LIMITER_WINDOW_MS=60000

# Logger level (optional, default: info)
LOG_LEVEL=info

# Cors origin separated with comma (default: http://localhost:3000,http://127.0.0.1:3000,http://localhost:8888,http://127.0.0.1:8888)
CORS_ORIGIN="http://localhost:3000,http://127.0.0.1:3000,http://localhost:8888,http://127.0.0.1:8888"
```

### Project Structure

```
src/
 |--Versions/             # Versions List
 |  |--V{/\d+/}/          # Version (Example: V1, V2, V3)
 |  |  |--Controllers/    # Controllers logic
 |  |  |--Routes/         # Routes
 |  |  |--Validations/    # Request data validation schemas
 |--Routes/               # Main Routes
 |--Database/             # Database configuration
 |--Middlewares/          # Custom express middlewares
 |--Models/               # Mongoose models (Data layer)
 |--Utils/                # Utility classes and functions
 |--Swagger/              # Open Api 3 spec
 |--Types/                # Typescript types definition
 |--Services/             # Services
 |--App.ts                # Express app
 |--index.ts              # Entry
```

## Available Scripts

In the project directory, you can run:

### Start Development Server

```bash
npm start
```

### Load Test

```bash
npm run loadtest
```

### Build Production

build the project for production.

```bash
npm run build:production
```

### Build Development

build the project for development.

```bash
npm run build:development
```

### Build Swagger

Bundle open api spec.

```bash
npm run build:swagger
```

### Preview Swagger

Preview open api spec.

```bash
npm run preview:swagger
```

### Clean

Removes all the files generated by the build process.

```bash
npm run clean
```

### Clean Logs

Removes all logs.

```bash
npm run clean:logs
```

### Clean Dist

Removes dist directory.
Directory created to temporarily store tsc compiled output

```bash
npm run clean:dist
```

### Clean Coverage

Removes jest coverage result.

```bash
npm run clean:coverage
```

### Lint Check

Finds lint errors in your code.

```bash
npm run lint:check
```

### Lint Fix

Fix linting errors.

```bash
npm run lint:fix
```

### Prettier fix

Fix the code formatting.

```bash
npm run prettier:fix
```

### Prettier check

Check the code formatting.

```bash
npm run prettier:check
```

### Test

Run all tests

```bash
npm run test
```

### Watch test

Watch changed test

```bash
npm run test:watch
```

### Watch all test

Watch all test

```bash
npm run test:watch:all
```

### Test coverage

Run test coverage

```bash
npm run test:coverage
```

### Test changed

Run tests related to changed files based on git (uncommitted files)

```bash
npm run test:changed
```
