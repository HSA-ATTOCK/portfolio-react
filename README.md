# Personal Portfolio – React

This is a fully responsive personal portfolio website built using **React** and **CSS3**. It showcases your projects, skills, and profile professionally. The site includes a working contact form integrated with a custom backend email server hosted on **Render**, and the front-end is deployed via **Vercel**.

---

## 🚀 Features

- Built with **React.js**
- Styled using **plain CSS3**
- Responsive layout for all screen sizes
- Smooth navigation and scroll
- Dedicated sections: Hero, About, Skills, Projects, Contact
- Functional **contact form** integrated with a custom backend
- Backend email service hosted on **Render**
- Frontend deployed on **Vercel**

---

## 🌐 Live Demo

🔗 [Visit Portfolio Website](https://haidersajjad.site/) 

---

## 🗂️ Folder Structure

```

portfolio-react/
├── public/
│   └── index.html
│   └── assets/
│   │   └──img/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   │   └──styles/         //css
│   ├── App.jsx
│   ├── index.js
│   └── App.css  // main CSS styling
├── server.js
├── .env
└── package.json

````

---

## ⚙️ Getting Started

### Prerequisites

- Node.js
- npm or Yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/HSA-ATTOCK/portfolio-react.git
   cd portfolio-react
````

2. Install frontend dependencies:

   ```bash
   npm install
   ```

3. To run the React app locally:

   ```bash
   npm start
   ```

4. To run the backend email server:

   ```bash
   cd server
   npm install
   node index.js
   ```

---

## ✉️ Contact Form Setup

* The contact form sends messages using **Nodemailer** through the `/send-email` endpoint.
* Backend is hosted on **Render** and accepts POST requests from the frontend form.
* Ensure your `.env` file contains email credentials and is set correctly on Render:

  ```
  EMAIL_USER=your_email@example.com
  EMAIL_PASS=your_password_or_app_key
  ```

---

## 📦 Deployment

### Frontend on Vercel

1. Push your code to GitHub
2. Connect repo on [vercel.com](https://vercel.com)
3. Set build command:

   ```
   npm run build
   ```
4. Set output directory:

   ```
   build
   ```

### Backend on Render

1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect your repo or upload backend code
4. Use `node index.js` as the start command
5. Add environment variables

---

## 📄 License

This project is licensed under the **MIT License**

---

## 🙋‍♂️ Author

Developed by **HSA**

* GitHub: [@HSA-ATTOCK](https://github.com/HSA-ATTOCK)

---

> Built with 💖 using **React** and **CSS3**

```