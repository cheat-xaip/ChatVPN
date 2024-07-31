const express = require('express');
const multer = require('multer');
const app = express();

// Set up multer for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

// Upload route
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ filename: req.file.filename });
});

// Download route
app.get('/download/:filename', (req, res) => {
    const filePath = `uploads/${req.params.filename}`;
    res.download(filePath);
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
