import React, { useEffect, useState,  } from 'react'
import axios from 'axios';
import loadings from '../loading.svg' 
import { useNavigate } from 'react-router-dom';

function ChangeTeacher() {
  let navigate = useNavigate();
  const [loadingss, setLoadings] = useState(false);
  const [loading,setLoading] = useState(false);
  const [student, setStudent] = useState([]);
  const [teacher,setTeacher]=useState([]);
  const [assignStudent,setAssignStudent]=useState("");
  const [assignTeacher,setAssignTeacher]=useState("");
  const [teacherId,setTeacherid]=useState(0);
  const [studentId,setStudentid]=useState(0);
  const [name,setName]=useState("");

  useEffect(()=>{
    loadingTeacher();
    loadingStudent();
  },[]);

  const loadingTeacher=async()=>{

    setLoadings(true);
    try{
      let value =await axios.get(`https://64a24575b45881cc0ae4f17b.mockapi.io/teacher`);
      setTeacher(value.data);
      if (value.status===200){
        setLoadings(false);
      }
    }
    catch(error){
      console.log(error);
    }
  };
  const loadingStudent=async()=>{

    setLoadings(true);
    try{
      let value =await axios.get(`https://64a24575b45881cc0ae4f17b.mockapi.io/teacher`);
      setStudent(value.data);
      if (value.status===200){
        setLoadings(false);
      }
    }
    catch(error){
      console.log(error);
    }
  };
  const handleSubmit = async (e)=>{
    try{
      setLoading(true)
      e.preventDefault(); 
      let result = teacher.find((item)=>{
        for(let cur in item.assignStudent){
          if(item.assignStudent[cur]===name) {
            return true;
          }
        }
       
      });
      let index =result.assignStudent.findIndex((item)=>item===name)
      result.assignStudent.splice(index , 1)
      console.log(result.id) 
      let data ={
        assignStudent : result.assignStudent,
      }
      let val = await axios.put(`https://64a24575b45881cc0ae4f17b.mockapi.io/teacher/${result.id}`,data);
      console.log(val);
      await axios.put(`https://64a24575b45881cc0ae4f17b.mockapi.io/teacher/${teacherId}`,{assignStudent});
      await axios.put(`https://64a24575b45881cc0ae4f17b.mockapi.io/student/${studentId}`,{assignTeacher})
      setLoading(false)
      navigate("/");
     
    }
    catch(error){
      console.log(error);
    }
  };
  const getTeachername = (teacherId)=>{
    let teacherName=teacher.find((item)=>item.id===teacherId)
    setAssignTeacher(teacherName.name)
    setTeacherid(teacherId)
  }
  const getStudentname = (studentId)=>{
    let studentName = student.find((item)=>item.id===studentId)

    let teacherName = teacher.find((item)=>item.id ===teacherId)

    setAssignStudent([studentName.name,...teacherName.assignStudent])
    setStudentid(studentId)
    setName(studentName.name)
  }


  return (
    <>
    <div className='w-50 mx-auto '>
      <form className="w-100 p-5" onSubmit={handleSubmit}>
        <h1 className="text-center">Change teacher for student</h1>
        <div className='row'>
          <div className=" col-md-6">
            <label className="form-check-label mb-1" for="flexCheckChecked">
              <h4>Teacher</h4>
            </label>
            <br/>
            {loadingss ? ( <img src={loadings} alt="load" style={{width:"2.5rem"}}/>):(
              <select id='inputstate' className="form-select"
              onChange={(e) => getTeachername(e.target.value)}>
                <option selected> choose...</option>
                {teacher.map((item)=>{
                  return <option value={item.id}>{item.name}</option>
                })}
              </select>
            )}

          </div>
                <div className=" col-md-6">
                  <label className="form-check-label mb-1" for="flexCheckChecked">
                    <h4>Student</h4>
                  </label>
                  <br/>
                  {loadingss ? ( <img src={loadings} alt="load" style={{width:"2.5rem"}}/>):(
              <select
              id="inputState"
              className="form-select"
              onClick={(e) => {
               try {
                if (teacherId === 0) {
                  alert("First select teacher");
                } else {
                  getStudentname(e.target.value);
                }
               } catch (error) {
                
               }
              }}
            >
              <option selected>Choose...</option>
                  {student.map((item) => {
                    return (
                      <>
                        {item.assignTeacher !== "" ? (
                          <option value={item.id}>{item.name}</option>
                        ) : null}
                      </>
                    );
                  })}

            </select>
            )}

                </div>
        </div>
        <div className="d-flex justify-content-center align-items-center">
            <button type="submit" className="btn btn-primary mt-4">
              Submit
            </button>{" "}
            {loading ? (
              <img
                src={loadings}
                alt="load"
                style={{
                  width: "3rem",
                  paddingTop: "15px",
                  paddingLeft: "10px",
                }}
              />
            ) : null}
          </div>

      </form>

    </div>
    </>
    
  );
}

export default ChangeTeacher