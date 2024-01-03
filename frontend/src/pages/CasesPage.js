import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSolidBookAdd } from "react-icons/bi";


import MatterList from '../components/CaseList';
import { Link } from 'react-router-dom';

function MattersPage({ setMatter }) {
    // Use the Navigate for redirection
    const redirect = useNavigate();

    // Use state to bring in the data
    const [matters, setMatters] = useState([]);

    // RETRIEVE the entire list of cases
    const loadMatters = async () => {
        const response = await fetch('/matters');
        const matters = await response.json();
        setMatters(matters);
    } 
    

    // UPDATE a single case
    const onEditMatter = async matter => {
        setMatter(matter);
        redirect("/EditCasePageTable");
    }


    // DELETE a single case  
    const onDeleteMatter = async _id => {
        const response = await fetch(`/matters/${_id}`, { method: 'DELETE' });
        if (response.status === 200) {
            const getResponse = await fetch('/matters');
            const matters = await getResponse.json();
            setMatters(matters);
        } else {
            console.error(`Deletion of the case with the id, ${_id}, failed, per status code = ${response.status}.`)
        }
    }

    // LOAD all the cases
    useEffect(() => {
        loadMatters();
    }, []);

    // DISPLAY the cases
    return (
        <>
            <h2>List of Cases</h2>
            <p>This page displays the cases the have been logged by the user.</p>
            <Link to="/AddCasePageTable"><i><BiSolidBookAdd/></i></Link>
            <MatterList 
                matters={matters} 
                onEdit={onEditMatter} 
                onDelete={onDeleteMatter} 
            />
        </>
    );
}

export default MattersPage;