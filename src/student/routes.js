const express = require("express");
const studentController = require("./controller");

const router = express.Router();

router.get("/", studentController.getStudents);
router.get("/:id", studentController.getStudentById);
router.post("/", studentController.addStudent);
router.delete("/:id", studentController.removeStudent);
router.put("/:id", studentController.updateStudent);

module.exports = router;
