// Controllers for the Matter Collection

import 'dotenv/config';
import express from 'express';
import * as matters from './cases-model.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());  // REST needs JSON MIME type.


// CREATE controller ******************************************
app.post ('/matters', (req,res) => { 
    matters.createMatter(
        req.body.caption, 
        req.body.majorityVote, 
        req.body.dateDecided
        )
        .then(matter => {
            console.log(`${matter.caption} was successfully added to the collection.`);
            res.status(201).json(matter);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'The matter you entered could not be properly processed.' });
        });
});


// RETRIEVE controller ****************************************************
app.get('/matters', (req, res) => {
    matters.retrieveMatters()
        .then(matters => { 
            if (matters !== null) {
                console.log(`All matters were successfully retrieved.`);
                res.json(matters);
            } else {
                res.status(404).json({ Error: 'The matters could not be found.' });
            }         
         })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'The matter you entered could not be properly processed.' });
        });
});


// RETRIEVE by ID controller
app.get('/matters/:_id', (req, res) => {
    matters.retrieveMatterByID(req.params._id)
    .then(matter => { 
        if (matter !== null) {
            console.log(`"${matter.caption}" matched the provided ID and was retrieved.`);
            res.json(matter);
        } else {
            res.status(404).json({ Error: 'The matter could not be found.' });
        }         
     })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'The matter you entered could not be properly processed.' });
    });

});


// UPDATE controller ************************************
app.put('/matters/:_id', (req, res) => {
    matters.updateMatter(
        req.params._id, 
        req.body.caption, 
        req.body.majorityVote, 
        req.body.dateDecided
    )
    .then(matter => {
        console.log(`"${matter.caption}" was updated accordingly.`);
        res.json(matter);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'The matter you entered could not be properly processed.' });
    });
});


// DELETE Controller ******************************
app.delete('/matters/:_id', (req, res) => {
    matters.deleteMatterById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                console.log(`${deletedCount} matter matched the provided ID and was deleted.`);
                res.status(200).send({ Success: 'The matter was successfully deleted.' });
            } else {
                res.status(404).json({ Error: 'The matter could not be found.' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'The matter was not properly deleted.' });
        });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});