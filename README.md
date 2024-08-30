# Meal Mingle

Welcome to **Meal Mingle**, a modern and user-friendly food delivery application built with the MERN stack. Whether you're craving your favorite dishes or exploring new cuisines, Meal Mingle offers a seamless experience from browsing menus to tracking your food delivery.

## Features

![image](https://github.com/user-attachments/assets/3e797a25-1cc1-4206-9a75-71e2a44deb91)
![image](https://github.com/user-attachments/assets/cea40cac-abd6-45f6-b1fe-be25590e1cb9)
![image](https://github.com/user-attachments/assets/36b760fc-d675-4982-be6a-c02de73b8514)

### 1. **Homepage**
- Explore a variety of menus and food items categorized for easy browsing.
- Get detailed descriptions and pricing for each item.
- A "Contact Us" section is conveniently located at the footer for inquiries and support.
- **Dark Theme**: Enjoy a consistent dark theme throughout the entire website, providing a comfortable browsing experience at any time of day.

![image](https://github.com/user-attachments/assets/8b64ee8b-bbcc-4ec8-bd15-4212abf395dc)

### 2. **Cart Page**
- Review your selected food items.
- View a detailed breakdown of your order, including item prices and total cost.
- Apply promo codes for discounts before proceeding to checkout.

![image](https://github.com/user-attachments/assets/498ae1cd-15a8-49d7-aa94-d26900749658)

### 3. **Checkout Page**
- Enter your delivery address to ensure your food reaches you without hassle.
- Make secure payments using credit or debit cards via Stripe's payment gateway.
- After payment, you'll be redirected to the Orders page to track your delivery status.

![image](https://github.com/user-attachments/assets/2088e41a-a9a5-44a7-ab0e-590e653c9f44)

### 4. **Orders Page**
- Monitor the status of your food, from preparation to delivery.
- If the payment fails, you'll be redirected back to the homepage to retry the order.

### 5. **Admin Page**
- **Add Food Items**: Easily add new dishes to the menu.
- **Update Food Status**: Keep customers informed by updating the status of their orders.
- **Delete Food Items**: Remove outdated or unavailable food items from the menu.

## Technology Stack

**Frontend:**
- React.js: Dynamic user interface
- Bootstrap/Material-UI: Responsive design and components
- **Dark Theme**: A consistent dark theme applied across the entire website

**Backend:**
- Node.js: Server-side runtime
- Express.js: Backend framework
- MongoDB: NoSQL database for storing user, order, and menu data, including:
  - **Order Details**: Storing details of each order.
  - **Customer Details**: Managing customer information with login and sign-up features.
  - **Food Item List**: Keeping a record of all food items available in the menu.
  - **User Sessions**: Maintaining sessions for each user with the help of tokens.

**Payment Integration:**
- Stripe: Secure payment processing

## Getting Started

### Prerequisites
- Node.js and npm installed on your local machine
- MongoDB set up either locally or on a cloud service
- Stripe account for payment integration

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/P-h-1-L-z-A/food-del.git
   ```

2. **Install server dependencies:**
   ```bash
   cd foodback
   npm install
   ```

3. **Install client dependencies:**
   ```bash
   cd ../foodfront
   npm install
   ```

4. **Set up environment variables:**
   Create a `.env` file in the root directory and add your MongoDB URI, Stripe keys, and other necessary environment variables.

5. **Run the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `https://food-del-frontend-3duj.onrender.com/`.

### Admin Setup

To access the Admin Page:

- Ensure you have an admin account set up in your MongoDB database.
- Admins can manage the menu, update food statuses, and delete items directly from the Admin Page.

### Deployment

For deployment, you can use platforms like Render. Make sure to update the environment variables accordingly.

---

This README provides an overview of your project, setup instructions, and other essential details that developers and users need to get started with "Meal Mingle."

The project is deployed using Render.com:

- **Admin Page:** [https://food-del-admin-3oae.onrender.com](https://food-del-admin-3oae.onrender.com)
- **Frontend:** [https://food-del-frontend-3duj.onrender.com](https://food-del-frontend-3duj.onrender.com)

--- 

This README now includes details about using MongoDB for storing order details, customer details, food item list, and maintaining user sessions with tokens.
