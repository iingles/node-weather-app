//Mongo Stuff

//Using ES6 destructuring
const { MongoClient, ObjectID } = require('mongodb')

//Merely typing in "localhost" tends to create strange issues
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'my-database'

//Old parser is being depricated
//as is Monitoring Engine
MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    //if the first arguement exists, something went wrong
    //if the second exists, things went well
    if(err) {
        return console.error('Unable to connect to database')
    }
    //if we see this, we know things went well
    console.log('Connected correctly!')

    //Simply by picking a name and accessing it, Mongo automatically creates the db
    const db = client.db(databaseName)
    
    //Collections are sort of like tables in SQL
    //Documents are sort of like  rows/cols
    
    // db.collection('users').insertOne({
    //     //insertOne allows you to insert one document into the collection
    //     //insertMany can do multiple
    //     name: 'Janet',
    //     age: 49
    // }, (err, result) => {
    //     if(err){
    //         return console.log('Unable to insert user')
    //     }
    //     //"ops" contains everything we just inserted
    //     console.log(result.ops)
    // })

    //findOne takes an object and a function as params
    //remember that the ID is a binary object, not just a string
    // db.collection('users').findOne({ _id: new ObjectID('5ded97919111c8016f143e92')}, (err, user)=> {
         
    //     //searching and not finding something is not an error; it will just equal 'null'
    //     //searching for entries where there are duplicates will just return the first document in the database
    //     //so we need to search for the unique ID 
    //     console.log(user)
    // })

    /*
        Find returns a cursor (pointer) to the data in the database
        You might not want all of the data, but just information about the data
        toArray fetches everything
        count just returns an integer of how many were found 
    */
    // db.collection('users').find({ age: 36 }).toArray((err, users) => {
    //     if(err) {
    //         return console.log('Unable to fetch')
    //     }
    //     console.log(users)
    // }) 

    // db.collection('users').find({ age: 36 }).count((err, count) => {
    //     if(err) {
    //         return console.log('Unable to fetch')
    //     }
    //     console.log(count)
    // })

    //can also updateMany
//   db.collection('users').updateOne({
//         _id: new ObjectID("5ded97919111c8016f143e92")
//     },
//     {
//         $set: {
//             //this only impacts the fields we have specifically set out
//             name: 'Mike'
//         },
//         $inc: {
//             //increment the age by one
//             age: 1
//         }
//     }).then((result)=>{
//         console.log(result)
//     }).catch((error) => {
//         console.log(error)
//     })

    //can also deleteOne
    // db.collection('users').deleteMany({
    //     age: 27
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
})
