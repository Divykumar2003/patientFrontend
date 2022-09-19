
import './App.css';
import Navigationbar from './components/NavigationBar';
import Patient from './components/Patient';
import PatientList from './components/PatientList';
import { Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navigationbar/>
     
    
      <Routes>
        <Route path="/" element={<Patient/>} />
        <Route path="patient" element={<Patient/>} />
        <Route path="patient/:patientId" element={<Patient/>} />
        <Route path="patientList" element={ <PatientList/>} />
      </Routes>
    </div>
  );
}

export default App;
