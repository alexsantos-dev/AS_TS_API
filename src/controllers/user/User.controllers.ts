import UserServices from '../../services/users/User.services'
import { Request, Response } from 'express'

async function create(req: Request, res: Response) {
    try {
        const userData = req.body
        const newUser = await UserServices.create(userData)
        if (userData && newUser) {
            res.status(200).json({ msg: 'User created', newUser })
        } else {
            res.status(409).json({ err: 'Invalid fields' })
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}

async function findAll(req: Request, res: Response) {
    try {
        const users = await UserServices.findAll()
        if (users) {
            res.status(200).json({ Users: users })
        } else {
            res.status(404).json({ err: 'No users found' })
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}

async function findOne(req: Request, res: Response) {
    try {
        const { id } = req.params
        const user = await UserServices.findOne(id)
        if (user) {
            res.status(200).json({ User: user })
        } else {
            res.status(404).json({ err: 'User not found' })
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}

async function update(req: Request, res: Response) {
    try {
        const { id } = req.params
        const fields = req.body
        const allowFields = ['name', 'email']
        const isValidUpdate = Object.keys(fields).every(field => allowFields.includes(field))
        const updated = await UserServices.update(id, fields)

        if (isValidUpdate && updated) {
            res.status(200).json({ msg: 'User updated' })
        } else {
            res.status(400).json({ err: 'Failed to update user' })
        }

    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}

async function erase(req: Request, res: Response) {
    try {
        const { id } = req.params
        const checkUser = await UserServices.findOne(id)

        if (checkUser) {
            const userErased = await UserServices.erase(id)

            if (userErased) {
                res.status(200).json({ msg: 'User erased' })
            }
        } else {
            res.status(404).json({ err: 'User not found' })
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}

export default {
    create,
    findAll,
    findOne,
    update,
    erase
}
