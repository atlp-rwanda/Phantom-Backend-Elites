import express from "express";
const router = express.Router();
import Contacts from '../controllers/contactController'


// get all contact messages
router.get("/", Contacts.getAll);

// create contact message
router.post("/", Contacts.create);


export default router;