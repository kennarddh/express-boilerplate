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

# Rate limiter max (optional, default: 100)
RATE_LIMITER_MAX=100

# Rate limiter window ms (optional, default: 60000 (1 minute))
RATE_LIMITER_WINDOW_MS=60000

# Logger level (optional, default: info)
LOG_LEVEL=info
```

### Project Structure

```
src\
 |--Controllers\    # Route controllers (controller layer)
 |--Database\       # Database configuration
 |--Middlewares\    # Custom express middlewares
 |--Models\         # Mongoose models (data layer)
 |--Routes\         # Routes
 |--Utils\          # Utility classes and functions
 |--Swagger\        # Open Api 3 spec
 |--Validations\    # Request data validation schemas
 |--Services        # Services
 |--App.js          # Express app
 |--index.js        # Entry
```

## Services Reject Code

-   500 Intenal server error
-   404 Not found

## Available Scripts

In the project directory, you can run:

### Run dev

```bash
npm run dev
```

### Build

build the project for production.

```bash
npm run build
```

### Build Swagger

Bundle open api spec.

```bash
npm run build:swagger
```

### Build Swagger Production

Bundle open api spec for production.

```bash
npm run build:swagger:production
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

### Start

Start the production server.

```bash
npm start
```

### Lint Check

Finds errors in your code.

```bash
npm run lint:check
```

### Lint Fix

Fixes linting errors.

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
