import express from 'express'
import changePassword from '../controllers/changePasswordController'
import changePasswordAuth from '../middleware/changePasswordAuth'

const router = express.Router()


router.post('/:id', changePassword)

export default router
