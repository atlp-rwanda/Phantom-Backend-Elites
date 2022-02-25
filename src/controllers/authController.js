// eslint-disable-next-line
console.log("Auth controller to be used");

const controller = (req, res) => {
  res.status(200).json({
    status: "success",
    data: "Welcome to phantom app backend side",
  });
};

export default controller;
