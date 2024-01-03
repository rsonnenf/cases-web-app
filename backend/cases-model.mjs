// Models for the Matter Collection

// Import dependencies.
import mongoose from 'mongoose';
import 'dotenv/config';

// Connect based on the .env file parameters.
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);
const db = mongoose.connection;

// Confirm that the database has connected and print a message in the console.
db.once("open", (err) => {
    if(err){
        res.status(500).json({ Error: 'The database has not properly connected.' });
    } else  {
        console.log('The database is properly connected.');
    }
});

// SCHEMA: Define the collection's schema.
const matterSchema = mongoose.Schema({
	caption:    { type: String, required: true },
	majorityVote:     { type: Number, required: true, default: 'votes', max:[9, 'There are only 9 Supreme Court Justices.']},
	dateDecided: { type: Date, required: true, default: Date.now }
});

// Compile the model from the schema 
// by defining the collection name "matters".
const matters = mongoose.model('Matters', matterSchema);


// CREATE model *****************************************
const createMatter = async (caption, majorityVote, dateDecided) => {
    const matter = new matters({ 
        caption: caption, 
        majorityVote: majorityVote, 
        dateDecided: dateDecided 
    });
    return matter.save();
}


// RETRIEVE model *****************************************
// Retrieve all documents and return a promise.
const retrieveMatters = async () => {
    const query = matters.find();
    return query.exec();
}

// RETRIEVE by ID
const retrieveMatterByID = async (_id) => {
    const query = matters.findById({_id: _id});
    return query.exec();
}

// DELETE model based on _id  *****************************************
const deleteMatterById = async (_id) => {
    const result = await matters.deleteOne({_id: _id});
    return result.deletedCount;
};


// UPDATE model *****************************************************
const updateMatter = async (_id, caption, majorityVote, dateDecided) => {
    const result = await matters.replaceOne({_id: _id }, {
        caption: caption,
        majorityVote: majorityVote,
        dateDecided: dateDecided
    });
    return { 
        _id: _id, 
        caption: caption,
        majorityVote: majorityVote,
        dateDecided: dateDecided 
    }
}

// EXPORT the variables for use in the controller file.
export { createMatter, retrieveMatters, retrieveMatterByID, updateMatter, deleteMatterById }