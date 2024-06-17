const asyncHandler =(requestHandler)=>{
    return (req, res, next)=>{
        Promise.resolve(requestHandler(req,res,next)).
        catch((err)=>next(err))
    }/// 2 way to write 
}

export {asyncHandler}

// const asyncHandler =()=>{}
// const asyncHandler =(func)=>()=>{}
// const asyncHandler =(func)=> async()=>{}

// const asyncHandler =(fn)=> async(req,res, next)=>{
//     try {
//         await  fn(req,res,next)// jo function liya usko execute kardo

//     } catch (error) {
//         res.status(error.code || 500).json({// .json ta sen dkita kyuki UI vale nu pta lag jave te 
//             success:false,
//             message: error.message
//         })
//     }
// }





