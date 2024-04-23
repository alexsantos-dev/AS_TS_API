import request from 'supertest'
import app from "../../app"
import { User } from '../../models/user/User.model'
import sequelize from '../../data/data.config'

describe('UserControllers', () => {
    let createdUser: any
    let userId: any
    const userData = {
        name: 'teste',
        email: 'teste@email.com'
    }
    beforeAll(async () => {
        await sequelize.sync()
        createdUser = await request(app)
            .post('/user')
            .send(userData)
        userId = createdUser.body.newUser.id
    })

    afterAll(async () => {
        await User.destroy({ where: { email: 'teste@email.com' } })
        await sequelize.close()
    })
    describe('create', () => {
        it('should return success message and status 200', async () => {
            const res = createdUser
            expect(res.status).toBe(200)
            expect(res.body.msg).toBe('User created')
            expect(res.body.newUser).toBeDefined()
        })
        it('should return error message and status 409', async () => {
            const invalidUserData = {
                name: '',
                email: ''
            }
            const res = await request(app)
                .post('/user')
                .send(invalidUserData)
            expect(res.status).toBe(409)
            expect(res.body.err).toBe('Invalid fields')
        })
    })
    describe('update', () => {
        it('should return sucess message and status 200', async () => {
            const fields = {
                name: 'testee'
            }
            const res = await request(app)
                .patch(`/user/${userId}`)
                .send(fields)
            expect(res.status).toBe(200)
            expect(res.body.msg).toBe('User updated')
        })
        it('should return error message and status 400', async () => {
            const fields = {
                phone: 'testee'
            }
            const res = await request(app)
                .patch(`/user/${userId}`)
                .send(fields)
            expect(res.status).toBe(400)
            expect(res.body.err).toBe('Failed to update user')
        })
    })
    describe('findAll', () => {
        it('should return sucess message and status 200', async () => {
            const res = await request(app)
                .get('/user')
            expect(res.status).toBe(200)
            expect(Object.keys(res.body.Users).length).toBeGreaterThan(0)
        })
        it('should return error message and status 404', async () => {
            const res = await request(app)
                .get('/use')
            expect(res.status).toBe(404)
            expect(res.body.Users).toBeUndefined()
        })
    })
    describe('findOne', () => {
        it('should return sucess message and status 200', async () => {
            const res = await request(app)
                .get(`/user/${userId}`)
            expect(res.status).toBe(200)
            expect(res.body.User).toBeTruthy()
        })
        it('should return error message and status 404', async () => {
            const res = await request(app)
                .get('/user/id')
            expect(res.status).toBe(404)
            expect(res.body.err).toBe('User not found')
        })
    })
    describe('erase', () => {
        it('should return a sucess message and status 200', async () => {
            const res = await request(app)
                .delete(`/user/${userId}`)
            expect(res.status).toBe(200)
            expect(res.body.msg).toBe('User erased')
        })
        it('should return a sucess message and status 200', async () => {
            const res = await request(app)
                .delete(`/user/${userId}`)
            expect(res.status).toBe(404)
            expect(res.body.err).toBe('User not found')
        })
    })
})
