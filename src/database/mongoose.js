const mongoose = require('mongoose')

const uri = "mongodb+srv://iingles:DagobahSystem%21%21@cluster0-rxesh.mongodb.net/test?retryWrites=true&w=majority"

/*
    similar to MongoClient.connect
    url is slightly different
    db name is included in the url
*/
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})




