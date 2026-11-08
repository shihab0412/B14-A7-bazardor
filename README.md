# 🛒 BazarDor (বাজার দর)

**BazarDor** is a web-based daily market price platform that helps users check the latest prices of everyday essential products in Bangladesh.

Users can explore product categories, compare market prices, track price changes, and manage their accounts.

## ✨ Features

- 📊 View daily prices of essential products.
- 🛍️ Browse products by category.
- 📈 Compare today's prices with previous prices.
- 🏪 View product prices across different markets.
- 🔍 View detailed product information.
- 🔐 User authentication with Email and Password.
- 🔵 Sign in with Google.
- 👤 User profile with Google profile picture.
- ✏️ Update profile name.
- 📱 Fully responsive design for mobile, tablet, and desktop.
- 🧭 Easy navigation with category menus.

## 🧰 Technologies Used

- **Frontend:** Next.js, React, TypeScript
- **Styling:** Tailwind CSS, DaisyUI
- **Authentication:** Better Auth
- **Database:** MongoDB Atlas
- **API:** BazarDor API
- **Language:** TypeScript

## 🌐 API

The project uses the BazarDor API to retrieve product and category information.

**Base API:**

`https://openapi.programming-hero.com/api/bazardor`

### Available Endpoints

| Endpoint | Description |
|---|---|
| `/products` | Get all products |
| `/products?category=chal` | Get products by category |
| `/products/1` | Get product details |
| `/categories` | Get all categories |
| `/categories/chal` | Get category details |

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project Folder

```bash
cd bazardor
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory and add your own credentials:

```env
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000

MONGODB_URI=your_mongodb_connection_string

NEXT_PUBLIC_APP_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

**Important:** Never share or upload your real credentials or `.env.local` file to GitHub.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```text
bazardor/
├── public/
├── src/
│   ├── app/
│   │   ├── Components/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── api/
│   │   │   └── auth/
│   │   ├── category/
│   │   ├── product/
│   │   ├── profile/
│   │   ├── signin/
│   │   ├── signup/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── lib/
│       ├── auth.ts
│       ├── auth-client.ts
│       └── mongodb.ts
├── .env.local
├── package.json
└── README.md
```

## 🔒 Authentication

BazarDor uses Better Auth for authentication.

Supported authentication methods:

- Email and Password
- Google OAuth

User information and authentication data are stored in MongoDB Atlas.

## 📱 Responsive Design

The application is designed to work across:

- Desktop computers
- Tablets
- Mobile devices

## 🚀 Future Improvements

- Add more product categories.
- Improve product search functionality.
- Add advanced price filtering and sorting.
- Improve market price comparison.

## 👨‍💻 Author

**Saiful Islam Shihab**

---

