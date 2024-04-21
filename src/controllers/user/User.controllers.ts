import UserServices from '../../services/users/User.services'
import { Request, Response } from 'express'

async function create(req: Request, res: Response) {
    try {
        const userData = req.body
        const newUser = await UserServices.create(userData)

        if (newUser) {
            res.status(200).json(newUser)
        } else {
            res.status(500).json({ error: 'Failed to create user' })
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}

export default {
    create
}
