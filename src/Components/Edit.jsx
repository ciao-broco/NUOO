import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

function Edit() {
    const { id } = useParams();
    const [values, setValues] = useState({
        Name: '', // Inizializzazione corretta
        Email: '' // Inizializzazione corretta
    });
    const navigate = useNavigate()

    useEffect(() => {
        Axios.get('http://localhost:8081/read/' + id)
            .then(res => {
                console.log(res);
                // Correzione della struttura dei dati ricevuti
                setValues({ Name: res.data[0].Name, Email: res.data[0].Email });
            })
            .catch(err => console.log(err));
    }, [id]); // Aggiunto id come dipendenza dell'effetto

    const editNameEmail = (e) => {
        e.preventDefault(); // Evita il comportamento predefinito del form
        Axios.put('http://localhost:8081/edit/'+id,values) 
        .then(res => {
            console.log(res);
            navigate('/'); // Naviga alla nuova pagina dopo il submit
        }).catch(error => {
            console.error('Errore durante la creazione del brawler:', error);
        });
    };



    return (
        <>
            <div className="princdue">
                <form>
                    <h2 className="title-container">Edit Student</h2>
                    <div>
                        <label className="label" htmlFor="addname">Name:</label>
                        <input type="text" name="Name" placeholder="Enter New Name" className="addname" value={values.Name} onChange={(e) => { setValues({ ...values, Name: e.target.value }) }} />
                    </div>
                    <div>
                        <label className="label" htmlFor="addemail">Email:</label>
                        <input type="text" name="Email" placeholder="Enter New Email" className="addemail" value={values.Email} onChange={(e) => { setValues({ ...values, Email: e.target.value }) }} /> {/* Corretto il valore di value */}
                    </div>
                    <Link to={'http://localhost:5173/'} ><button className="back-button">Back</button></Link>
                    <button type="button" onClick={editNameEmail} className="submit-button">Edit</button>
                </form>
            </div>
        </>
    );
}

export default Edit;
