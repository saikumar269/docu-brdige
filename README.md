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

npm install express cors multer mongoose dotenv libreoffice-convert pdf-parse mammoth pdfkit pptxgenjs pdf-lib xlsx

**Frontend**

npm install react-router-dom axios tailwindcss lottie-react pdf-lib

