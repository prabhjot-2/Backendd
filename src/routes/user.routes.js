import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";


const router=Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
             name:"coverImage",
             maxCount:1
        }
    ]),// e ik middleware haiga jheda method use hon dya us to phela likh lo te is nal image bhej skde hai
    
    
    registerUser
)


export default router