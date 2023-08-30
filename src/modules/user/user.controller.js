import userModel from "../../../DB/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmailVerify, sendEmailPass } from "../../emails/nodemailer.js";


// const userID = req.user._id;
// const {id:_id, userName, email, password, age, phone, isDeleted, isOnline} = req.user;
// const checkEmail = 0;
export const signUp = async (req, res) => {
  const { userName, email, password, confirmPassword, age, gender, phone } =
  req.body;
  
  const checkEmail = await userModel.findOne({email});
  // console.log(checkEmail);
  if (checkEmail) {
    res.json({ message: "User already exist...!" });
  } else if (password !== confirmPassword) {
    res.json({ message: "Password doesnt match...!" });
  } else {
    const hash = bcrypt.hashSync(password, 4);
    
    const user = await userModel.insertMany({
      userName,
      email,
      password: hash,
      confirmPassword: hash,
      age,
      gender,
      phone,
    });
    let signUpToken = jwt.sign({email:email},process.env.JWT_KEY)
    // console.log(signUpToken);
    sendEmailVerify({email,signUpToken})
    res.json({ message: "SignUp Successfully", user });
  }
};

//-------------------------------------------------------------------------------------------------
export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  
  const checkEmail = await userModel.findOne({ email });
  const emai = checkEmail.email;
  if (checkEmail && bcrypt.compareSync(password, checkEmail.password)) {
    let token = jwt.sign(
      { id: checkEmail.id, name: checkEmail.userName },
      process.env.JWT_KEY
      );
      await userModel.updateOne({email},{isOnline:true,isDeleted:false})
      res.json({ message: "Signed In Successfully", token });
  } else {
    
    res.json({ message: "Wrong Email or Password !!" });
  }
};

//-------------------------------------------------------------------------------------------------
export const changePassword = async (req, res) => {
  
  const { oldPassword, newPassword, confirmPassword } = req.body;
  
  const {_id, password} = req.user;
  
  
  console.log(password);
  console.log(_id);
  
  if (!bcrypt.compareSync(oldPassword, password)) {
    
    res.json({ message: "Old Password is wrong !!" });
    
  } else if (newPassword !== confirmPassword) {
    
    res.json({ message: "password doesnt match !!" });
    
  } else {
    
    const hash = bcrypt.hashSync(newPassword, 4);
    // const hashedPass = {newPassword:hash};
    console.log(hash);
    const updatedUser = await userModel.updateOne({_id},{password:hash});
    res.json({ message: "Password Changed", updatedUser});
  }
  
};

//-------------------------------------------------------------------------------------------------
export const updateUser = async (req, res) => {
  const {_id} = req.user;
  const {userName, age, phone} = req.body;

  
 await userModel.updateOne({_id},{userName:userName,age:age,phone})
 res.json({message:"User updated Successfully"})
  
};

//-------------------------------------------------------------------------------------------------
export const deleteUser = async (req, res) => {
  const {_id} = req.user;
  
 await userModel.deleteOne({_id})
 res.json({message:"User deleted Successfully"})
  
};

//-------------------------------------------------------------------------------------------------
export const softDelete = async (req, res) => {
  const {_id} = req.user;
  
  await userModel.updateOne({_id},{isDeleted:true})
 res.json({message:"User soft deleted Successfully"})
  
};

//-------------------------------------------------------------------------------------------------
export const logOut = async (req, res) => {
  const {_id} = req.user;
  
  await userModel.updateOne({_id},{isOnline:false})

 res.json({message:"Loged Out . . "})
  
};

//-------------------------------------------------------------------------------------------------
export const verified = async (req, res) => {
//   const token = req.params.signUpToken;
// const decoded = jwt.verify({token}, process.env.JWT_KEY);
// const decodedEmail = decoded.email;
// console.log(token);
  await userModel.findOneAndUpdate({email:req.params.email},{isVerified:true})
  res.json({message: "Verified"})

}

//-------------------------------------------------------------------------------------------------
export const forgotPass = async (req, res, next) => {

  const { email, newPassword, confirmPassword, code } = req.body;

  
  const checkEmail = await userModel.findOne({ email });

    if (!checkEmail) return res.json({ message: "Email not exist" });


    const random = Math.floor(Math.random() * 9000 + 1000);

    sendEmailPass({ random, email });

    const codeAdd = await userModel.findOneAndUpdate({ email }, { verificationCode: random }, { new: true });
    console.log(codeAdd);

    
    return res.json({ message: "Please enter the newPassword and the code sent to your email..." });
     
};


//-------------------------------------------------------------------------------------------------
export const checkCode = async (req, res) => {

  const {email, newPassword, confirmPassword, code } = req.body;
  // const user = req.user
  const checkEmail = await userModel.findOne({ email });
  if ( checkEmail.verificationCode !== code) {

  console.log(checkEmail.verificationCode);
  return res.json({ message: "In-Valid code.. try again !!" }) 
  
}
if (newPassword !== confirmPassword)  return res.json({ message: "Password doesnt match !!" });

const hashedPass = bcrypt.hashSync(newPassword, 4)

await userModel.updateOne({email},{password:hashedPass})

  return res.json({ message: "Success" });
};



