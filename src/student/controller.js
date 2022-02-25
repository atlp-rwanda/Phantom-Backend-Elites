const pool = require("../../db");
const queries = require("./queries");

const getStudents = (req, res) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) throw error;
    res.status(200).json({
      status: "success",
      data: results.rows,
    });
  });
};

const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json({
      status: "success",
      data: results.rows,
    });
  });
};

function getPassword() {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+?><:{}[]";
  var passwodLength = 16;
  var password = "";

  for (var i = 0; i < passwodLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  return password;
}

const addStudent = (req, res) => {
  const {
    fullNames,
    email,
    age,
    dob,
    phone_number,
    id_number,
    driver_licence,
    address,
  } = req.body;
  // check if email exists
  console.log(getPassword());
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (error) throw error;
    if (results.rows.length) {
      res.send("Email already exists.");
    } else {
      // add student to db
      pool.query(
        queries.addStudent,
        [
          fullNames,
          email,
          age,
          dob,
          phone_number,
          id_number,
          driver_licence,
          address,
        ],
        (error, results) => {
          if (error) throw error;
          res.status(201).json({
            status: "success",
            message: "Student Created Successfully!",
          });
        }
      );
    }
  });
};

const removeStudent = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getStudentById, [id], (error, results) => {
    const noStudentFound = !results.rows.length;
    if (noStudentFound) {
      res.send("Student does not exist in the database.");
    } else {
      pool.query(queries.removeStudent, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json({
          status: "successful",
          message: "Student removed successfully.",
        });
      });
    }
  });
};

const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;
    const noStudentFound = !results.rows.length;
    if (noStudentFound) {
      res.send("Student does not exist in the database.");
    } else {
      pool.query(queries.updateStudent, [name, id], (error, results) => {
        if (error) throw error;
        res.status(200).json({
          status: "success",
          message: "Student updated successfully.",
        });
      });
    }
  });
};

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  removeStudent,
  updateStudent,
};
