# QuickAI

**QuickAI** is a full-stack AI utility platform built with a **React frontend (Vite)** and a **Node.js** + **Express** backend, using **PostgreSQL** as the primary database.

It provides users with access to AI powered tools such as **content generation, image processing, and resume analysis** etc. with support for both free and premium subscriptions.

## Features

### Free Tools

1. **Dashboard**: Centralized navigation and access to all tools

2. **Write Article**: Generate detailed AI-based articles from prompts

3. **Blog Titles**: Generate optimized titles for blog posts

4. **Community**: View and engage with other users’ content

### Premium Tools (Enabled free as of now)

1. **Generate Images**: AI-based image generation from textual prompts

2. **Remove Background**: Automatically removes background from uploaded images

3. **Remove Object**: Erase selected objects from images

4. **Review Resume**: Get AI-powered resume feedback
   

User access is determined by **subscription level** and enforced via role-based authentication.

## Tech Stack

1. **Frontend:** React, React Router, Tailwind CSS
2. **Backend:** Node.js, Express.js
3. **Database:** Postgres SQL
4. **Authentication:** Clerk Auth
5. **Media Storage:** Cloudinary
6. **Deployment:** Vercel (Frontend), and Vercel (backend) deployment.


## Live Site

Deployed at: [https://quick-ai-frontend.vercel.app/](https://quick-ai-frontend.vercel.app/)

## API's Used
1. Google gemini-2.0-flash - Text generation related Queries
2. Clipdrop API - Image related Queries

## Getting Started (Local Setup)

### 1. Clone the repository

```bash
 git clone https://github.com/Jagg2611/QuickAI.gi
cd QuickAI

```
### 2. Environment Variables
Create a .env file in both frontend/ and backend/ folders.

for backend/server add the following keys
```bash
DATABASE_URL=postgresql://your-user:your-password@your-host/neondb?sslmode=require&channel_binding=require

CLERK_SECRET_KEY=your-clerk-secret-key
GEMINI_API_KEY=your-gemini-api-key
CLICKDROP_API_KEY=your-clickdrop-api-key

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

```

for frontend/client add the following keys
```bash
VITE_BASE_URL=http://localhost:3000
VITE_CLERK_PUBLISHABLE_KEY=your-publishable-key
```


### 3. Install the required dependencies

#Backend
```bash
cd server
npm install
```

```bash
#Frontend
cd client 
npm install
```


### 4. Run the app locally

### Backend/server
```bash
npm run server
```

### Frontend/client
```bash
npm run dev
```


