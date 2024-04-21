import { Router } from 'express'
import UserControllers from '../../controllers/user/User.controllers'

const router = Router()

router.post('/', UserControllers.create)

export default { router }