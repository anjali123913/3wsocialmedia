# 3W Mini Social - Internship Assignment

## Overview
Simple social feed supporting signup/login, create post (text/image), like, comment, and public feed.

## Tech
- Frontend: React + MUI
- Backend: Node.js + Express
- DB: MongoDB Atlas

## Run locally
### Backend
cd backend
cp .env.example .env
# set MONGO_URI and JWT_SECRET
npm install
npm run dev

### Frontend
cd frontend
npm install
REACT_APP_API_URL=http://localhost:5000/api npm start

## Deploy
- Backend: Render (connect repo)
- Frontend: Vercel/Netlify (connect repo)
- DB: MongoDB Atlas

## Notes
- Only two collections: users and posts
- Posts embed comments and store likes as userId array
