import { Router } from 'express'
import UserControllers from '../../controllers/user/User.controllers'

const router = Router()

router.post('/', UserControllers.create)
router.get('/', UserControllers.findAll)
router.get('/:id', UserControllers.findOne)
router.patch('/:id', UserControllers.update)
router.delete('/:id', UserControllers.erase)
export default { router }