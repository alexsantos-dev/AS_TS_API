import { Model, DataTypes } from 'sequelize'
import sequelize from '../../data/data.config'

interface UserAttributes {
    id: string
    name: string
    email: string
}

interface UserCreationAttributes extends Omit<UserAttributes, 'id'> { }

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: string
    public name!: string
    public email!: string
}

User.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            len: [2, 50],
            is: /^[\u00C0-\u017Fa-zA-Z\s]*$/
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    }
}, {
    sequelize,
    modelName: 'User'
})

export { User, UserAttributes, UserCreationAttributes }