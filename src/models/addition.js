const add = (x, y) => {
  console.log(`value of x:${x} and value of y:${y}`);
  if (x < 0) {
    console.log("x should be greater than 0");
  } else {
    console.log(x + y);
  }
};

export default add;
