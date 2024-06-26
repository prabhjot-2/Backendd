import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from  "mongoose-aggregate-paginate-v2"// used to add plugin

const commentSchema= new Schema(
    {
        content:{
            type:String,
            required:true
        },
        video:{
            type:Schema.Types.ObjectId,
            ref:"Video"
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {
        timestamps:true
    }
)


commentSchema.plugin(mongooseAggregatePaginate)// this is used to add mongoose aggregation


export const Comment=mongoose.model("Comment", commentSchema);

