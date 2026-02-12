require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Email transporter error:", error.message);
  } else {
    console.log("Email server is ready to send messages");
  }
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/site-copyright", (req, res) => {
  res.render("site-copyright");
});

// Contact Route
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send("All fields are required.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send("Invalid email address.");
  }

  try {
    await transporter.sendMail({
      from: `"Amenus Website" <${process.env.SMTP_EMAIL}>`,
      to: process.env.SMTP_EMAIL,
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <hr>
        <p>Sent at: ${new Date().toLocaleString()}</p>
      `,
    });

    console.log(`✅ Email sent from ${name} (${email})`);
    res.status(200).send("Message sent successfully!");
  } catch (error) {
    console.error("❌ Email sending error:", error.message);
    res
      .status(500)
      .send("Failed to send email. Please try again later.");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
