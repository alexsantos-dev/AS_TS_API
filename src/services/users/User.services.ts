import { User, UserCreationAttributes } from "../../models/user/User.model"

async function create(userData: Omit<UserCreationAttributes, 'id'>): Promise<User | null> {
    try {
        const newUser = await User.create(userData)
        return newUser
    } catch (error) {
        console.error({ error: error })
        return null
    }
}

export default {
    create
}
