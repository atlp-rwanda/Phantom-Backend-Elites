const getoperators = "SELECT * FROM operatorss";
const getoperatorById = "SELECT * FROM operatorss WHERE id = $1";
const checkEmailExists = "SELECT s FROM operatorss s WHERE s.email = $1";
const addoperator =
  "INSERT INTO operatorss (fullNames, email, age, dob, phone_number, id_number, driver_licence, address, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
const removeoperator = "DELETE FROM operatorss WHERE id = $1";
const updateoperator = "UPDATE operatorss SET name = $1 WHERE id = $2";

module.exports = {
  getoperators,
  getoperatorById,
  checkEmailExists,
  addoperator,
  removeoperator,
  updateoperator,
};
