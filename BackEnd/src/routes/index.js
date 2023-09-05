const express = require('express')
const router = express.Router();
const {signup,signin} = require('../controller/index')

const {validateSignupRequest,validateSigninRequest,isRequestValidated} = require('../validators/index')

router.post('/signup',validateSignupRequest,isRequestValidated,signup);
router.post('/signin',validateSigninRequest,isRequestValidated,signin);

/* router.post('/profile',requireSignin, (req,res) => {
    res.status(200).json({user:"profile"})
})
 */

module.exports = router;