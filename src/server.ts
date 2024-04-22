import app from './app'
import sequelize from './data/data.config'

const PORT: number = Number(process.env.PORT) || 3000

app.listen(PORT, async () => {
    await sequelize.sync()
    console.log(`✅ connected Port: ${PORT}`)
})