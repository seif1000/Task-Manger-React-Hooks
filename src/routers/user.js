const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const validator = require('validator')
const {auth,ensureGuest} = require('../middleware/auth')
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account')
const router = new express.Router()

router.post('/users', ensureGuest,async (req, res) => {
    
    const user = new User(req.body);
//   
    try {
        await user.save()
     //  sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
      
             
        res.status(400).send(e)
    }
})

router.post('/users/login', ensureGuest,async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send({msg:"email or password incorrect"})
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        //sendCancelationEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})
// const fileStorage = multer.diskStorage({
//     destination:(req, file, cb)=>{
//       cb(null, 'images');
//     },
//     filename:(req, file, cb)=>{
//       cb(null, file.filename + '-' + file.originalname)
//     }
// })
var storage = multer.memoryStorage()
const upload = multer({
    limits: {
        fileSize: 1000000
    },
     storage:storage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
}).single('avatar')


router.post('/users/me/avatar', auth,async (req, res)=>{
    upload(req, res,async function (err) {
        if (err instanceof multer.MulterError) {
          res.status(400).send({err:err.message})
        } else if (err) {
            res.status(400).send({err})
        }
    
        const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
        req.user.avatar = buffer
        await req.user.save()
        
        res.send(buffer)
      })
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send('avatar uploaded successfully')
})

router.get('/users/avatar',auth ,async (req, res) => {
    try {
        const user = await User.findById(req.user._id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})

module.exports = router