import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { BiSolidBookAdd } from "react-icons/bi";
import { TbEdit } from "react-icons/tb";

// Change the icons, function names, and parameters 
// to fit your portfolio topic and schema.

export const AddMatterPageTable = () => {

    const [caption, setCaption]       = useState('');
    const [majorityVote, setMajorityVote]         = useState('');
    const [dateDecided, setDateDecided] = useState('');
    
    const redirect = useNavigate();

    const addMatter = async () => {
        const newMatter = { caption, majorityVote, dateDecided };
        const response = await fetch('/matters', {
            method: 'post',
            body: JSON.stringify(newMatter),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert(`The case was successfully added.`);
        } else {
            alert(`There was an issue adding the case = ${response.status}`);
        }
        redirect("/CasesPage");
    };


    return (
        <>
        <article>
            <h2><i><BiSolidBookAdd/></i>Add a case</h2>
            <p>Use this page to log a case.</p>
            
            <table id="matter">
                <caption>Enter the case you would like to add below.</caption>
                <thead>
                    <tr>
                        <th>Caption</th>
                        <th>Majority Vote</th>
                        <th>Date Decided</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                <td><label for="caption">Case caption</label>
                        <input
                            type="text"
                            placeholder="Caption of the case"
                            value={caption}
                            onChange={e => setCaption(e.target.value)} 
                            id="caption" />
                    </td>

                    <td><label for="majorityVote">Votes in the majority</label>
                        <input
                            type="number"
                            value={majorityVote}
                            placeholder="Number of votes"
                            onChange={e => setMajorityVote(e.target.value)} 
                            id="majorityVote" />
                    </td>

                    <td><label for="dateDecided">Date Decided</label>
                        <input
                            type="date"
                            placeholder="Date the case was decided"
                            value={dateDecided}
                            onChange={e => setDateDecided(e.target.value)} 
                            id="dateDecided" />
                    </td>

                    <td>
                    <label for="submit">Commit</label>
                        <button
                            type="submit"
                            onClick={addMatter}
                            id="submit"
                        >Add</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </article>
    </>
);
}

export default AddMatterPageTable;