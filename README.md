# Express Boilerplate

## Guide

### Install Dependencies

```bash
npm install
```

### Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=8080

# URL of the Mongo DB
DB_HOST=mongodb://127.0.0.1:27017/express-boilerplate
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
 |--Validations\    # Request data validation schemas
 |--App.js          # Express app
```

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

### Clean

Removes all the files generated by the build process.

```bash
npm run clean
```

### Start

Start the production server.

```bash
npm start
```

### Lint

Lint the code.

```bash
npm run lint
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
