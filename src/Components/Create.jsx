import React, { useState } from "react";
import './Create.css';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'


function Create() {
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');

    const navigate = useNavigate();

    const submitNameEmail = (e) => {
        e.preventDefault(); // Evita il comportamento predefinito del form
        Axios.post('http://localhost:8081/students', {
            Name: Name,
            Email: Email,
        }).then(res => {
            console.log(res);
            navigate('/'); // Naviga alla nuova pagina dopo il submit
        }).catch(error => {
            console.error('Errore durante la creazione del brawler:', error);
        });
    };

    return (
        <div className="princdue">
            <form>
                <h2 className="title-container">Add Student</h2>
                <div>
                    <label className="label" htmlFor="addname">Name:</label>
                    <input type="text" name="Name" placeholder="Enter Name" className="addname" onChange={(e) => { setName(e.target.value) }} />
                </div>
                <div>
                    <label className="label" htmlFor="addemail">Email:</label>
                    <input type="text" name="Email" placeholder="Enter Email" className="addemail" onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <button onClick={submitNameEmail} className="submit-button">Submit</button>
                <Link to={'http://localhost:5173/'} ><button className="back-button">Back</button></Link>

            </form>
        </div>
    );
}

export default Create;
