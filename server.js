import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./src/Routes/contactRoutes.js";

dotenv.config();
console.log("🔐 SMTP_USER:", process.env.SMTP_USER);
console.log("🔐 SMTP_PASS:", process.env.SMTP_PASS ? "✅ Loaded" : "❌ Missing");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/contact", contactRoutes); // ✅ Mount route

const PORT = process.env.PORT || 4000;
// Add this right before app.listen(...)
app.get("/", (req, res) => {
  res.send("✅ Star Universal Backend is running successfully!");
});
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
