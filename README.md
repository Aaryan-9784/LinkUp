# LinkUp

<div align="center">

<img src="frontend/public/linkup-icon.svg" width="96" height="96" alt="LinkUp Logo" />

### Real-Time Encrypted Messaging

**v2.1.0** &nbsp;·&nbsp; MERN Stack &nbsp;·&nbsp; Zero-Knowledge E2EE &nbsp;·&nbsp; WebRTC Calls

[![Node.js](https://img.shields.io/badge/Node.js-≥20.0.0-339933?style=flat-square&logo=node.js)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://mongodb.com)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.8-010101?style=flat-square&logo=socket.io)](https://socket.io)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)

</div>

---

## What is LinkUp?

LinkUp is a full-stack real-time chat application built with the MERN stack. It features **zero-knowledge end-to-end encryption** — messages are encrypted on the client before being sent, so the server stores only opaque ciphertext and never sees your private keys or message content.

On top of secure messaging, LinkUp supports **peer-to-peer voice and video calls** via WebRTC, a contact request system, image sharing, typing indicators, read receipts, and a clean responsive UI with dark/light themes.

---

## Features

### Messaging
- Real-time one-on-one chat over WebSockets (Socket.IO)
- End-to-end encrypted text and images using NaCl box (X25519 + XSalsa20-Poly1305)
- Image sharing via Cloudinary with lightbox preview
- Typing indicators and read receipts (double-check marks)
- Message grouping by sender and date separators
- Drag-and-drop image attachment

### Voice & Video Calls
- Peer-to-peer voice and video calls over WebRTC (DTLS-SRTP encrypted)
- Mute microphone and toggle camera during a call
- Front/back camera flip on mobile
- Picture-in-picture local video preview
- 30-second call timeout with a no-answer notification
- Auto-reject when the peer is busy or offline

### Contacts
- Contact request system — send, accept, decline, and cancel requests
- Remove contacts
- Search users by name or email
- Real-time online presence indicators

### Authentication & Security
- Email + password signup with OTP email verification
- JWT authentication via HTTP-only, SameSite cookies
- OTP-based forgot password and reset password flow
- Arcjet bot detection and rate limiting on all API routes
- Password strength meter on signup
- Automatic cleanup of unverified accounts

### End-to-End Encryption
- Per-message NaCl box encryption (X25519 + XSalsa20-Poly1305)
- 12-word BIP39 recovery phrase generated at signup
- Private key derived from the phrase via PBKDF2-SHA256 (100k iterations)
- Private key wrapped with AES-256-GCM using the user's login password
- Encrypted private key blob stored server-side — server never sees plaintext keys
- Keys decrypted client-side on login and cached in IndexedDB (session-scoped)
- Cache expires on browser close for forward secrecy

### UI / UX
- Blue and white design with dark and light theme support
- Animated split-screen auth page
- Responsive — works on mobile, tablet, and desktop
- Framer Motion page and component transitions
- Keyboard navigation and ARIA labels for accessibility
- Toast notifications for success, error, and info states

---

## Tech Stack

### Frontend

| Package | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| Vite | 8 | Build tool and dev server |
| React Router DOM | 7 | Client-side routing |
| Zustand | 5 | Global state management |
| Socket.IO Client | 4.8 | Real-time WebSocket client |
| Framer Motion | 12 | Animations and transitions |
| TweetNaCl | 1.0 | NaCl box encryption |
| BIP39 | 3.1 | Recovery phrase generation |
| Axios | 1.x | HTTP client |
| Lucide React | 1.0 | Icon library |
| React Hot Toast | 2.6 | Toast notifications |
| date-fns | 4 | Date formatting |

### Backend

| Package | Version | Purpose |
|---|---|---|
| Express | 4.21 | HTTP server and routing |
| Mongoose | 8.10 | MongoDB ODM |
| Socket.IO | 4.8 | Real-time WebSocket server |
| JSON Web Token | 9.0 | Authentication tokens |
| bcryptjs | 2.4 | Password hashing |
| Nodemailer | 6.9 | Transactional email via SMTP |
| Cloudinary | 2.5 | Image upload and hosting |
| Arcjet | beta.10 | Bot protection and rate limiting |
| cookie-parser | 1.4 | HTTP-only cookie parsing |
| dotenv | 16 | Environment variable loading |

---

## Project Structure

```
LinkUp/
├── package.json                        # Root scripts (build, start, versioning)
│
├── backend/
│   ├── scripts/
│   │   ├── cleanupUnverifiedUsers.js   # Manual unverified-account cleanup
│   │   └── resetDatabase.js            # Dev database reset
│   └── src/
│       ├── config/
│       │   ├── env.js                  # Validated environment config
│       │   └── version.js              # App version from package.json
│       ├── controllers/
│       │   ├── auth.controller.js      # Signup, login, OTP, password reset
│       │   ├── contact.controller.js   # Contact requests and management
│       │   ├── encryption.controller.js# Public key fetch and key update
│       │   └── message.controller.js   # Send, fetch, mark-read
│       ├── emails/
│       │   ├── emailHandlers.js        # Nodemailer send helpers
│       │   └── emailTemplates.js       # HTML templates (verify / reset / welcome)
│       ├── lib/
│       │   ├── arcjet.js               # Arcjet client init
│       │   ├── cloudinary.js           # Cloudinary client init
│       │   ├── db.js                   # MongoDB connection
│       │   ├── generateToken.js        # JWT generation and cookie setter
│       │   ├── nodemailer.js           # Nodemailer transport
│       │   └── socket.js              # Socket.IO server + WebRTC signaling
│       ├── middleware/
│       │   ├── arcjet.middleware.js    # Arcjet protection middleware
│       │   └── auth.middleware.js      # JWT protectRoute middleware
│       ├── models/
│       │   ├── contactRequest.model.js # Contact request schema
│       │   ├── message.model.js        # Message schema (ciphertext + nonce)
│       │   └── user.model.js           # User schema (with E2EE key fields)
│       ├── routes/
│       │   ├── auth.route.js           # /api/auth/*
│       │   ├── contact.route.js        # /api/contacts/*
│       │   ├── encryption.route.js     # /api/encryption/*
│       │   └── message.route.js        # /api/message/*
│       ├── services/
│       │   └── cleanupService.js       # Scheduled unverified-account cleanup
│       └── server.js                   # Express app entry point
│
└── frontend/
    ├── public/
    │   ├── linkup-icon.svg             # App icon
    │   └── favicon.svg                 # Browser tab icon
    └── src/
        ├── components/
        │   ├── call/
        │   │   ├── CallView.jsx         # Full-screen call UI
        │   │   └── IncomingCallModal.jsx # Incoming call notification
        │   ├── chat/
        │   │   ├── ChatHeader.jsx       # Header with call buttons
        │   │   ├── EmptyChat.jsx        # Empty state placeholder
        │   │   ├── MessageBubble.jsx    # Single message bubble
        │   │   ├── MessageInput.jsx     # Text and image input bar
        │   │   └── MessageList.jsx      # Message list with grouping
        │   └── shared/
        │       ├── AddContactModal.jsx  # Search and add contacts
        │       ├── Avatar.jsx           # Avatar with online status ring
        │       ├── Button.jsx           # Reusable button component
        │       ├── ContactRequestsModal.jsx  # Pending requests list
        │       ├── ForgotPasswordModal.jsx   # OTP-based password reset
        │       ├── ImageLightbox.jsx    # Full-screen image viewer
        │       ├── Input.jsx            # Styled input component
        │       ├── Logo.jsx             # SVG logo component
        │       ├── RecoveryPhraseModal.jsx   # Shows 12-word phrase at signup
        │       └── VerificationModal.jsx     # OTP entry modal
        ├── lib/
        │   ├── api.js                   # Axios instance with base URL
        │   ├── constants.js             # API endpoint constants
        │   ├── crypto.js                # E2EE logic (NaCl, BIP39, AES-GCM)
        │   └── utils.js                 # Shared utility helpers
        ├── pages/
        │   ├── AuthPage.jsx             # Login / signup split-screen
        │   ├── ChatPage.jsx             # Main chat layout
        │   └── ProfilePage.jsx          # Profile and settings
        ├── store/
        │   ├── useAuthStore.js          # Auth state and E2EE key lifecycle
        │   ├── useCallStore.js          # WebRTC call state machine
        │   ├── useChatStore.js          # Messages and contacts state
        │   ├── useContactStore.js       # Contact request state
        │   ├── useKeyStore.js           # E2EE key management (IndexedDB)
        │   ├── useSocketStore.js        # Socket.IO connection state
        │   ├── useThemeStore.js         # Dark / light theme preference
        │   └── useUIStore.js            # UI state (sidebar, modals)
        ├── App.jsx                      # Routes and auth guards
        ├── index.css                    # Design system and CSS variables
        └── main.jsx                     # App entry point
```

---

## Getting Started

### Prerequisites

- **Node.js ≥ 20.0.0**
- **MongoDB** — Atlas cluster or local instance
- **Cloudinary** account (free tier is fine)
- **Gmail or SMTP** credentials for email sending
- **Arcjet** account for bot protection and rate limiting

### 1. Clone the repo

```bash
git clone https://github.com/your-username/linkup.git
cd linkup
```

### 2. Configure environment variables

Create `backend/.env` with the following:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGO_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_strong_jwt_secret_here

# Email (SMTP / Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
SENDER_EMAIL=your_email@gmail.com
SENDER_NAME=LinkUp Team

# Client origin (used for CORS)
CLIENT_URL=http://localhost:5173

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Arcjet
ARCJET_KEY=your_arcjet_key
```

> For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833) — not your regular account password. Two-factor authentication must be enabled on your Google account first.

### 3. Install dependencies and run

**Development** (two terminals):

```bash
# Terminal 1 — backend (port 3000)
cd backend
npm install
npm run dev

# Terminal 2 — frontend (port 5173)
cd frontend
npm install
npm run dev
```

**Or install everything from the root in one command:**

```bash
npm run build   # installs deps for both + builds the frontend
```

**Production** (single server):

```bash
# From the project root
npm run build   # builds frontend into frontend/dist
npm start       # starts backend, which serves frontend as static files
```

In production the backend serves the compiled frontend on the same port — no separate frontend process needed.

### Database Utility Scripts

Run these from inside the `backend/` directory:

```bash
npm run db:reset            # Wipe and reset the database (dev only)
npm run cleanup:unverified  # Manually remove unverified accounts
```

---

## API Reference

### Auth — `/api/auth`

| Method | Endpoint | Auth Required | Description |
|--------|----------|:---:|-------------|
| POST | `/signup` | — | Register account, sends OTP to email |
| POST | `/verify-email` | — | Verify OTP and store E2EE key material |
| POST | `/resend-otp` | — | Resend verification OTP |
| POST | `/login` | — | Login, returns encrypted key material |
| POST | `/logout` | ✓ | Clear session cookie |
| POST | `/forgot-password` | — | Send password reset OTP |
| POST | `/reset-password` | — | Verify OTP and set new password |
| PUT | `/update-profile` | ✓ | Update name or profile picture |
| GET | `/check` | ✓ | Check current auth status |

### Messages — `/api/message`

| Method | Endpoint | Auth Required | Description |
|--------|----------|:---:|-------------|
| GET | `/contacts` | ✓ | List all contacts for sidebar |
| GET | `/chats` | ✓ | List active chat partners |
| GET | `/:id` | ✓ | Fetch message history with a user |
| POST | `/send/:id` | ✓ | Send an encrypted message |
| PATCH | `/read/:id` | ✓ | Mark messages as read |

### Contacts — `/api/contacts`

| Method | Endpoint | Auth Required | Description |
|--------|----------|:---:|-------------|
| GET | `/requests` | ✓ | Get pending incoming requests |
| GET | `/sent` | ✓ | Get sent pending requests |
| POST | `/send/:userId` | ✓ | Send a contact request |
| PATCH | `/accept/:requestId` | ✓ | Accept a request |
| PATCH | `/decline/:requestId` | ✓ | Decline a request |
| DELETE | `/cancel/:requestId` | ✓ | Cancel a sent request |
| DELETE | `/remove/:userId` | ✓ | Remove an existing contact |

### Encryption — `/api/encryption`

| Method | Endpoint | Auth Required | Description |
|--------|----------|:---:|-------------|
| GET | `/public-key/:userId` | ✓ | Fetch another user's public key |
| PUT | `/keys` | ✓ | Update wrapped key material |

### Other

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api` | Health check |
| GET | `/api/version` | Returns app name, version, and environment |

---

## Socket Events

### Client → Server

| Event | Payload | Description |
|-------|---------|-------------|
| `typing` | `{ receiverId }` | Notify peer that you are typing |
| `stopTyping` | `{ receiverId }` | Notify peer that you stopped typing |
| `call:initiate` | `{ receiverId, callType }` | Start a voice or video call |
| `call:accepted` | `{ callerId, callType }` | Accept an incoming call |
| `call:rejected` | `{ callerId }` | Decline an incoming call |
| `call:ended` | `{ peerId }` | End an active call |
| `call:offer` | `{ offer, receiverId }` | Send WebRTC SDP offer |
| `call:answer` | `{ answer, callerId }` | Send WebRTC SDP answer |
| `call:ice-candidate` | `{ candidate, peerId }` | Exchange ICE candidate |
| `call:toggle-media` | `{ peerId, mediaType, enabled }` | Notify peer of mute/camera toggle |

### Server → Client

| Event | Payload | Description |
|-------|---------|-------------|
| `getOnlineUsers` | `[userId, ...]` | Updated list of online user IDs |
| `newMessage` | `message` | Incoming encrypted message |
| `userTyping` | `{ senderId }` | Peer started typing |
| `userStopTyping` | `{ senderId }` | Peer stopped typing |
| `messagesRead` | `{ readBy }` | Peer marked messages as read |
| `call:incoming` | `{ callerId, callerName, callerPic, callType }` | Incoming call notification |
| `call:accepted` | `{ acceptedBy, callType }` | Peer accepted the call |
| `call:rejected` | `{ rejectedBy }` | Peer declined the call |
| `call:ended` | `{ endedBy, reason? }` | Call was ended |
| `call:busy` | `{ receiverId }` | Peer is already on a call |
| `call:unavailable` | `{ receiverId }` | Peer is offline |
| `call:offer` | `{ offer, callerId }` | Incoming WebRTC SDP offer |
| `call:answer` | `{ answer, answererId }` | Incoming WebRTC SDP answer |
| `call:ice-candidate` | `{ candidate, from }` | Incoming ICE candidate |
| `call:toggle-media` | `{ from, mediaType, enabled }` | Remote peer toggled mute/camera |

---

## E2EE Architecture

The encryption is zero-knowledge — the server never has access to private keys or plaintext content.

```
SIGNUP
──────
1. Browser generates a 12-word BIP39 mnemonic (recovery phrase)
2. Phrase → 64-byte seed → X25519 key pair (NaCl box)
3. Private key wrapped: user password → PBKDF2-SHA256 (100k iterations) → AES-256-GCM
4. Server stores: publicKey + encryptedPrivateKey + keyIv + keySalt
5. Recovery phrase is shown once — user must save it; server never stores it

LOGIN
─────
1. Server returns encryptedPrivateKey + keyIv + keySalt
2. Browser decrypts: password + salt → PBKDF2 → AES-GCM → raw secretKey (Uint8Array)
3. Key pair cached in IndexedDB with a session-scoped AES key held in sessionStorage
4. Cache is cleared when the browser closes (sessionStorage is wiped)

MESSAGING
─────────
Send:    nacl.box(plaintext, nonce, receiverPublicKey, senderSecretKey)
Receive: nacl.box.open(ciphertext, nonce, senderPublicKey, receiverSecretKey)
Nonce:   24-byte random value, generated per message, stored alongside ciphertext

WHAT THE SERVER SEES
────────────────────
✓  Ciphertext blobs (opaque bytes)
✓  Message nonces (opaque bytes)
✓  Public keys (by design — needed for key exchange)
✗  Private keys  (never)
✗  Plaintext content  (never)
✗  Recovery phrases  (never)
```

---

## Security Summary

| Feature | Implementation |
|---------|----------------|
| Password hashing | bcryptjs, 12 salt rounds |
| Session tokens | JWT in HTTP-only, SameSite cookies |
| Transport security | HTTPS in production; CORS restricted to `CLIENT_URL` |
| Message encryption | NaCl box — X25519 + XSalsa20-Poly1305 |
| Key wrapping | AES-256-GCM, PBKDF2-SHA256 (100k iterations) |
| Recovery phrase | BIP39 — 12 words, 128 bits of entropy |
| Bot protection | Arcjet on all routes |
| Rate limiting | Arcjet + per-endpoint OTP cooldowns |
| Image uploads | Cloudinary, 15 MB limit |
| Call media | DTLS-SRTP (WebRTC default) |
| Stale accounts | Unverified accounts auto-deleted after configurable TTL |
| Security headers | `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff` |

---

## Versioning

This project follows [Semantic Versioning](https://semver.org/). Version is synced across all three `package.json` files and is exposed at `GET /api/version`.

```bash
npm run version:patch   # Bug fix:        1.0.0 → 1.0.1
npm run version:minor   # New feature:    1.0.0 → 1.1.0
npm run version:major   # Breaking change: 1.0.0 → 2.0.0
```

Each command bumps all package files, creates a git commit, and tags the release.

---

## Roadmap

- [ ] Group chats with shared E2EE key negotiation
- [ ] Voice messages — record and send encrypted audio
- [ ] Message reactions and emoji support
- [ ] TURN server support for calls behind symmetric NATs
- [ ] Encrypted file sharing (documents and PDFs)
- [ ] Client-side message search (on decrypted content)
- [ ] Web Push notifications
- [ ] E2EE for calls via WebRTC Insertable Streams

---

## License

ISC — see [LICENSE](LICENSE) for details.

---

<div align="center">
  Built with React, Express, MongoDB, Socket.IO, and NaCl &nbsp;·&nbsp; <strong>LinkUp v2.1.0</strong>
</div>
