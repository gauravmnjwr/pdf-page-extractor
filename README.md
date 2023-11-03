# PDF Page Extractor Web Application

This is a web application that allows users to upload a PDF file and extract specific pages to create a new PDF. Users can select the pages they want to include in the new PDF and then download the newly created PDF.

## Features

- Upload a PDF file
- Visual representation of all pages in the PDF
- Select pages to extract
- Create a new PDF based on the selected pages
- Download the newly created PDF

## Technologies Used

- Frontend: React (with any preferred framework)
- Backend: Node.js (with any preferred framework)
- PDF Processing Library: (Specify the library used for PDF processing)

## Getting Started

### Prerequisites

- Node.js
- NPM (Node Package Manager)

### Installation

1. Clone this repository to your local machine.

```bash
git clone https://github.com/yourusername/pdf-page-extractor.git
cd pdf-page-extractor
```

2. Set up the frontend:

```bash
cd frontend
npm install
```

3. Set up the backend:

```bash
cd backend
npm install
```

4. Return to the main directory and start the development server:

```bash
cd ..
npm run dev
```

This command will start both the frontend and backend servers concurrently.

5. Access the application by opening your web browser and navigating to `http://localhost:3000`.

## Usage

1. Upload a PDF file using the provided form.
2. View the visual representation of the pages in the uploaded PDF.
3. Select the pages you want to extract by checking the associated checkboxes.
4. Click the "Create PDF" button to generate a new PDF based on your selection.
5. Once the new PDF is created, a download link will be provided for you to download the file.
