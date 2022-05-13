import bcrypt from 'bcrypt'
import { User } from '../../sequelize/models'
import dotenv from 'dotenv'

dotenv.config()

// Change Password Function
const changePassword = (req, res) => {
  const { id } = req.params
  const { currentPassword, newPassword, confirmPassword } = req.body
  return User.findOne({
    where: {
      id
    }
  })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          error: "User does not exist or you are now logged out"
        })
      } else if (user) {
        // Compare password and check if the new password matches with the confirm new password
        if ((bcrypt.compareSync(currentPassword, user.password)) && (newPassword === confirmPassword)) {
          // Changed Hashed Password and user saved
          user.password = bcrypt.hashSync(newPassword, Number.parseInt(process.env.SALT_ROUNDS))
          user.save()
          return res.status(200).json({
            message: "Password successfully changed"
          })
          // If new password doesn't match with the confirm password
        } else if ((bcrypt.compareSync(currentPassword, user.password)) && (newPassword !== confirmPassword)) {
          return res.status(400).json({
            error: "Passwords entered do not match"
          })
          // If the current password does not match with the password in the database
        } else if (!(bcrypt.compareSync(currentPassword, user.password))) {
          return res.status(400).json({
            error: "The password or eamil are incorrect"
          })
        }
      }
    })
    .catch((err) => {
      return res.status(404).json(err.message)
    })
}
export default changePassword
