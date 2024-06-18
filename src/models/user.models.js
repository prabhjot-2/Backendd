import mongoose, {Schema} from "mongoose";
import jwt  from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema =new Schema({

    username:{
        type:String,
        required:true,
        unique: true,
        lowercase: true,
        trim: true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique: true,
        lowercase: true,
        trim: true,
    
    },
    fullname:{
        type:String,
        required:true,
        trim: true,
        index:true
    },

    avatar:{
        type:String, //cloudinary url it is like was in which we upload the file get link
        required:true,
        
    },

    coverImage:{
        type:String,
    },

    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref:"Video"
        }
    ],

    password:{
        type:String,
        required:[true, 'Password is required']
    },
    refreshToken:{
        type: String
    }
},{ timestamps:true})

//jab apka data save hone ja rha hoga just use phele ye bol dega isko run karo jo pre k bracket me likha hoga 
// ye hook hai (pre)

userSchema.pre("save", async function (next) {// async is liye lita kyuki inu run hon ch time lagda bhut 
    if(!this.isModified("password")) return next();// e ta lagaya kyu ki j modified hoga pass word fer hi run krna enu j nhi kita eda te har vari run hon te e password change karda ravega

    this.password= await bcrypt.hash(this.password,10)// e is liye use hoi isne eda password  ch thora change kita onu crypt krta hash value lga ti 

})

userSchema.methods.isPasswordCorrect = async function (password){// custom method design using methods 

    return await bcrypt.compare(password, this.password)// ene bcypt package ape check karda te e ik jhera password fita te jhera encrypt password dona nu ape compare kar dinda

}

userSchema.methods.generateAccessToken =  function (){// e token bna dite 
    return jwt.sign(
        {
            _id: this._id,
            email:this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY

        }
    )
}

userSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY

        }
    )
}



export const User= mongoose.model("User, userSchema")
