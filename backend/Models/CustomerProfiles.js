const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var customerProfileSchema = new Schema({
    email_id: { type: String },
    phone: { type: String },
    name: { type: String },
    nick_name: { type: String },
    DOB: { type: String },
    address: { type: String },
    profile_img: { type: String },
    favourites: { type: String }
},
    {
        versionKey: false
    });

const sentence = "Hello, this is codesignal";
const checkletters = ['h','e','l','o','i','s'];
const words = sentence.split(' ');

let count = 0;
words.map((word) => {
    let letters = word.split('');
    let flag = 0;
    letters.map((letter) => {
        if ((/[a-zA-Z]/).test(letter)) {
            if(!checkletters.includes(letter.toLowerCase())){
                flag = 1;
            }
        }
    }
    );
    if (flag === 0) {
        count++;
    }
}
)

console.log(count);

const custProfileModel = mongoose.model('customer_profile', customerProfileSchema);
module.exports = custProfileModel;