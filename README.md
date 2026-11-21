# User Management System

A full-stack web app where users can sign up and log in, and an admin can view and manage all users.

## Features
- User signup and login
- User home page after login
- Separate admin login
- Admin dashboard to view all users
- Admin can add, edit and delete users
- Admin can change a user's status (active/blocked)

## Tech Stack
- Node.js, Express
- MongoDB with Mongoose
- EJS templates
- HTML, CSS, JavaScript

## Getting Started
1. Clone the repo: `git clone https://github.com/AbhijithE22/user-management-system.git`
2. Go into the folder: `cd user-management-system`
3. Install packages: `npm install`
4. Create a `.env` file in the project root with these variables (use your own values):
   - `PORT=3000`
   - `MONGO_URI=your_mongodb_connection_string`
   - `SESSION_SECRET=your_secret_here`
5. Start the server: `nodemon server` (or `node server.js`)
6. Open `http://localhost:3000`

## Folder Structure
- `config/` database and environment setup
- `controllers/` route logic
- `middleware/` auth checks
- `models/` Mongoose schemas
- `routes/` URL routes
- `views/` EJS pages
- `public/` CSS and client-side JS

## Author
Abhijith E
