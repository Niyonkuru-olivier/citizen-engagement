
# Citizen Complaints and Engagement System

## Project Overview

The **Citizen Complaints and Engagement System** is a platform that allows citizens to submit feedback or complaints regarding public services. It streamlines how complaints are submitted, categorized, tracked, and resolved by government agencies. This improves responsiveness, transparency, and public trust.

## Technologies Used

| Layer     | Technology     | Purpose                                |
|-----------|----------------|----------------------------------------|
| Frontend  | Angular         | User interface for citizens and admins |
| Backend   | NestJS          | API development & server logic         |
| Database  | MySQL           | Persistent storage                     |

## Core Features

### Citizen Side
1. Register and login as a citizen
2. Submit feedback or complaints
3. View ticket status and history
4. Receive responses from public institutions

### Admin (Agency) Side
1. Register and Login as an admin
2. View and manage incoming complaints
3. Categorize and respond to feedback
4. Track complaint progress
5. View system insights (e.g., complaint volume, resolution time)
## Importance to Society

✅ Promotes transparency in governance
✅ Enhances communication between government and citizens
✅ Reduces bureaucracy and response delays
✅ Builds citizen trust and engagement in public services

## 🧰 How the System Works

1. **Citizens register and log in**
2. **Submit a complaint or feedback**
3. **System categorizes and routes the complaint**
4. **Appropriate agency receives and responds via admin dashboard**
5. **Citizen tracks status in real time**
6. **Analytics dashboards offer insights to administrators**
   
## Project Structure

citizen-engagement-system/
├── frontend/ # Angular frontend
├── backend/ # NestJS backend
├── README.md
└── .gitignore

## How to Run the Project Locally

### 1️⃣ Clone the Repository

git clone https://github.com/Niyonkuru-olivier/citizen-engagement.git

cd citizen-engagement

### 2️⃣ Set Up the Frontend (Angular)
cd citizen-engagement
npm install
ng serve

Access frontend at: http://localhost:4200
### 3️⃣ Set Up the Backend (NestJS)
cd ../backend
npm install
### Create a .env file inside /backend folder with the following:
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=yourpassword
DB_NAME=citizen_engagement
JWT_SECRET=your_jwt_secret
### Then run the backend server:
npm run start:dev
### 4️⃣ Setup MySQL Database
Create a database:
CREATE DATABASE citizen_engagement;
Make sure your database credentials match the .env file

Optionally, import schema from a schema.sql file if provided

### Testing
Use Postman or similar API client to test endpoints like:

POST /auth/login

POST /auth/register

GET /complaints

POST /complaints

### Future Improvements
AI-assisted complaint categorization

SMS/email notification integration

Role-based access control

Multilingual support
