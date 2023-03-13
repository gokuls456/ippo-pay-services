const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const url = 'mongodb+srv://gokulduki23:OhNWBLmuON7eLloK@cluster0.f5b8jy1.mongodb.net/test?retryWrites=true&w=majority';
const app = express();
app.use(express.json());
app.use(cors());



mongoose.connect(url, {});
    const userSchema = new mongoose.Schema({
        name: String,
    });
const User = mongoose.model('users', userSchema);

app.get('/getTypedValue', (req, res) => {
    
    User.find({})
        .exec()
        .then(users => {
            res.status(200).send(users);
            console.log(users);
        })
        .catch(err => {
            res.status(400)
            console.error(err);
        });
});

app.post('/setTypedValue', (req, res) => {
    console.log(req.body);
    const newUser = new User({
        name: req.body.name,
      });
      
      // Save the new user document to the 'users' collection
      newUser.save()
      .then(() => {
        res.status(200).send({message: 'User saved successfully'});
      })
      .catch((err) => {
        res.status(400)
        console.error('Save failed:', err);
      });
});

app.listen(3005, () => {
    console.log('Server listening on port 3005');
});
