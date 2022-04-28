function getToken() {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let tokenLength = 64;
    let token = "";
  
    for (let i = 0; i < tokenLength; i++) {
      let randomNumber = Math.floor(Math.random() * chars.length);
      token += chars.substring(randomNumber, randomNumber + 1);
    }
    return token;
  }
  
  export default getToken;