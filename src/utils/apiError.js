class apiError extends Error {
    constructor(
        statusCode,
        message="something went wrong",
        error=[],
        stack=""
    ){
        super(message)// constructor overwrite kar reha enu messgae te karega hi karega

        this.statusCode=statusCode
        this.data=null
        this.message=message
        this.success= false
        this.errors=error

        if(stack){
            this.stack=stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }

    }// e kita agar age ja k api errors ayi te is tra hi aange

}


export {apiError}