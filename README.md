# LinkUp

<div align="center">

<img src="frontend/public/linkup-icon.svg" width="96" height="96" alt="LinkUp Logo" />

### Real-Time Encrypted Messaging

**v2.1.0** · MERN Stack · Zero-Knowledge E2EE · WebRTC Calls

[![Node.js](https://img.shields.io/badge/Node.js-≥20.0.0-339933?style=flat-square&logo=node.js)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://mongodb.com)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.8-010101?style=flat-square&logo=socket.io)](https://socket.io)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)

</div>

---

## Overview

LinkUp is a full-stack real-time chat application with **zero-knowledge end-to-end encryption** and **peer-to-peer voice & video calling**. Messages are encrypted on the client before being sent — the server stores only opaque ciphertext and never has access to your private keys or plaintext content.

Built with the MERN stack, it is production-ready with email verification, OTP-based password reset, Cloudinary image uploads, Arcjet security, and a clean blue/white UI.

---

## Features

### Messaging
- Real-time one-on-one messaging over WebSocket (Socket.IO)
- End-to-end encrypted text and images (NaCl box)
- Image sharing with Cloudinary upload and lightbox preview
- Typing indicators with live status
- Read receipts (double-check marks)
- Message grouping and date separators
- Drag-and-drop image attach

### Calls
- Peer-to-peer voice and video calls over WebRTC
- Mute / camera toggle during a call
- Front/back camera flip (mobile)
- Picture-in-picture local video preview
- Auto-reject on busy or offline
- 30-second call timeout with no-answer notification
- DTLS-SRTP encrypted media (WebRTC default)

### Contacts
- Contact request system (send / accept / decline / cancel)
- Remove contacts
- Search users by name or email
- Online presence indicators

### Authentication & Security
- Email + password signup with OTP email verification
- JWT authentication via HTTP-only cookies
- OTP-based forgot password / reset password flow
- Arcjet bot detection and rate limiting on all routes
- Automatic cleanup of unverified accounts
- Password strength meter on signup

### End-to-End Encryption (Zero-Knowledge)
- NaCl `box` (X25519 + XSalsa20-Poly1305) per-message encryption
- 12-word BIP39 recovery phrase generated on signup
- Private key derived from phrase via PBKDF2-SHA256 (100k iterations)
- Private key wrapped with AES-256-GCM using the user's password
- Encrypted private key stored server-side as an opaque blob
- Keys decrypted client-side on login — server never sees plaintext
- Session key cached in IndexedDB (AES-GCM, tab-scoped)
- E2EE session auto-expires on browser restart for forward security

### UI / UX
- Blue & white design system with dark and light themes
- Animated split-screen auth page
- Responsive layout — works on mobile, tablet, and desktop
- Framer Motion page and component transitions
- Accessible — keyboard navigation, ARIA labels, focus management
- Themed toast notifications (success / error / info variants)
- PWA-ready meta tags and mobile web app support

---

## Tech Stack

### Frontend
| Package | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| Vite | 8 | Build tool & dev server |
| React Router DOM | 7 | Client-side routing |
| Zustand | 5 | Global state management |
| Socket.IO Client | 4.8 | Real-time WebSocket client |
| Framer Motion | 12 | Animations & transitions |
| TweetNaCl | 1.0 | NaCl box encryption |
| BIP39 | 3.1 | Recovery phrase generation |
| Axios | 1.x | HTTP client |
| Lucide React | 1.0 | Icon library |
| React Hot Toast | 2.6 | Toast notifications |
| date-fns | 4 | Date formatting |

### Backend
| Package | Version | Purpose |
|---|---|---|
| Express | 4.21 | HTTP server & routing |
| Mongoose | 8.10 | MongoDB ODM |
| Socket.IO | 4.8 | Real-time WebSocket server |
| JSON Web Token | 9.0 | Authentication tokens |
| bcryptjs | 2.4 | Password hashing |
| Nodemailer | 6.9 | Transactional email (SMTP) |
| Cloudinary | 2.5 | Image upload & hosting |
| Arcjet | beta.10 | Bot protection & rate limiting |
| cookie-parser | 1.4 | HTTP-only cookie parsing |
| dotenv | 16 | Environment configuration |

---

## Project Structure

```
LinkUp/
├── backend/
│   ├── scripts/
│   │   ├── cleanupUnverifiedUsers.js   # Manual cleanup script
│   │   └── resetDatabase.js            # Dev DB reset
│   └── src/
│       ├── config/
│       │   ├── env.js                  # Environment config
│       │   └── version.js              # App version from package.json
│       ├── controllers/
│       │   ├── auth.controller.js      # Signup, login, OTP, reset password
│       │   ├── contact.controller.js   # Contact requests & management
│       │   ├── encryption.controller.js # Public key fetch & key update
│       │   └── message.controller.js   # Send, fetch, mark-read
│       ├── emails/
│       │   ├── emailHandlers.js        # Nodemailer send helpers
│       │   └── emailTemplates.js       # HTML email templates (3 types)
│       ├── lib/
│       │   ├── arcjet.js               # Arcjet client init
│       │   ├── cloudinary.js           # Cloudinary client init
│       │   ├── db.js                   # MongoDB connection
│       │   ├── generateToken.js        # JWT generation & cookie set
│       │   ├── nodemailer.js           # Nodemailer transport
│       │   └── socket.js              # Socket.IO server, call signaling
│       ├── middleware/
│       │   ├── arcjet.middleware.js    # Arcjet protection middleware
│       │   └── auth.middleware.js      # JWT protectRoute middleware
│       ├── models/
│       │   ├── contactRequest.model.js # Contact request schema
│       │   ├── message.model.js        # Message schema (with nonce for E2EE)
│       │   └── user.model.js           # User schema (with E2EE key fields)
│       ├── routes/
│       │   ├── auth.route.js           # /api/auth/*
│       │   ├── contact.route.js        # /api/contacts/*
│       │   ├── encryption.route.js     # /api/encryption/*
│       │   └── message.route.js        # /api/message/*
│       ├── services/
│       │   └── cleanupService.js       # Auto-cleanup unverified users
│       └── server.js                   # Express app + Socket.IO init
│
└── frontend/
    ├── public/
    │   ├── linkup-icon.svg             # App icon (favicon + OG image)
    │   └── favicon.svg                 # Browser tab icon
    └── src/
        ├── components/
        │   ├── call/
        │   │   ├── CallView.jsx         # Full-screen call UI
        │   │   └── IncomingCallModal.jsx # Incoming call alert
        │   ├── chat/
        │   │   ├── ChatHeader.jsx       # Chat header with call buttons
        │   │   ├── EmptyChat.jsx        # No-conversation placeholder
        │   │   ├── MessageBubble.jsx    # Individual message bubble
        │   │   ├── MessageInput.jsx     # Text + image input bar
        │   │   └── MessageList.jsx      # Virtualized message list
        │   └── shared/
        │       ├── AddContactModal.jsx  # Search & add contacts
        │       ├── Avatar.jsx           # Avatar with online status
        │       ├── Button.jsx           # Button component
        │       ├── ContactRequestsModal.jsx # Pending requests
        │       ├── ForgotPasswordModal.jsx  # OTP reset flow
        │       ├── ImageLightbox.jsx    # Full-screen image viewer
        │       ├── Input.jsx            # Styled input component
        │       ├── Logo.jsx             # SVG app logo component
        │       ├── RecoveryPhraseModal.jsx  # Show 12-word phrase
        │       └── VerificationModal.jsx    # OTP entry modal
        ├── lib/
        │   ├── api.js                   # Axios instance
        │   ├── constants.js             # API endpoint constants
        │   ├── crypto.js                # E2EE crypto (NaCl, BIP39, AES-GCM)
        │   └── utils.js                 # Shared helpers
        ├── pages/
        │   ├── AuthPage.jsx             # Login / signup split-screen
        │   ├── ChatPage.jsx             # Main chat layout
        │   └── ProfilePage.jsx          # Profile & settings
        ├── store/
        │   ├── useAuthStore.js          # Auth state & E2EE key lifecycle
        │   ├── useCallStore.js          # WebRTC call state machine
        │   ├── useChatStore.js          # Messages & contacts state
        │   ├── useContactStore.js       # Contact requests state
        │   ├── useKeyStore.js           # E2EE key management (IndexedDB)
        │   ├── useSocketStore.js        # Socket.IO connection
        │   ├── useThemeStore.js         # Dark / light theme
        │   └── useUIStore.js            # UI state (sidebar, modals)
        ├── App.jsx                      # Routes & auth guards
        ├── index.css                    # Design system & CSS variables
        └── main.jsx                     # App entry point + Toaster config
```

---

## Getting Started

### Prerequisites

- Node.js **≥ 20.0.0**
- MongoDB Atlas cluster (or local MongoDB)
- Cloudinary account (free tier works)
- Gmail or SMTP credentials for email
- Arcjet account for bot protection

### Environment Variables

Create `backend/.env`:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGO_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_strong_jwt_secret_here

# Email (Nodemailer / SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
SENDER_EMAIL=your_email@gmail.com
SENDER_NAME=LinkUp Team

# Client
CLIENT_URL=http://localhost:5173

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Arcjet
ARCJET_KEY=your_arcjet_key
```

> **Gmail SMTP:** Use an [App Password](https://support.google.com/accounts/answer/185833), not your account password.

### Development

```bash
# Install all dependencies (root, backend, frontend)
npm run build

# Start backend (port 3000)
cd backend && npm run dev

# Start frontend (port 5173) — in a separate terminal
cd frontend && npm run dev
```

### Production

```bash
# From the root — builds frontend and installs all deps
npm run build

# Start the server (serves frontend from backend/dist)
npm start
```

The backend serves the compiled frontend as static files in production. No separate frontend server needed.

### Database Scripts

```bash
# From backend/
npm run db:reset            # Wipe and reset the database (dev only)
npm run cleanup:unverified  # Manually remove unverified accounts
```

---

## API Reference

### Auth — `/api/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/signup` | — | Create account, sends verification OTP |
| POST | `/verify-email` | — | Verify OTP + store E2EE key material |
| POST | `/resend-otp` | — | Resend verification OTP |
| POST | `/login` | — | Login, returns encrypted key material |
| POST | `/logout` | ✓ | Clear session cookie |
| POST | `/forgot-password` | — | Send password reset OTP |
| POST | `/reset-password` | — | Verify OTP + set new password |
| PUT | `/update-profile` | ✓ | Update name / profile picture |
| GET | `/check` | ✓ | Verify auth status |

### Messages — `/api/message`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/contacts` | ✓ | List all contacts for sidebar |
| GET | `/chats` | ✓ | List active chat partners |
| GET | `/:id` | ✓ | Fetch messages with a user |
| POST | `/send/:id` | ✓ | Send encrypted message |
| PATCH | `/read/:id` | ✓ | Mark messages as read |

### Contacts — `/api/contacts`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/requests` | ✓ | Get pending requests |
| GET | `/sent` | ✓ | Get sent requests |
| POST | `/send/:userId` | ✓ | Send contact request |
| PATCH | `/accept/:requestId` | ✓ | Accept request |
| PATCH | `/decline/:requestId` | ✓ | Decline request |
| DELETE | `/cancel/:requestId` | ✓ | Cancel sent request |
| DELETE | `/remove/:userId` | ✓ | Remove a contact |

### Encryption — `/api/encryption`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/public-key/:userId` | ✓ | Fetch a user's public key |
| PUT | `/keys` | ✓ | Update wrapped key material |

---

## Socket Events

### Client → Server

| Event | Payload | Description |
|-------|---------|-------------|
| `typing` | `{ receiverId }` | Start typing indicator |
| `stopTyping` | `{ receiverId }` | Stop typing indicator |
| `call:initiate` | `{ receiverId, callType }` | Start a call |
| `call:accepted` | `{ callerId, callType }` | Accept incoming call |
| `call:rejected` | `{ callerId }` | Decline incoming call |
| `call:ended` | `{ peerId }` | End active call |
| `call:offer` | `{ offer, receiverId }` | WebRTC SDP offer |
| `call:answer` | `{ answer, callerId }` | WebRTC SDP answer |
| `call:ice-candidate` | `{ candidate, peerId }` | ICE candidate exchange |
| `call:toggle-media` | `{ peerId, mediaType, enabled }` | Mute / camera toggle |

### Server → Client

| Event | Payload | Description |
|-------|---------|-------------|
| `getOnlineUsers` | `[userId, ...]` | Updated online users list |
| `newMessage` | `message` | Incoming message |
| `userTyping` | `{ senderId }` | Peer started typing |
| `userStopTyping` | `{ senderId }` | Peer stopped typing |
| `messagesRead` | `{ readBy }` | Messages marked as read |
| `call:incoming` | `{ callerId, callerName, callerPic, callType }` | Incoming call alert |
| `call:accepted` | `{ acceptedBy, callType }` | Call accepted |
| `call:rejected` | `{ rejectedBy }` | Call declined |
| `call:ended` | `{ endedBy, reason? }` | Call ended |
| `call:busy` | `{ receiverId, message? }` | Peer is busy |
| `call:unavailable` | `{ receiverId }` | Peer is offline |
| `call:offer` | `{ offer, callerId }` | WebRTC SDP offer |
| `call:answer` | `{ answer, answererId }` | WebRTC SDP answer |
| `call:ice-candidate` | `{ candidate, from }` | ICE candidate |
| `call:toggle-media` | `{ from, mediaType, enabled }` | Remote media toggle |

---

## E2EE Architecture

```
SIGNUP
──────
1. Browser generates 12-word BIP39 mnemonic (recovery phrase)
2. Key pair derived: phrase → 64-byte seed → X25519 key pair (NaCl box)
3. Private key wrapped: password → PBKDF2 (100k itr, SHA-256) → AES-256-GCM
4. Server stores: publicKey (plain) + encryptedPrivateKey + keyIv + keySalt
5. Recovery phrase shown once — user must save it offline

LOGIN
─────
1. Server returns encryptedPrivateKey + keyIv + keySalt + publicKey
2. Browser decrypts private key: password + salt → AES-GCM → secretKey (Uint8Array)
3. Key pair cached in IndexedDB (AES-GCM, session-scoped AES key in sessionStorage)
4. Cache expires when browser is closed (sessionStorage cleared)

MESSAGING
─────────
Send:    nacl.box(plaintext, nonce, receiverPublicKey, senderSecretKey)
Receive: nacl.box.open(ciphertext, nonce, senderPublicKey, receiverSecretKey)
Nonce:   24-byte random, generated per message, stored with ciphertext

SERVER KNOWLEDGE
────────────────
✓  Ciphertext blobs (opaque)
✓  Message nonces (opaque)
✓  Public keys (by design — needed for key exchange)
✗  Private keys (never)
✗  Plaintext message content (never)
✗  Recovery phrases (never)
```

---

## Security Details

| Feature | Implementation |
|---------|----------------|
| Password hashing | bcryptjs (salt rounds: 12) |
| Session tokens | JWT in HTTP-only, SameSite cookies |
| Transport | HTTPS in production, CORS restricted to client URL |
| Message encryption | NaCl box — X25519 + XSalsa20-Poly1305 |
| Key wrapping | AES-256-GCM, PBKDF2-SHA256 (100k iterations) |
| Recovery phrases | BIP39 — 12-word, 128 bits of entropy |
| Bot protection | Arcjet on all routes |
| Rate limiting | Arcjet + per-endpoint OTP cooldowns |
| Image uploads | Cloudinary (15 MB limit, base64 input) |
| Call media | DTLS-SRTP (WebRTC standard) |
| Unverified accounts | Auto-deleted after configurable TTL |

---

## Roadmap

- [ ] Group chats with shared E2EE key negotiation
- [ ] Voice messages — record and send encrypted audio
- [ ] Message reactions and emoji support
- [ ] TURN server support for calls behind symmetric NATs
- [ ] File sharing — send encrypted documents and PDFs
- [ ] Message search (client-side, on decrypted content)
- [ ] Push notifications (Web Push API)
- [ ] Application-level E2EE for calls (WebRTC Insertable Streams)

---

## License

ISC — see [LICENSE](LICENSE) for details.

---

<div align="center">
  Built with React, Express, MongoDB, Socket.IO and NaCl · <strong>LinkUp v2.1.0</strong>
</div>
