export const userMock = {
  firstName: 'test',
  lastName: 'test',
  email: 'user@gmail.com',
  gender: 'male',
  roleId: 2,
};
export const userToDelete = {
        firstName: "delete",
        lastName: "user",
        email: "delete1@user.com",
        gender: "unknown",
        roleId:2,
}
//Pre-created user for testing reset password
export const userPasswordReset = {
  email:"reset@password.com",
  password:"reset@password" 
}
//For reseting a password with an invalid token
export const resetPasswordWithInvalidToken = {
  token:"slkdfjsduerueiow943509238-0elsdfoeir304923-49sk..,xcccxcsdfwerudfdsifsdisdffsfs",
  password:"reset@password",
  confirmPassword:"reset@password"
}
export const userWithoutFirstName = {
    lastName: 'test',
    email: 'user@gmail.com',
    gender: 'male',
    roleId: 2,
  };
  export const userWithoutLastName = {
    firstName: 'test',
    email: 'user@gmail.com',
    gender: 'male',
    roleId: 2,
  };
  export const userWithoutEmail = {
    firstName: 'test',
    lastName: 'test',
    gender: 'male',
    roleId: 2,
  };
  export const userWithoutGender = {
    firstName: 'test',
    lastName: 'test',
    email: 'user@gmail.com',
    roleId: 2,
  };
  export const userWithoutRole = {
    firstName: 'test',
    lastName: 'test',
    email: 'user@gmail.com',
  };
  export const adminMock = {
    email: 'admin@admin.com',
    password: 'admin',
  };