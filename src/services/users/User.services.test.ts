import { User } from '../../models/user/User.model'
import sequelize from '../../data/data.config'
import UserServices from './User.services'

describe('UserServices', () => {
    let createdUser: User
    const userFields = {
        name: 'teste',
        email: 'teste@email.com'
    }
    beforeAll(async () => {
        await sequelize.sync()
        createdUser = await UserServices.create(userFields) as User
    })
    afterAll(async () => {
        await User.destroy({ where: { email: 'flings@email.com' } })
        await sequelize.close()
    })

    describe('create', () => {
        it('should create a user', async () => {
            const res = createdUser
            expect(res).toBeDefined()
        })
        it('should not create a user', async () => {
            const invalidUser = {
                name: "",
                email: "",
            }
            const res = await UserServices.create(invalidUser)
            expect(res).toBeUndefined()
        })
    })

    describe('findOne', () => {
        it('should return a user', async () => {
            const res = UserServices.findOne(createdUser.id)
            expect(res).toBeDefined()
        })
        it('should not return a user', async () => {
            const res = UserServices.findOne('id')
            expect(Object.keys(res).length).toBe(0)
        })
    })
    describe('update', () => {
        it('should update the user', async () => {
            const fields = {
                name: "teste",
            }
            const res = await UserServices.update(createdUser.id, fields)
            expect(res).toBeDefined()
        })
        it('should not update the user', async () => {
            const fields = {
                name: "",
            }
            const res = await UserServices.update(createdUser.id, fields)
            expect(res).toBeUndefined()
        })
    })
    describe('findAll', () => {
        it('should return users', async () => {
            const res = UserServices.findAll()
            expect(res).not.toBe([])
        })
        it('should not return users', async () => {
            await User.destroy({ where: { email: createdUser.email } })
            const res = UserServices.findAll()
            expect(Object.keys(res).length).toBe(0)
        })
    })
    describe('erase', () => {
        it('should erase a user', async () => {
            const newUser: User = await UserServices.create(userFields) as User
            const res = await UserServices.erase(newUser.id)
            expect(res).toBeDefined()
        })
        it('should not erase a user', async () => {
            const res = await UserServices.erase('id')
            expect(res).toBeUndefined()
        })
    })

})
