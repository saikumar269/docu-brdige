# 📄 DocuBridge

**DocuBridge** is a full-stack web application that allows users to convert documents between formats like **DOC → PDF**, **Excel → PDF**, **PPT → PDF**, **Image → PDF**, and even **PDF → PPT**. It also includes user authentication, and in-browser editing.

---

## 🚀 Tech Stack

### Frontend:
- **React.js**
- **Tailwind CSS** (for modern UI styling)
- **React Router** (for routing)
- **Axios** (for API requests)
- **pdf-lib** (PDF manipulation on frontend)

### Backend:
- **Node.js** + **Express.js**
- **MongoDB** with **Mongoose**
- **Multer** (file uploads)
- **LibreOffice (via libreoffice-convert)** – for DOC/XLS/PPT to PDF
- **pdf-parse**, **pdf-lib** – for reading/editing PDFs
- **pptxgenjs** – for generating PPT files

---

## ✨ Features

- ✅ Convert Word (.docx), Excel (.xlsx), PPT (.pptx), and Image (.jpg/.png) files to PDF
- ✅ Convert PDF to editable PPT format
- ✅ Edit DOC & Excel content before generating PDF
- ✅ Sign Up / Sign In / Guest Mode support
- ✅ User profile with view & edit options
- ✅ Smooth, responsive UI with Tailwind
- ✅ Continuous animations and clean UX

---

📦 Important Packages Installed
**Backend**

- **npm install express cors multer mongoose dotenv libreoffice-convert pdf-parse mammoth pdfkit pptxgenjs pdf-lib xlsx**

**Frontend**

- **npm install react-router-dom axios tailwindcss lottie-react pdf-lib**


Sure! Here's a detailed **description of all the packages installed** for both the frontend and backend of your **DocuBridge** project. You can include this in your `README.md` under a section like:

---

## 📦 Installed Packages & Descriptions

### 🖥️ Frontend (React)

| Package                    | Description                                                   |
| -------------------------- | ------------------------------------------------------------- |
| `react`                    | JavaScript library for building user interfaces.              |
| `react-dom`                | Used with React for DOM rendering.                            |
| `react-router-dom`         | Enables routing (navigation between pages) in React.          |
| `axios`                    | Promise-based HTTP client for making API calls.               |
| `tailwindcss`              | Utility-first CSS framework for rapid UI development.         |
| `postcss` & `autoprefixer` | Used with Tailwind for CSS processing.                        |
| `lottie-react`             | Renders Lottie animations in React (used for UI animations).  |
| `pdf-lib`                  | Used to create/edit PDFs on the frontend (e.g. editing text). |

---

### 🖥️ Backend (Node.js + Express)

| Package               | Description                                                                       |
| --------------------- | --------------------------------------------------------------------------------- |
| `express`             | Minimal and flexible Node.js web application framework.                           |
| `mongoose`            | ODM (Object Data Modeling) library for MongoDB.                                   |
| `cors`                | Middleware to allow cross-origin requests (used for frontend-backend connection). |
| `dotenv`              | Loads environment variables from `.env` file.                                     |
| `multer`              | Handles file uploads (e.g. PDF, DOC, XLS, PPT).                                   |
| `libreoffice-convert` | Converts Office files (DOC, XLS, PPT) to PDF using LibreOffice.                   |
| `pdf-parse`           | Parses and extracts text from PDFs.                                               |
| `mammoth`             | Converts DOCX to clean plain text (used for editing Word docs).                   |
| `pdf-lib`             | Manipulates PDF documents (merge, edit, remove pages, etc.).                      |
| `pptxgenjs`           | Programmatically creates PowerPoint `.pptx` files from PDF content.               |
| `xlsx`                | Parses Excel sheets (.xlsx/.xls) for content extraction.                          |
| `pdfkit` (optional)   | Helps in creating PDF files from scratch.                                         |

---

### 📌 Dev Tools & Misc

| Tool          | Description                                                                               |
| ------------- | ----------------------------------------------------------------------------------------- |
| `nodemon`     | Automatically restarts the server on file changes.                                        |
| `MongoDB`     | Database for storing user profiles and download history.                                  |
| `LibreOffice` | Required to be installed on your system to handle actual file conversions in the backend. |

---

Let me know if you also want:

* `.gitignore` file
* A separate section for LibreOffice installation steps
* Breakdown of conversion features supported

I'm happy to include that!

