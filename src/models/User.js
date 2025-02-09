// import mongoose from "mongoose";


// const userSchema = new mongoose.Schema({
//     username: { type: String, required: [true, "Please provide a username"] },
//     email: { type: String, required: [true, "Please provide an email"], unique: true },
//     password: { type: String, required: [true, "Please provide a password"] },
//     phone: { type: String, required: [true, "Please provide a phone number"] },
//     isVerified: { type: Boolean, default: false },
//     isAdmin: { type: Boolean, default: false },
//     chats: {
//         type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
//         default: []
//     },
//     forgotPasswordToken: String,
//     forgotPasswordTokenExpiry: Date,
//     verifyToken: String,
//     verifyTokenExpiry: Date,
// });


// const User = mongoose.models.User || mongoose.model("User", userSchema);

// export default User;