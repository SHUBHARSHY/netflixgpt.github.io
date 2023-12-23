export const checkValidData =(email,password,name)=>{
const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email)
const isPassvalid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)
// const isNamevalid =/^[a-zA-Z\\s]*$/.test(name)

// if(!isNamevalid) return "Name id Not valid"

if(!isEmailValid)return "Email Id is not valid"
 
if(!isPassvalid) return "Password is not valid"


return null
}