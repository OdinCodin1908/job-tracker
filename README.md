# Job Application Tracker

A full-stack web application to track job applications, built with React, Node.js, Express and PostgreSQL.

## Live Demo
https://job-tracker-lyart-beta.vercel.app

## Features
- User registration and login with JWT authentication
- Add, view and delete job applications
- Track application status (Applied, Interview, Offer, Rejected)
- Add notes and location for each application
- Secure per-user data

## Tech Stack
**Frontend:** React, Axios
**Backend:** Node.js, Express
**Database:** PostgreSQL
**Auth:** JWT (JSON Web Tokens)
**Deployment:** Vercel (frontend), Render (backend)

## Running Locally
1. Clone the repo
2. Set up PostgreSQL and create a database called `jobtracker`
3. Add a `.env` file in the server folder with your database credentials
4. Run `npm install` in both `client` and `server` folders
5. Run `npm run dev` in server and `npm start` in client
