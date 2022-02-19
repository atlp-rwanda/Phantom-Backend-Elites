/* eslint-env browser */

let add = function (x, y) {
  console.log("value of x:" + x + " and value of y:" + y);
  // eslint-disable-next-line no-undef
  return new Promise(function (resolve, reject) {
    if (x < 0) {
      reject("x should be greater than 0");
    } else {
      resolve(x + y);
    }
  });
};

// eslint-disable-next-line no-undef
exports.add = add;
