import React from 'react';

// Change the icons, function names, and parameters 
// to fit your portfolio topic and schema.

import { MdDeleteForever, MdEdit } from 'react-icons/md';


function Matter({ matter, onEdit, onDelete }) {
    return (
        <tr>
            <td>{matter.caption}</td>
            <td>{matter.majorityVote}</td>
            <td>{matter.dateDecided.slice(0,10)}</td>

            {/* Update these icons to something that matches your style. */}
            <td><MdDeleteForever onClick={() => onDelete(matter._id)} /></td>
            <td><MdEdit onClick={() => onEdit(matter)} /></td>
        </tr>
    );
}

export default Matter;