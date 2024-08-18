# E-Commerce MERN Stack Project

This is a full-featured e-commerce application built using the MERN (MongoDB, Express, React, Node.js) stack. The application allows users to browse products, add items to the cart, place orders, and manage their profiles. Admins can manage products, orders, and users.

## Features

- **User Authentication:** Register, login, and manage user profiles.
- **Product Management:** View product details, search products, and filter by categories.
- **Shopping Cart:** Add products to the cart and update quantities.
- **Order Management:** Place orders, view order history, and track delivery status.
- **Admin Dashboard:** Manage products, users, orders, and analytics.
- **Payment Integration:** Integrated with Stripe or PayPal for payments.
- **Responsive Design:** Mobile-first design using Tailwind CSS.

## Tech Stack

- **Frontend:**

  - React.js
  - React Router
  - Tailwind CSS
  - Axios
    -context api

- **Backend:**

  - Node.js
  - Express.js
  - MongoDB with Mongoose

- **Other Tools and Libraries:**
  - JWT for authentication
  - Bcrypt for password hashing
  - Stripe
  - Nodemailer for email notifications

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kyaw023/mern-ecommerce.git
   cd ecommerce-mern-stack
   ```

cd backend
npm install
cd ../frontend
npm install

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key

# Start the backend server

cd backend
npm run dev

# Start the frontend server

cd ../frontend
npm run dev

ecommerce-mern-stack/
│
├── backend/ # Express.js API
│ ├── config/ # Configuration files (DB, Cloudinary, etc.)
│ ├── controllers/ # Route controllers
│ ├── models/ # Mongoose models
│ ├── routes/ # Express routes
│ ├── middlewares/ # Custom middleware
│ ├── utils/ # Utility functions
│ └── server.js # Express app setup
│
├── frontend/ # React.js app
│ ├── src/
│ │ ├── components/ # React components
│ │ ├── pages/ # Page components
│ │ ├── context/ # Context providers (if using context instead of Redux)
│ │ ├── App.js # Main app component
│ │ ├── index.js # Entry point
│ │ └── assets/ # Images, icons, etc.
│ └── public/ # Static files
│
└── README.md
