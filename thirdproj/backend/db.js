const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/iNotebook" //connection string

const connectToMongo = ()=>{
    mongoose.connect(mongoURI,{
        useNewUrlParser:true,useUnifiedTopology:true
    },).then(() => console.log('connected Successfully'))
    .catch((err) => {console.error(err);});
}

module.exports = connectToMongo;
