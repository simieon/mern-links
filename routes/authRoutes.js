const { Router} = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const router = Router()

router.post(
    '/register', 
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Minimum length is 6 symbols').isLength({min: 6})
    ],
    async(req, res) => {
    try {
        console.log('Body', req.body)
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(), 
                message: 'Invalid data by registration. Please try again'
            })
        }

        const { email, password } = req.body

        const candidate = await User.findOne({ email })

        if(candidate){
            return res.status(400).json({ message: "This user is already registered" })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({ email, password: hashedPassword })

        await user.save()

        res.status(201).json({ message: "User has been registered" })
    } catch (e) {
        res.status(500).json({ message: "Something went wrong..." })
    }
})

router.post(
    '/login',
    [
        check('email', 'Enter the correct email').normalizeEmail().isEmail(),
        check('password', 'Enter the password').exists(),
    ],
    async(req, res) => {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(), 
                message: 'Invalid data by login. Please try again'
            })
        }

        const { email, password } = req.body

        const user = await User.findOne({ email })

        if(!user){
            return res.status(400).json({ message: 'User not found' })
        }
        
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({ message: 'Invalid password. Please try again'})
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        )

        res.json({token, userId: user.id})
    } catch (e) {
        res.status(500).json({ message: "Something went wrong..." })
    }
})


module.exports = router;