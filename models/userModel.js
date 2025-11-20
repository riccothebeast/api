import mongoose from "mongoose";

const { Schema } = mongoose;
const userSchema = new Schema(
    {
        name:{ type: String, required: true, trim: true },
        email:{ type: String, required: true, unique: true, trim: true },
        password:{ type: String, required: true },
        profilepic:{type:String}
    },
    { timestamps: true
    }
)

// Create the actual model (reuse if already compiled to avoid OverwriteModelError)
const User = mongoose.models.User || mongoose.model("User", userSchema);

//export to use in user logic

export default User;