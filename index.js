const express = require('express')
const mongoose = require("mongoose");
const { App_PORT, DB_URL } = require("./config")
const User = require("./model/userModel")
const app = express()

/* good=> run start server and database connect
PS D:\BACKEND> node index.js
Example app listening on port 8090
Database Successfully connected.
*/


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/test', (req, res) => {
  res.send('Hello World! I am Soumen ')
})


//for run:   npm run dev 
//dev have in D:\BACKEND\package.json

app.post('/sum', (req, res) => {
  let value1 = req.body.value1;
  let value2 = req.body.value2;

  // Sum the values of a and b
  let result = (+value1) + (+value2);

  // Send the response with the result
  res.send(`Hello World! The sum is: ${result}`);
});

//Register
// const registeredUsers = [];

app.post('/register', async (req, res) => {
  const { username, email, phone, password } = req.body;

  if (!username || !email || !phone || !password) {
    return res.status(400).json({ error: 'All field are required' });
  }


  const user = new User({
    username: username,
    email: email,
    phone: phone,
    password: password
  })

  const useremail = await User.findOne({ email: email })
  const userphone = await User.findOne({ phone: phone })

  if (useremail || userphone) {
    res.status(201).json({ message: 'User Already Exist', });
  } else {
    const user_data = await user.save()
    res.status(200).json({ message: 'User registered successfully', user_data });
  }

});

  
//Login
app.post('/login', async (req, res) => {
  const { emailorphone, password } = req.body;

  if (!emailorphone || !password) {
    return res.status(400).json({ error: 'All field are required' });
  }

  console.log(emailorphone)

  var user_data

  if (emailorphone.includes('@')) {
    user_data = await User.findOne({ email: emailorphone })
  } else {
    user_data = await User.findOne({ phone: emailorphone })
  }

  console.log(user_data)

  if (user_data) {

    if (user_data.password == password) {
      res.status(200).json({ message: 'User Login successfully', user_data });
    } else {
      return res.status(200).json({ message: 'Password is not match' });
    }
  } else {
    return res.status(400).json({ message: 'User not exist' });
  }

});
// User Details

app.get('/user_details', async (req, res) => {
  const { email } = req.body;
  const user_data = await User.findOne({ email: email })


  if (email) {
    res.status(200).json({ message: 'User Login successfully', user_data });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
}
)
// UserUpdate
//change password/

app.post('/user_update', async (req, res) => {
  const email = req.body.email;
  const newPassword = req.body.newPassword
  const name = req.body.name

  const user_data = await User.findOne({ email: email})
  if (user_data) {
    const user_update_data = await User.findByIdAndUpdate({
      _id: user_data._id,
      newPassword,
      name
    })
    res.status(200).json({ message: 'User Login successfully', user_update_data });
  }
  else {
    res.status(404).json({ error: 'User not found' });
  }

})

// app.post('/user_update', async(req, res) => {
//   const {oldPassword , newPassword} = req.body;
//   const user_data = await findOne({password:oldPassword})
//   if (user_data) {

//     const user = await findByIdAndUpdate({
//       _id: user_data._id,

//     }

//     ) 

//   } else {
//     res.status(404).json({ error: 'User not found' });
//   }

// })


///______________________________________________________________________

app.listen(App_PORT, () => {
  console.log(`Example app listening on port ${App_PORT}`)
})

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Database Successfully connected.");
  })
  .catch((err) => {
    console.log(err);
  });