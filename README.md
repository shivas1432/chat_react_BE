# Chat Backend API

This is a backend API for a chat application, built using **Node.js**, **Express**, **JWT Authentication**, **MySQL/PostgreSQL**, and other essential middleware. It is configured for deployment on **Render** with SSL support.

## Features

- User Authentication with JWT
- Password encryption using bcrypt
- Email support with Nodemailer
- SMS functionality via Twilio
- Input validation using Validator
- HTTP request logging with Morgan
- CORS support for cross-origin requests
- Environment variable management using dotenv
- PostgreSQL and MySQL2 support
- SSL-enabled database configuration for Render

## Project Structure

```
.
├── config/               # Database and environment configuration
├── controllers/          # Route logic
├── models/               # DB models and queries
├── routes/               # API route definitions
├── server.js             # Entry point of the application
├── generateJwtSecret.js  # Utility to generate JWT secrets
├── .gitignore            
├── package.json          
└── package-lock.json
```

## Getting Started

### Prerequisites

- Node.js >= 16
- npm
- A PostgreSQL or MySQL database
- Render account (for deployment)

### Installation

```bash
git clone https://github.com/your-username/chat-backend.git
cd chat-backend
npm install
```

### Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_number
```

For Render deployment, your `DATABASE_URL` should contain SSL options:

Example (PostgreSQL):

```
DATABASE_URL=postgres://user:password@host:port/dbname?ssl=true
```

### Running the App

#### Development Mode

```bash
npm run dev
```

#### Production Mode

```bash
npm start
```

## Deployment on Render

1. Push your project to a GitHub repository.
2. Log into [Render](https://render.com/) and create a new Web Service.
3. Connect your GitHub repository.
4. Set the **Build Command** to:

```
npm install
```

5. Set the **Start Command** to:

```
npm start
```

6. Add the environment variables from your `.env` file into the Render dashboard.
7. Make sure your database connection string includes SSL options as mentioned above.

## Available Scripts

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "nodemon server.js",
  "start": "node server.js"
}
```

## Dependencies

- [express](https://www.npmjs.com/package/express)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [cors](https://www.npmjs.com/package/cors)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [mysql2](https://www.npmjs.com/package/mysql2)
- [pg](https://www.npmjs.com/package/pg)
- [morgan](https://www.npmjs.com/package/morgan)
- [validator](https://www.npmjs.com/package/validator)
- [nodemailer](https://www.npmjs.com/package/nodemailer)
- [twilio](https://www.npmjs.com/package/twilio)
- [nodemon](https://www.npmjs.com/package/nodemon) (for development only)

## License

ISC License

---

> Created and maintained by **shivas1432**
