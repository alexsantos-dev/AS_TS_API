import { Identifier, UpdateOptions, DestroyOptions } from 'sequelize'
import { User, UserAttributes, UserCreationAttributes } from "../../models/user/User.model"

async function create(userData: Omit<UserCreationAttributes, 'id'>): Promise<User | undefined> {
    try {
        const newUser = await User.create(userData)
        return newUser
    } catch (error: any) {
        console.error(error)
    }
}

async function findAll() {
    try {
        const users = await User.findAll()
        if (users.length > 0) {
            return users
        }
    } catch (error: any) {
        console.error(error)
    }
}

async function findOne(id: Identifier) {
    try {
        const user = await User.findByPk(id)
        if (user) {
            return user
        }
    } catch (error: any) {
        console.error(error)
    }
}

async function update(id: Identifier, fields: Partial<UserAttributes>) {
    try {
        const updated = await User.update(fields, {
            where: {
                id: id
            }
        } as UpdateOptions)
        if (update.length > 0) {
            return updated
        }
    } catch (error: any) {
        console.error(error)
    }
}

async function erase(id: Identifier) {
    try {
        const user = await User.destroy({
            where: {
                id: id
            }
        } as DestroyOptions)
        if (user) {
            return user
        }
    } catch (error) {
        console.error(error)
    }
}

export default {
    create,
    findAll,
    findOne,
    update,
    erase
}
