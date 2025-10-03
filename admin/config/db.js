const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
global.url = "mongodb+srv://lmsuser:Phph73g9d5sjWiTf@ev.hfsqrfg.mongodb.net/lms?retryWrites=true&w=majority";
// Connecting to the database
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});