
# 👩‍💼 Woman at Workforce

**Woman at Workforce** is a MERN stack-based web application built to promote, manage, and support the inclusion of women in professional environments. This project was developed as part of an internship at SDNA Tech and aims to create a centralized platform for showcasing women's contributions, facilitating mentorship, job opportunities, and community support.

---

## 📌 Table of Contents

* [About the Project](#-about-the-project)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Project Structure](#project-structure)
* [Installation](#installation)
* [Usage](#usage)
* [Screenshots](#screenshots)
* [Contributing](#contributing)
* [License](#license)

---

## 📖 About the Project

The **Woman at Workforce** project is an initiative to:

* Empower women by connecting them with professional opportunities.
* Provide a platform to share stories, experiences, and professional journeys.
* Bridge the gap between aspiring women professionals and mentors.
* Facilitate job listings, resume uploads, and community forums.

It follows an MVC-based architecture with RESTful APIs and a fully responsive frontend.

---

## ✨ Features

* 👩‍🏫 **Mentorship Programs** – Connect mentors and mentees.
* 💼 **Job Listings** – Browse and post verified job opportunities.
* 📄 **Resume Uploads** – Allow users to showcase their profiles.
* 🗨️ **Community Forum** – Interact through discussion boards.
* 🔐 **Authentication** – Secure login system using JWT.
* 🗂️ **Admin Dashboard** – Manage users, posts, and jobs.

---

## 🛠️ Tech Stack

| Technology   | Usage                                |
| ------------ | ------------------------------------ |
| React.js     | Frontend UI                          |
| Node.js      | Backend runtime environment          |
| Express.js   | REST API and server framework        |
| MongoDB      | NoSQL database (MongoDB Atlas)       |
| JWT          | Authentication and Authorization     |
| Tailwind CSS | Styling and responsiveness           |
| Redux Toolkit| For Better State Management          |

---

## 📁 Project Structure

```
woman-at-workforce/
│
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── services/
│       └── App.js
│
├── server/                 # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── config/                 # DB and environment config
├── .env                    # Environment variables
├── README.md               # Project documentation
└── package.json
```

---

## ⚙️ Installation

### Prerequisites

* Node.js & npm
* MongoDB Atlas Account
* Git

### Steps

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/woman-at-workforce.git
cd woman-at-workforce
```

2. **Install dependencies**

```bash
cd client
npm install
cd ../server
npm install
```

3. **Configure environment variables**

Create a `.env` file in the `server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. **Run the app**

```bash
# Start backend
cd server
npm start

# Start frontend
cd ../client
npm start
```

---

## 🚀 Usage

* Users can register/login.
* Admins can manage content.
* Job seekers can explore opportunities.
* Mentors and mentees can connect via forum and messaging.
* Upload resumes and browse inspirational stories.

---

## 📸 Screenshots

*(Add images here)*

> Example: ![Home Page](screenshots/home.png)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/yourusername/woman-at-workforce/issues).

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

If you'd like, I can help you generate badges, screenshots, or add deployment instructions (like for Vercel/Render). Let me know!
