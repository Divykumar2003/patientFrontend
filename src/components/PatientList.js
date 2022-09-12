import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
function PatientList() {
    const [patient,setPatient] = useState([]);

    useEffect(()=>{
        getPatients();
       });

    let getPatients=()=>{
        axios.get("http://localhost:8080/listPatients")
        .then((responce)=>{
           setPatient(responce.data);
        }).catch((error) => alert(error));
    };

    let deletePatient=(id)=>{
      axios.delete("http://localhost:8080/patient/" +  id)
      .then((responce)=>{
        if(responce!=null)
          {
            alert("succesfully delete");
          }
      })
      .catch((error)=>{
        alert(error);
      })
    };
    let Patient= patient.map((p)=>{
       return(
        <tr key={p.id}>
          <td>{p.id}</td>
          <td>{p.name}</td>
          <td>{p.address}</td>
          <td>{p.age}</td>
          <td>
         <Link to={"/patient/" + p.id}><Button variant="primary">Edit</Button></Link>{' '}
          <Button variant="danger" onClick={()=>deletePatient(p.id)} >Delete</Button>
          </td>
        </tr>
       );
    })
  return (
    <div className="my-3">
        <Container>
      <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Address</th>
          <th>Age</th>
          <th>Edit/Delete</th>
        </tr>
      </thead>
      <tbody>
        {Patient}
      </tbody>
    </Table>
    </Container>
    </div>
  )
}

export default PatientList
