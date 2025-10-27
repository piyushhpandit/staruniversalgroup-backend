import express from "express";
import { submitContactForm } from "../Controller/contactController.js";

const router = express.Router();

router.post("/event", submitContactForm); 

export default router;
