require("dotenv").config();
const cors = require("cors");
const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "dist")));

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Status page route - serves the HTML file
app.get("/", (req, res) => {
  const statusPagePath = path.join(__dirname, "status.html");
  
  // Check if status.html exists
  if (fs.existsSync(statusPagePath)) {
    res.sendFile(statusPagePath);
  } else {
    // Fallback response if file doesn't exist
    res.status(404).send(`
      <h1>Status page not found</h1>
      <p>Please make sure 'status.html' file exists in the root directory.</p>
      <p>Server is running on port ${process.env.PORT || 3001}</p>
    `);
  }
});

// Alternative route to serve status page
app.get("/status", (req, res) => {
  const statusPagePath = path.join(__dirname, "status.html");
  
  if (fs.existsSync(statusPagePath)) {
    res.sendFile(statusPagePath);
  } else {
    res.status(404).json({ 
      error: "Status page not found",
      message: "status.html file is missing" 
    });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "healthy", 
    timestamp: new Date().toISOString(),
    service: "email-server",
    uptime: process.uptime()
  });
});

// API status endpoint
app.get("/api/status", (req, res) => {
  res.json({
    service: "Email Server API",
    status: "running",
    endpoints: {
      sendEmail: "/api/send-email",
      health: "/health",
      status: "/status"
    },
    timestamp: new Date().toISOString()
  });
});

// Email API endpoint
app.post("/api/send-email", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: "Name, email, and message are required fields." 
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address."
      });
    }
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New message from your portfolio: ${subject || "No Subject"}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
            New Portfolio Contact Form Submission
          </h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <p><strong>Subject:</strong> ${subject || "No Subject"}</p>
          </div>
          <div style="background: #fff; padding: 20px; border-left: 4px solid #667eea;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #555;">${message}</p>
          </div>
          <div style="margin-top: 20px; padding: 15px; background: #e8f5e8; border-radius: 5px;">
            <p style="margin: 0; color: #666; font-size: 0.9em;">
              This email was sent from your portfolio contact form on ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || "Not provided"}
        Subject: ${subject || "No Subject"}
        Message: ${message}
        
        Sent from portfolio contact form on ${new Date().toLocaleString()}
      `
    };
    
    await transporter.sendMail(mailOptions);
    
    console.log(`✅ Email sent successfully from ${email} (${name})`);
    
    res.status(200).json({ 
      success: true, 
      message: "Email sent successfully!" 
    });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to send email. Please try again later." 
    });
  }
});

// Serve React app for other routes (if you have a React app)
app.get("*", (req, res) => {
  // Check if dist/index.html exists
  const indexPath = path.join(__dirname, "dist", "index.html");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    // Fallback to status page if no React app is built
    res.redirect("/");
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Email server running on port ${PORT}`);
  console.log(`📧 Status page: http://localhost:${PORT}`);
  console.log(`🔗 API endpoint: http://localhost:${PORT}/api/send-email`);
  console.log(`💚 Health check: http://localhost:${PORT}/health`);
});
