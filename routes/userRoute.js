const express = require("express");
const {getAllUser, Signup, userLogin} = require("../controller/userController");
const router = express.Router();



router.get("/",getAllUser);
router.post("/signup",Signup);
router.post("/login",userLogin);


module.exports = router;