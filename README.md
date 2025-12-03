# 🗄️ Vita Voice Coach - Backend (Strapi CMS)

Backend API service for **Vita Voice**, a platform offering vocal coaching, blog content publishing, and user contact submissions.

Built with **Strapi CMS + PostgreSQL**, deployed on **Render**.

---

## 🚀 Live URLs

- **Public API:** `https://vita-voice-backend.onrender.com`
- **Frontend:** `https://vitavoice.pl`
- **Admin Panel:** Private (secured, not public)

---

## 🧰 Tech Stack

  - 🚀 **Backend:** Strapi Headless CMS (TypeScript)

  - 🟦 **Language:** JavaScript / TypeScript

  - 🐘 **Database:** PostgreSQL (production) / SQLite (local)

  - ☁️ **Hosting:** Render Cloud

  - 📦 **Storage:** Local or Cloudinary

  - 📧 **Email Service:** SMTP (Gmail)

---

## ✨ Features

✔️ Content Management through Strapi Admin Panel

✔️ **API collections:**

  - `Blog Posts`
  - `Services`
  - `Testimonials`
  - `Messages` (Contact Form)

✔️ Built-in validation & Content Types

✔️ Auto-generated REST API

✔️ Email notifications for contact form submissions

✔️ Seed data scripts

✔️ Production-ready configuration

---

## 📁 Project Structure
```
/config
/database
/public
/src
  ├─ admin
  ├─ api
  ├─ extensions
/types
.env.example
package.json
README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file based on `.env.example`:
```
cp .env.example .env
```
---

## 🔧 Server
```
HOST=0.0.0.0
PORT=1337
NODE_ENV=development
PUBLIC_URL=
```

---

## 🔐 Secrets (must change for production)
```
APP_KEYS=toBeModified,toBeModified
API_TOKEN_SALT=toBeModified
ADMIN_JWT_SECRET=toBeModified
JWT_SECRET=toBeModified
TRANSFER_TOKEN_SALT=toBeModified
ENCRYPTION_KEY=toBeModified
```
---

## 🛢️ Database - Local (SQLite)
```
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
DATABASE_SSL=false
```
---

## 🐘 Database - Production (PostgreSQL)
```
DATABASE_URL=
DATABASE_SSL=true
```
---

## ☁️ Upload (Cloudinary)
```
CLOUDINARY_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
```
---

## 📧 Email (SMTP)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=
SMTP_PASS=
EMAIL_DEFAULT_FROM=
EMAIL_DEFAULT_REPLY_TO=
CONTACT_TO=
```
---

## 🧪 Local Development
1. Clone the repository
```
git clone https://github.com/OlesiaKubska/vita-voice-coach-backend.git
cd vita-voice-coach-backend
```

2. Install dependencies
```
npm install
```

3. Create .env
```
cp .env.example .env
```

4. Start Strapi
```
npm run develop
```

5. Open admin panel
```
http://localhost:1337/admin
```
---

## 🚢 Deployment (Render)

### Requirements
- Node.js 18+
- PostgreSQL database
- All environment variables set

### Build command
```
npm run build
```

### Start command
```
npm run start
```

### Notes

- Render may sleep on free plan
- Cold start delay possible
- Asset upload must use persistent storage (Cloudinary recommended)

---

## 📡 API Overview
🔹 **Posts**
```
GET /api/posts
GET /api/posts/:id
GET /api/posts?filters[slug][$eq]=slug
```
🔹 **Services**
```
GET /api/services
```
🔹 **Testimonials**
```
GET /api/testimonials
```
🔹 **Messages (Contact Form)**
```
POST /api/messages
```
---

Example Payload:
```
{
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello!"
  }
}
```

Response (Strapi default):
```
{
  "data": {
    "id": 1,
    "attributes": {
      "name": "John Doe",
      "email": "john@example.com",
      "message": "Hello!",
      "createdAt": "2023-01-01T00:00:00.000Z"
    }
  }
}
```
---

## 🧰 Scripts
```
npm run develop   # dev mode
npm run build     # build for production
npm run start     # start production
npm run seed      # seed initial data (if available)
```
---

## 🔐 Security Notes

- Admin panel access restricted
- CORS configured for production
- API rate limiting recommended
- Sensitive keys stored in environment variables
- HTTPS recommended in production

---

## 👩‍💻 Author

**Olesia Kubska**
Full-Stack Developer

🌐 https://vitavoice.pl

📧 info@vitavoice.pl

## 📄 License

Private.
Unauthorized use, distribution, or modification is prohibited.
