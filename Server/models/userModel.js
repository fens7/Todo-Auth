import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        avatar: String,
        resetPasswordToken: String,
        resetPasswordExpires: String,
    },
    { timestestamps: true },
);

export default mongoose.model('User', userSchema);
