import axios from "axios";
import React, {  useState ,useEffect } from "react";
import { Container, Form, Card, Button } from "react-bootstrap";
import { useNavigate,useParams } from "react-router-dom";

function Patient() {
const [id,setId]= useState();
const [name,setName]= useState();
const [address,setAddress]= useState();
const [age,setAge]= useState();

useEffect(() => {
  if (patientId) {
    axios
      .get("http://localhost:8080/patient/" + patientId)
      .then((response) => {
        if (response.data != null) {
          setId(response.data.id);
          setName(response.data.name);
          setAddress(response.data.address);
        }
      })
      .catch((error) => alert(error));
  }
}, []);

let patient = {
  id: id,
  name: name,
  address: address,
  age:age
};
const { patientId } = useParams();
const navigate= useNavigate();
let textChanged = (event)=>{
 if(event.target.name==="id")
 {
  setId(event.target.value);
 }
 if(event.target.name==="name")
 {
  setName(event.target.value);
 }
 if(event.target.name==="address")
 {
  setAddress(event.target.value);
 }
 if(event.target.name==="age")
 {
  setAge(event.target.value);
 }
};

const savePatient = (event)=>{

 axios.post("http://localhost:8080/patient",patient)
 .then((response) => {
  if (response.data != null) {
    alert("succesfully submit");
  }
})
.catch((error) => alert(error));
}
const updatePatient = (event)=>{

  axios.put("http://localhost:8080/patient/" + patientId, patient)
  .then((responce)=>{
  if(responce.data!=null)
  {
    alert("update succesfully");
    navigate("/patientList");
  }
  })

}
  return (
    <div className="my-3">
      <Container>
      <Card>
       <Form onSubmit={patientId !=null ? updatePatient :savePatient}>
      <Form.Group className="mb-3" controlId="formBasicID">
        <Form.Label>Patient Id</Form.Label>
        <Form.Control name="id" type="text" value={id} onChange={textChanged} placeholder="Enter id" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control name="name" type="text" value={name} onChange={textChanged} placeholder="Enter Name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control name="address" type="text" value={address} onChange={textChanged} placeholder="Enter Address" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicAge">
        <Form.Label>Age</Form.Label>
        <Form.Control name="age" type="text" value={age} onChange={textChanged} placeholder="Enter Age" />
      </Form.Group>
     
      <Button variant="primary" className="my-2" type="submit">
        Submit
      </Button>
    </Form>
    </Card>
    </Container>
    </div>
  )
}

export default Patient
