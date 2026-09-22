<h1 align="center">🔐 SecureAuth</h1>

<p align="center">
  A production-grade full-stack authentication system built with Node.js, Express, MongoDB, and React.<br/>
  Featuring JWT token rotation, Google OAuth2, TOTP-based 2FA, role-based access control, and more.
</p>

<p align="center">
  <a href="https://secureauth-fullstack.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/Live%20App-secureauth--fullstack.vercel.app-brightgreen?style=for-the-badge&logo=vercel" alt="Live App"/>
  </a>
  <a href="https://secureauth-8aq1.onrender.com" target="_blank">
    <img src="https://img.shields.io/badge/API-secureauth--8aq1.onrender.com-blue?style=for-the-badge&logo=render" alt="API"/>
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white"/>
  <img src="https://img.shields.io/badge/Passport.js-34E27A?style=flat-square&logo=passport&logoColor=white"/>
</p>

---

## 📸 Screenshots

<table>
  <tr>
    <td align="center"><b>Login Page</b></td>
    <td align="center"><b>Register Page</b></td>
    <td align="center"><b>Forgot Password</b></td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/login_page.png" alt="Login Page" width="280"/></td>
    <td><img src="docs/screenshots/register_page.png" alt="Register Page" width="280"/></td>
    <td><img src="docs/screenshots/forgot_password_page.png" alt="Forgot Password Page" width="280"/></td>
  </tr>
</table>

---

## ✨ Features

| Feature | Description |
|---|---|
| 📧 **Email/Password Auth** | Registration with email verification flow |
| 🔄 **JWT Token Rotation** | Secure access + refresh token rotation |
| 🔑 **Google OAuth2** | Sign in with Google via Passport.js |
| 🔒 **TOTP 2FA** | Time-based one-time password (setup, enable, disable, verify) |
| 📬 **Password Reset** | Email-based secure password reset flow |
| 🛡️ **Role-Based Access** | `user` / `admin` roles with protected routes |
| 👮 **Admin Panel** | List users, view activity logs, unlock accounts, manage roles |
| 📊 **Activity Logging** | Tracks login, register, email verify, and OAuth events |
| 🚦 **Rate Limiting** | General + auth-specific + per-user login rate limiters |
| ✅ **Input Validation** | Joi schema validation on all incoming requests |
| 🛡️ **Security** | Helmet headers, Mongo injection sanitization, bcrypt password hashing |
| 🔐 **Account Lockout** | Auto-locks account after 5 failed login attempts for 15 minutes |

---

## 🏗️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **Node.js / Express 5** | HTTP server and routing |
| **MongoDB / Mongoose** | Database and ODM |
| **Passport.js** | Google OAuth2 strategy |
| **jsonwebtoken** | JWT access and refresh tokens |
| **bcryptjs** | Password hashing |
| **otplib + qrcode** | TOTP 2FA generation and QR codes |
| **express-rate-limit** | Rate limiting |
| **Helmet** | Security HTTP headers |
| **mongo-sanitize** | NoSQL injection protection |
| **Joi** | Request validation |
| **Brevo HTTP API** | Transactional email (bypasses SMTP port blocks) |
| **EJS** | Email template rendering |
| **Swagger / OpenAPI** | API documentation |

### Frontend
| Technology | Purpose |
|---|---|
| **React** | UI library |
| **useAuth** | Custom hook for auth state management |
| **useTwoFactor** | Custom hook for 2FA flows |
| **useAdmin** | Custom hook for admin operations |

### Deployment
| Service | Role |
|---|---|
| **Vercel** | Frontend hosting |
| **Render** | Backend API hosting |
| **MongoDB Atlas** | Cloud database |

---

## 📂 Project Structure

```
AuthAPI/
├── Backend/
│   ├── config/
│   │   └── passport.js          # Google OAuth2 strategy
│   ├── controllers/
│   │   ├── auth.controller.js   # Auth request handlers
│   │   └── user.controller.js   # User request handlers
│   ├── middleware/
│   │   ├── authentication.js    # JWT verification middleware
│   │   ├── authorize.js         # Role-based access control
│   │   ├── rateLimiter.js       # Global rate limiter
│   │   ├── userRateLimiter.js   # Per-user rate limiter
│   │   ├── validator.js         # Joi schema validation
│   │   └── errorHandler.js      # Global error handler
│   ├── models/
│   │   └── users.js             # Mongoose user schema
│   ├── routes/
│   │   ├── auth.routes.js       # /api/auth routes
│   │   └── user.routes.js       # /api/users routes
│   ├── services/
│   │   ├── auth.service.js      # Core authentication logic
│   │   ├── mail.service.js      # Brevo HTTP API email sender
│   │   ├── token.service.js     # JWT generation and revocation
│   │   ├── twoFactor.service.js # TOTP secret and QR generation
│   │   ├── activity.service.js  # Login activity logging
│   │   └── user.service.js      # User CRUD operations
│   ├── utils/
│   │   └── AppError.js          # Custom error class
│   ├── views/emails/            # EJS email templates
│   ├── docs/                    # Swagger/OpenAPI docs
│   ├── __tests__/               # Jest unit tests
│   ├── app.js                   # Express app setup
│   └── server.js                # Server entry point
└── Frontend/
    └── api-frontend/
        ├── src/
        │   ├── components/      # React UI components
        │   ├── hooks/           # useAuth, useTwoFactor, useAdmin
        │   ├── App.jsx          # App root with routing
        │   └── api.js           # Axios API client
        └── public/
```

---

## 🔌 API Endpoints

### Auth — `/api/auth`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/register` | — | Register a new user |
| `POST` | `/login` | — | Login with email and password |
| `POST` | `/logout` | — | Logout and revoke refresh token |
| `GET` | `/verify-email` | — | Verify email via token link |
| `GET` | `/google` | — | Start Google OAuth2 flow |
| `GET` | `/google/callback` | — | Google OAuth2 callback |
| `POST` | `/2fa/verify-login` | — | Verify TOTP code at login |
| `POST` | `/2fa/setup` | ✅ JWT | Generate 2FA QR code |
| `POST` | `/2fa/enable` | ✅ JWT | Enable 2FA |
| `POST` | `/2fa/disable` | ✅ JWT | Disable 2FA |

### Users — `/api/users`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/` | 🔴 Admin | List all users |
| `GET` | `/logs` | 🔴 Admin | View activity logs |
| `GET` | `/:id` | ✅ JWT | Get user by ID |
| `PUT` | `/profile` | ✅ JWT | Update own profile |
| `PUT` | `/:id` | ✅ JWT | Update a user |
| `PUT` | `/:id/role` | 🔴 Admin | Change user role |
| `DELETE` | `/:id` | 🔴 Admin | Delete a user |
| `POST` | `/:id/unlock` | 🔴 Admin | Unlock a locked account |
| `POST` | `/forgot-password` | — | Request password reset email |
| `POST` | `/reset-password/:token` | — | Reset password via token |
| `POST` | `/refresh` | — | Refresh access token |

---

## ⚙️ Environment Variables

Create a `.env` file in `Backend/` (never commit this):

```dotenv
# Server
PORT=5000
CLIENT_URL=https://secureauth-fullstack.vercel.app

# Database
MONGO_URI=your_mongodb_atlas_connection_string

# JWT
JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret

# Google OAuth2
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://secureauth-8aq1.onrender.com/api/auth/google/callback

# Email (Brevo HTTP API)
BREVO_API_KEY=your_brevo_api_key
EMAIL_USER=your_verified_brevo_sender_email
```

> **💡 Why Brevo HTTP API instead of SMTP?**
> Render blocks outbound SMTP ports (25, 465, 587) on free-tier services.
> Sending over Brevo HTTPS API sidesteps that restriction entirely.

---

## 🚀 Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Google Cloud Console project with OAuth2 credentials
- Brevo account for transactional emails

### Backend

```bash
cd Backend
npm install
# Create your .env file (see Environment Variables above)
npm run dev      # Starts with nodemon
```

Server runs at `http://localhost:5000`

### Frontend

```bash
cd Frontend/api-frontend
npm install
npm start        # React dev server
```

App runs at `http://localhost:3000`

---

## 🔐 Authentication Flow

```
User registers → Email verification sent → User verifies email
      ↓
  User logs in → (Optional) 2FA TOTP check → JWT issued
      ↓
  Access token (short-lived) + Refresh token (long-lived, stored in DB)
      ↓
  Access token expires → Client calls /refresh → New token pair issued
      ↓
  User logs out → Refresh token revoked from DB
```

---

## 🛡️ Security Highlights

- **Bcrypt** password hashing with salt rounds
- **Account lockout** after 5 failed login attempts (15-minute lockout)
- **JWT refresh token rotation** — old token invalidated on each refresh
- **Rate limiting** at global, per-route, and per-user levels
- **Helmet** HTTP security headers
- **mongo-sanitize** to prevent NoSQL injection
- **CORS** configured to exact frontend origin
- **`trust proxy: 1`** (not `true`) for correct IP detection behind Render proxy

---

## 📝 Deployment Notes and Lessons Learned

| # | Issue | Solution |
|---|---|---|
| 1 | **CORS errors** | `CLIENT_URL` must exactly match deployed frontend origin (no trailing slash) |
| 2 | **`trust proxy: true` crash** | Use `app.set("trust proxy", 1)` on single-proxy platforms like Render |
| 3 | **Email blocking HTTP response** | Fire email sends without `await`, always wrap in `try/catch` |
| 4 | **SMTP blocked on Render** | Use transactional email provider HTTP API (Brevo, Resend, SendGrid) |
| 5 | **Brevo "IP blocked" error** | Authorize server IP or disable IP authorization in Brevo security settings |
| 6 | **Google OAuth "invalid request"** | `GOOGLE_CALLBACK_URL` must match Google Cloud Console redirect URI character-for-character |

---

## 📄 License

MIT — feel free to use this as a reference or starter for your own auth system.
