Engineering Resource Management System

A full-stack application to manage engineers, projects, assignments, capacity tracking, and dashboards — with role-based access.

======================================================================

	Tech Stack:- 
•	Frontend: React.js 
•	Backend: Node.js + Express.js
•	Database: MySQL
•	Authentication: JWT (Role-based access)
•	AI Tools Used: ChatGPT

	Features
User Roles: Admin, Manager, Engineer
Engineer Management: Add/edit engineers and their capacity
Project Management: Manage projects with timelines
Assignments: Assign engineers to projects with hours
Dashboard: Track engineer capacity and utilization %
Role-Based Access: Secure APIs by user type


Project Structure For Frontend:-

	Tech Stack:- 
•	React.js
•	Redux Toolkit & @reduxjs/toolkit
•	React Router DOM
•	Axios
•	Bootstrap

	Features
•	 Login/Register
•	 Add/View/Edit/Delete Engineers
•	Project Management
•	Skill & Capacity Tracking
•	Dashboards by Role
•	Role-based Access: Admin, Manager, Engineer
•	Redux Toolkit for global state management




	Folder Structure:- 
src/
api/
├── axiosInstance
app/
├── store.js
Components/
├── PrivateRoute.js
├── RoleBasedRoute.js
Features/assignments
├── assignmentSlice.js
Features/auth
├── authApi.js
├── authSlice.js
Features/dashboard
├── dashboardSlice.js

Features/engineers
├── engineersSlice.js
Features/projects
├── projectSlice.js


Pages/
├── Assignements.jsx
├── Dashboard.jsx
├── Engineers.jsx
├── Login.jsx
├── Projects.jsx
├── Register.jsx

App.js

	How to Run
npm install
npm start

