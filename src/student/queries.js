const getStudents = "SELECT * FROM drivers";
const getStudentById = "SELECT * FROM drivers WHERE id = $1";
const checkEmailExists = "SELECT s FROM drivers s WHERE s.email = $1";
const addStudent =
  "INSERT INTO drivers (fullNames, email, age, dob, phone_number, id_number, driver_licence, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
const removeStudent = "DELETE FROM drivers WHERE id = $1";
const updateStudent = "UPDATE drivers SET name = $1 WHERE id = $2";

module.exports = {
  getStudents,
  getStudentById,
  checkEmailExists,
  addStudent,
  removeStudent,
  updateStudent,
};
