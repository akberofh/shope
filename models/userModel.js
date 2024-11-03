import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String, 
   
      default: '',
    },
    isVerified:{
      type:Boolean,
      default:false
  },
  resetPasswordToken:String,
  resetPasswordExpiresAt:Date,
  verficationToken:String,
  verficationTokenExpiresAt:Date,
  },
  { timestamps: true }
);

userSchema.pre('save',async function(next){
	if(!this.isModified('password')){
		next()
	}

	const salt=await bcrypt.genSalt(10);

	this.password=await bcrypt.hash(this.password,salt)
})

userSchema.methods.parolaKontrol = async function (girilenParola) {
	return await bcrypt.compare(girilenParola, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;