const express = require('express')
const router = express.Router()
const { search, searchById, searchQuery } = require('../controllers/video')

router.get('/search', search)
router.get('/searchById', searchById)
router.get('/searchQuery', searchQuery)

module.exports = router