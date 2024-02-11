
//mongoclient 
const { MongoClient } = require('mongodb'); 
let dbConnection;
let uri ='mongodb+srv://aditi1042003:MXIQNu2EEGavKgTB@cluster1.dcwqxc2.mongodb.net/?retryWrites=true&w=majority';
//to export modules
module.exports ={
    connectToDb: (cb)=>{
        //string to connect.
        //asynchronnuous task mongodb://localhost:27017
        // local host: mongodb://0.0.0.0:27017/testing_db
        MongoClient.connect(uri)
        .then((client)=>{
            dbConnection = client.db();
            //calling for a callback function and invvoking it
            return cb();
        })
        .catch(err=>{
            console.log(err);
            return cb(err);

        })

    },
    getDb: ()=> dbConnection
}