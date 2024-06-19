import {asyncHandler} from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiError.js"
import {User} from "../models/user.models.js"
import {uploadOnCloundinary} from "../utils/cloudinary.js"
import { apiResponse } from "../utils/apiResponse.js"



const registerUser=asyncHandler(async(req,res)=>{
    //get user details from frontend
    //validation (li user ne jo bhjya shi bhjya koi galat te nhi  bhej ta)
    //check if user already exists: username , email
    //check for images , check for avatar
    //upload them to cloudinary 
    // create user object - create entry in db 
    // remove password and refresh token field from response
    // check for user creation 
    // return res

    const {fullname, email, username, password}=req.body   //agar data json ja form ch anda te ffer body nal details lai skde
    // console.log("email", email)
    // if (fullname==="") {
    //     throw new apiError(400, "fullname is req")
    // }
    if(
        [fullname, email, username, password].some((field)=>field?.trim() ==="")// e sidha check kar reha ki values jo payia oo empty te nhi ann diya agar empty ann gyia te o true return kar k if run kra dega 
    ){
        throw new apiError(400, "fullname is req")
        
    }

    const exxistedUser= await User.findOne({
        $or: [{username},{email}]
    })// ede nal one user model ch find krna ki username te emial nal user hai te $ nal ik to vaad entry nal vekh skde nhi te single user hunde 

    if(exxistedUser){
        throw new apiError(409, "user wirht email and username already exist ")// e apierror apa ik util ch file likhi te onu dubara dubara use kita 
    }

    const avatarlocalath=req.files?.avatar[0]?.path// is nal o multer to path lai lainda oda te local ch sAVE ho janda
    // const coverImageLocalPath=req.files?.coverImage[0]?.path;

    let coverImageLocalPath
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
        coverImageLocalPath=req.files.coverImage[0].path
    }

    if(!avatarlocalath)
        throw new apiError(400,"avatar file is required")

    const avatar=await uploadOnCloundinary(avatarlocalath)
    const coverImage=await uploadOnCloundinary(coverImageLocalPath)

    if(!avatar){
        throw new apiError(400,"avatar file is required")
    }

    const user= await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url || "", // ?. nal j hove te fer hi url davgae hunda ja te url deda j nhi haiga te empty dedo
        email,
        password,
        username:username.toLowerCase()
    })// ede nal user create kuta te entry db ch pati

    const createdUser=await User.findById(user._id).select(// user ._id jehda _id hnda mongoDb ape crete karda user jado add karda o

        "-password -refreshToken"// e oo likhyia jhedia nhi chahidia te minus sign nal likh by default sara select hunde 
    )

    if(!createdUser){
        throw new apiError(500, "something went wrong while regitering the user  ")
    }

    return res.status(201).json(
        new apiResponse(200,createdUser, "user registered successfully")
    )


})

export {registerUser}
