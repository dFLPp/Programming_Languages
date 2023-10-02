import { Schema, model} from 'mongoose';
import bcrypt from 'bcryptjs'

export interface IUser {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
    name:{
        type: String,
        required: [true, "must provide name"],
        minlength: 3,
        maxlength: 50
    },
    email:{
        type: String,
        required: [true, "must provide email"],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "must provide valid email"],
        unique: true

    },
    password:{
        type: String,
        required: [true, "must provide password"],
        minlength: 6,
    }
}, {timestamps: true})

userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

const User = model<IUser>('User', userSchema);
export default User