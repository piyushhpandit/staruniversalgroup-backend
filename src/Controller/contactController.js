import nodemailer from "nodemailer";

export const submitContactForm = async (req, res) => {
  try {
    console.log("📩 Received contact form:", req.body);
    const { name, email, message } = req.body;

    // ✅ Use your .env SMTP variables

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === "true", // false for port 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false, // Helps prevent some handshake errors
      },
    });


    const mailOptions = {
      from: process.env.SMTP_USER, // always use verified sender
      to: process.env.SMTP_USER, // send to your inbox
      replyTo: email, // so you can reply directly to the sender
      subject: `📬 New contact form submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("❌ Error sending email:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
};
