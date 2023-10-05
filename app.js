const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')

const authRoutes = require('./routes/authRoutes')
const linkRoutes = require('./routes/linkRoutes')
const redirectRoutes = require('./routes/redirectRoutes')

const app = express()

app.use(express.json({ extended: true }))

app.use('/t', redirectRoutes)
app.use('/api/link', linkRoutes)
app.use('/api/auth', authRoutes)

if(process.env.NODE_ENV === 'production'){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (req, res) => {
        res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000

async function start(){
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`))
    }catch(err){
        console.log('Server error', err.message)
        process.exit(1)
    }
}



start()