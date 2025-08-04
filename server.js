 const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const cors = require('cors');
app.use(cors());


// Serve static files (like your contact.html)
app.use(express.static(path.join(__dirname, 'public')));

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'shraddha',
  password: 'shraddha',
  database: 'portfolio'
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Database connected successfully");
  }
});

// Nodemailer transporter setup (update with your credentials)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'thorhateshraddha@gmail.com',       // your Gmail
    pass: 'your-app-password-here'            // <-- put the generated App Password here (no spaces)
  }
});


// Contact form POST route
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  // Insert into database
  const sql = 'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)';
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error("DB insert error:", err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    // Send email notification
    const mailOptions = {
      from: email,
      to: 'yourgmail@gmail.com',
      subject: `New Contact from ${name}`,
      text: `Message: ${message}\n\nEmail: ${email}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email error:", error);
        return res.status(500).json({ success: false, message: 'Email not sent' });
      } else {
        console.log('Email sent:', info.response);
        // Success response
        return res.json({ success: true, message: 'Message received and email sent!' });
      }
    });
  });
});
app.post('/contact', (req, res) => {
  console.log("Received contact request:", req.body);
  // ... rest of your code
});

// Start server
const PORT = process.env.PORT || 300;
app.listen(PORT, () => {
  console.log(`Server started`);
});
