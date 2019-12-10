const mongoose = require('mongoose')
const validator = require('validator')

/*
    similar to MongoClient.connect
    url is slightly different
    db name is included in the url
*/
mongoose.connect('mongodb://127.0.0.1:27017/my-database', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})


//MODELS
/*
    Mongoose takes the name of the model and makes it all lowercase, 
    and pluralizes it - i.e. 'User' becomes 'users'
*/

//Data sanitization allows us to modify data before we save it.
//To do this we can add other properties on the model objects.
//Custom validation - validate() - lets us set up anything we want.
//Or we can use the "validate" plugin


//Takes two arguements, string name and definition of fields
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        //remove white spaces
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value) ) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be a positive number.')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 10,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain string "password"')
            }
        }
    }
})

const Task = mongoose.model('Tasks', {
    name: {
        type: String
    },
    complete: {
        type: Boolean
    }
})

//Creating instance of model
// const me = new User({
//     name: 'wowhoo',
//     email: 'blah@email.com',
//     age: 33,
//     password: 'wordup!!!!'
// })

// const task = new Task({
//     name: 'Learn Mongoose Library',
//     complete: 'false'
// })

//using methods on our instance

/*
    save() doesn't take arguments;  returns a promise
    If things go well, save to database; if the don't, 
    return an error. __v: is the version of the document.
*/

me.save().then(()=> {
    console.log(me)
}).catch((err)=>{
    console.log('error', err)
})

// task.save().then(()=>{
//     console.log(task)
// }).catch((err)=> {
//     console.log('error',err)
// })