import React from 'react';
import Matter from './Case';

// Change the function names and parameters 
// to fit your portfolio topic and schema.

function MatterList({ matters, onDelete, onEdit }) {
    return (
        <table id="matters">
            <caption>You may add, edit, and delete cases from this page</caption>
            <thead>
                <tr>
                    <th>Caption</th>
                    <th>Votes in Majority</th>
                    <th>Date Decided</th>
                    <th>Delete</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                {matters.map((matter, i) => 
                    <Matter 
                        matter={matter} 
                        key={i}
                        onDelete={onDelete}
                        onEdit={onEdit} 
                    />)}
            </tbody>
        </table>
    );
}

export default MatterList;
