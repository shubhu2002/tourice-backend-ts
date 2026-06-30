# Tourice Backend

REST API for the Tourice travel and tour booking platform. Built with Express.js and TypeScript.

## Tech Stack

- **Runtime:** Node.js + TypeScript (ES Modules)
- **Framework:** Express.js
- **Database:** MongoDB Atlas (Mongoose)
- **Auth:** JWT + bcryptjs
- **Validation:** Zod
- **Package Manager:** pnpm

## Project Structure

```
server/
├── src/
│   ├── controllers/
│   │   ├── authController.ts        # Register & login
│   │   ├── tourController.ts        # Tour CRUD + search
│   │   ├── bookingController.ts     # Create & fetch bookings
│   │   ├── userConrtoller.ts        # User CRUD
│   │   └── subscribeController.ts   # Newsletter subscription
│   ├── models/
│   │   ├── Users.ts                 # User schema
│   │   ├── Tours.ts                 # Tour schema
│   │   ├── Bookings.ts              # Booking schema
│   │   └── Subscribe.ts             # Newsletter schema
│   ├── routes/
│   │   ├── authRouter.ts
│   │   ├── toursRouter.ts
│   │   ├── usersRouter.ts
│   │   ├── bookingRouter.ts
│   │   └── subscribeRoute.ts
│   ├── mongoose/
│   │   └── index.ts                 # MongoDB connection
│   ├── types/
│   │   └── index.ts                 # TypeScript interfaces & Zod schemas
│   ├── utils/
│   │   ├── hashPassword.ts          # bcryptjs hash & compare
│   │   └── jwt.ts                   # JWT generation & verification
│   └── app.ts                       # Express app entry point
├── dist/                            # Compiled JS output
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm
- MongoDB instance (local or Atlas)

### Installation

```bash
cd server
pnpm install
```

### Environment Variables

Create a `.env` file inside `server/`:

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
ADMIN_EMAIL=admin@example.com
NODE_ENV=development
```

### Running

```bash
# Development (watch mode + hot reload)
pnpm dev

# Production
pnpm build
pnpm start

# Type check
pnpm typescript

# Format code
pnpm format
```

## API Endpoints

Base URL: `/api/v1`

### Auth `/api/v1/auth`

| Method | Endpoint    | Description              |
|--------|-------------|--------------------------|
| POST   | `/register` | Register a new user      |
| POST   | `/login`    | Login (returns JWT cookie) |

### Tours `/api/v1/tour`

| Method | Endpoint             | Description            |
|--------|----------------------|------------------------|
| POST   | `/create`            | Create a tour          |
| GET    | `/all`               | Get all tours          |
| GET    | `/featured`          | Get featured tours     |
| GET    | `/search/id/:id`     | Get tour by ID         |
| GET    | `/search/title/:title` | Get tour by title    |
| PUT    | `/:id`               | Update a tour          |
| DELETE | `/:id`               | Delete a tour          |

### Users `/api/v1/user`

| Method | Endpoint      | Description        |
|--------|---------------|--------------------|
| POST   | `/create`     | Create a user      |
| GET    | `/all`        | Get all users      |
| GET    | `/search/:id` | Get user by ID     |
| PUT    | `/:id`        | Update a user      |
| DELETE | `/:id`        | Delete a user      |

### Bookings `/api/v1/booking`

| Method | Endpoint      | Description                  |
|--------|---------------|------------------------------|
| POST   | `/create`     | Create a booking             |
| GET    | `/search/:id` | Get all bookings by user ID  |

### Subscribe `/api/v1/subscribe`

| Method | Endpoint  | Description                  |
|--------|-----------|------------------------------|
| POST   | `/create` | Subscribe email to newsletter |

## Authentication

Login returns a JWT token set as an HTTP-only cookie. The token includes the user ID, email, and admin flag, and expires after 3 days.

## License

MIT
