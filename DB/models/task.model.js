import mongoose, {SchemaTypes} from "mongoose";

const taskSchema = new mongoose.Schema({
    title : {
        type:String,
        require:true
    },
    description  : {
        type:String,
        require:true
    },
    status : {
        type:String,
        require:true,
        enum:['toDo' , 'doing' , 'done'],
        description: "can only be one of the enum values and is required",
        default:'toDo'
    },
    deadline : {
        type: Date,
    },
    isDeleted : {
        type:Boolean,
        default:false
    },
    assignTo  : {
        type :SchemaTypes.ObjectId,
        require:true,
        ref:"user"
    },
    userId : {
        type : SchemaTypes.ObjectId,
        require:true,
        ref:"user"
    }

}, {timestamps: true});


const taskModel = mongoose.model('task', taskSchema);

export default taskModel;