# Job Marketplace App
## Live Demo

Check out the live version of the app here: [Job Marketplace App](https://job-portal-tau-eight.vercel.app/)

## Overview

The Job Marketplace App is a web application that connects students with job opportunities posted by employers. The app provides role-based access control, allowing employers to post jobs, students to apply for them, and universities to manage their profiles. The app is built using React, Firebase, and Tailwind CSS.

## Features

- **User Authentication**: Secure login and registration using Firebase Authentication.
- **Role-Based Access Control**: Different functionalities are accessible based on whether the user is a student, employer, or university employee.
- **Job Posting**: Employers can post jobs, specifying details like title, description, requirements, location, salary range, and eligible universities.
- **Job Application**: Students can view job listings and apply for jobs. Employers can view and manage applications.
- **University Management**: University employees can manage their university's profile and message to employers.
- **Responsive Design**: The app is fully responsive and works seamlessly on all devices.

## Tech Stack

- **Frontend**: React, Tailwind CSS, React Router, React Select
- **Backend**: Firebase (Firestore, Authentication, Database)
- **Deployment**: Vercel.com


## Setup & Installation

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   https://github.com/priyanshuC123/job_portal.git
   cd job-marketplace
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Firebase:**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Firestore, Authentication, and Storage in your Firebase project.
   - Create a `.env` file in the root directory and add your Firebase configuration:
     ```
     REACT_APP_FIREBASE_API_KEY=your-api-key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
     REACT_APP_FIREBASE_PROJECT_ID=your-project-id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     REACT_APP_FIREBASE_APP_ID=your-app-id
     ```

4. **Run the app:**
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000`.

## Deployment

The app is deployed on Render.com. To deploy your own version:

1. **Push your code to GitHub.**
2. **Connect your GitHub repository to Render.com.**
3. **Set up your environment variables on Render.com** (same as the `.env` file above).
4. **Configure the build and start commands:**
   - **Build Command:** `npm run build`
   - **Start Command:** `npm run start`

5. **Deploy and access your app at the provided URL.**

## Usage

- **Students**: Sign up, browse available jobs, and apply directly through the platform.
- **Company Employers**: Log in to post jobs, view applications, and manage job listings.
- **Universities**: Manage university profiles and communicate with potential Company.


## Contact

If you have any questions or feedback, please feel free to reach out.
