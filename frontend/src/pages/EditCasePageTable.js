import React, { useState }  from 'react';
import { useNavigate } from "react-router-dom";
import { BiSolidBookAdd } from "react-icons/bi";
import { TbEdit } from "react-icons/tb";

export const EditMatterPageTable = ({ matterToEdit }) => {
 
    const [caption, setCaption]       = useState(matterToEdit.caption);
    const [majorityVote, setMajorityVote]         = useState(matterToEdit.majorityVote);
    const [dateDecided, setDateDecided] = useState(matterToEdit.dateDecided);
    
    const redirect = useNavigate();

    const editMatter = async () => {
        const response = await fetch(`/matters/${matterToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                caption: caption, 
                majorityVote: majorityVote, 
                dateDecided: dateDecided
            }),
            headers: {'Content-Type': 'application/json',},
        });

        if (response.status === 200) {
            alert(`The case was successfully edited.`);
        } else {
            const errMessage = await response.json();
            alert(`There was an issue editing the case, per ${response.status}. ${errMessage.Error}`);
        }
        redirect("/CasesPage");
    }

    return (
        <>
        <article>
            <h2><i><TbEdit/></i>Edit a case</h2>
            <p>Use this page to edit a case that has been logged.</p>
            <table id="matters">
                <caption>Which case are you editing?</caption>
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

                    <td><label for="majorityVote">Majority Vote</label>
                        <input
                            type="number"
                            value={majorityVote}
                            placeholder="Votes in the majority"
                            onChange={e => setMajorityVote(e.target.value)} 
                            id="majorityVote" />
                    </td>

                    <td><label for="dateDecided">Date decided</label>
                        <input
                            type="date"
                            placeholder="Date the case was decided."
                            value={dateDecided}
                            onChange={e => setDateDecided(e.target.value)} 
                            id="dateDecided" />
                    </td>

                    <td>
                    <label for="submit">Commit</label>
                        <button
                            type="submit"
                            onClick={editMatter}
                            id="submit"
                        >Edit</button>
                    </td>
                </tr>
                </tbody>
            </table>
            </article>
        </>
    );
}
export default EditMatterPageTable;