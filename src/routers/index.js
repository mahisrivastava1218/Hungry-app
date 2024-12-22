const { register } = require("../controllers/user.controller")

const {Router} = require("express")
const router = Router()


router.post("/register", register)


module.exports = router;