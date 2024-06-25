const { PayWithStripe } = require('../controllers/paymentController');
const express = require('express')

const router = express.Router()


router.post('-sheet', PayWithStripe);


module.exports = router


