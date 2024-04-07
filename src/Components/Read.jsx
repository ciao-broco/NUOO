import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './Read.css'

function Read() {
    const [student,setStudent] = useState([])
const {id} = useParams()
useEffect(()=>{
    axios.get('http://localhost:8081/read/' + id)
    .then(res => {
        console.log(res)
        setStudent(res.data[0])
    })
    .catch(err => console.log(err))
})

  return (
    <>
   <div className="container">
    <h1 className="page-title">Student Info</h1>
    <p>Alcune informazioni potrebbero essere visibili ad altre persone</p>
    <div onClick={() => window.location.href = `/edit/${student.ID}`} className="student-info">
        <p className="student-id">ID : {student.ID}</p>
        <p className="student-name">Name : {student.Name}</p>
        <p className="student-email">Email : {student.Email}</p>
        
    </div>
    <div class="buttons">
        <Link to="/"><button  className="button-link">Back</button></Link>
        <Link to={`/edit/${student.ID}`}><button  className="button-link">Edit</button></Link>
    </div>
</div>

    </>
  )
}

export default Read
