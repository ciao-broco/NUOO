import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom'
import './Components/Create.css'

function Home() {
    const piuStyle = {
        position: "relative",
        left:"1px",
        top:"3px",
        fontSize: '1.5em' // Regola la dimensione del carattere del segno "+"
      };   
    const [data, setData] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:8081/')
            .then(res => {
                if (Array.isArray(res.data)) {
                    setData(res.data);
                } else {
                    console.error("La risposta non è un array:", res.data);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) =>{
      Axios.delete('http://localhost:8081/delete/'+id )
      .then(res => {
        location.reload()
      })
      .catch(err => console.log(err))
    }


    
    

    return (
        <>
            <div className="princ">
  <h1>Students List</h1>
  <div className="button-container">
    <Link to={'/create'} ><button className='create'>Create <span style={piuStyle}>+</span> </button></Link>
  </div>
  <table>
    <thead>
      <tr>
        <th>ID : </th>
        <th>Name :</th>
        <th>Email :</th>
        <th>Actions:</th>
      </tr>
    </thead>
    <tbody>
      {data.map((student, index) => {
        return <tr key={index}>
          <td>{student.ID}</td>
          <td>{student.Name}</td>
          <td className='email'>{student.Email}</td>
          <td>
            <Link to={`/read/${student.ID}`}><button className='read'>Read</button></Link>
            <Link to={`/edit/${student.ID}`}><button  className="edit">Edit</button></Link>
            <button onClick={()=>handleDelete(student.ID)} className='delete'>Delete</button>
          </td>
        </tr>
      })}
    </tbody>
  </table>
</div>
        </>
    );
}

export default Home;
