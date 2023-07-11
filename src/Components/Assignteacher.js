import React, {useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loadings from '../loading.svg'

function Assignteacher() {
    let navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [loadingss,setLoadings] = useState(false);
  let [teacher,setTeacher] = useState([]);
  let [student,setStudent] = useState([]);
  let [assignTeacher, setAssignTeacher] = useState("");
  let [assignStudent, setAssignStudent] = useState([]);
  let [teacherId, setTeacherid] = useState(0);
  let [studentId, setStudentid] = useState([]);

  useEffect(()=>{
    loadingTeacher();
    loadingStudent();
  },[]);
  const loadingTeacher = async()=>{
    try{
        setLoadings(true)
        let value = await axios.get(`https://64a24575b45881cc0ae4f17b.mockapi.io/teacher`);
        setTeacher(value.data);
        if(value.status===200){
            setLoadings(false)
        }
    }
    catch(error){
        console.log(error)
    }
  }
  const loadingStudent = async()=>{
    try{
        setLoadings(true)
        let value = await axios.get(`https://64a24575b45881cc0ae4f17b.mockapi.io/student`);
        setStudent(value.data);
        if(value.status===200){
            setLoadings(false)
        }
    }
    catch(error){
        console.log(error);
    }
  }
  const handle = async(id,name)=>{
    setTeacherid(id);
    setAssignTeacher(name);

  }
  const handleSubmit = async (e)=>{
    setLoading(true)
    try{
        e.preventDefault()
        let data ={
            assignStudent,

    }
    console.log('assignStudent:',data);
    let v1 = await axios.put(`https://64a24575b45881cc0ae4f17b.mockapi.io/teacher/${teacherId}`,data)

    let data1 ={assignTeacher ,} 
    
    let v2;
    for(let i=0;i<studentId.length;i++ ){
        v2 = await axios.put(`https://64a24575b45881cc0ae4f17b.mockapi.io/student/${studentId[i]}`,data1)
    }
    if(v1.status===200 && v2.status===200){
        setLoading(false)
        navigate('/');
    }
    
  }
  catch(error){
    console.log(error);
  }
}
let val = teacher.filter((item)=>item.id===teacherId).map((item)=>item.assignStudent)
let check = (e,id)=>{
    let {checked,value}=e.target
    if(checked){
        setAssignStudent([...val[0],...assignStudent,value])
        setStudentid([...studentId,id])
    }
    else{
        setAssignStudent(assignStudent.filter((item)=> item !==value))
        setStudentid(studentId.filter((item)=>item !==id))
    }
}
  return (
    <>
    <div className=' w-50 mx-auto'>
        
    <form className='w-100 p-5' onSubmit={handleSubmit}>
         <div className='d-flex  align-items-center flex-column'> <h1 className='text-center'>Assign teacher for student</h1>
          <div className="row">
            <div className="col-md-6">
            <div className="form-check me-5">
            <label className="form-check-label" htmlFor="flexRadioDefault1">
            <h4>Teacher</h4>
                  </label><br />

                  {loadingss ? <img src={loadings} alt="load" style={{width:"2.5rem"}}/> :null}
                  { 
                 teacher.map((item) =>
                   {
                    
                    return  <><input className="form-check-input" type="radio" name="flexRadioDefault" onChange={()=>handle(item.id,item.name)} id="flexRadioDefault1"/>{item.name} <br /></> 
                  })
                }
               
                  
              </div>
            </div>
            <div className=" col-md-6">
              <label className="form-check-label mb-1" htmlFor="flexCheckChecked">
              <h4>Student</h4>
              </label> <br />
              {loadingss ? <img src={loadings} alt="load" style={{width:"2.5rem"}}/> :null}
              {
                student.map((item) => {
                  return <>{item.assignTeacher === "" ? <><input className="form-check-input" type="checkbox" value={item.name} name={item.name} id="flexCheckChecked" onChange={(e) => check(e,item.id)} /> {item.name}<br /></> : null }</>
                })
              }
              
            </div>
          </div>
          </div>
          <div className='d-flex justify-content-center align-items-center'>
            <button type="submit" className="btn mt-4" >Submit</button>  {loading ? <img src={loadings} alt="load" style={{width:"3rem",paddingTop:"15px",paddingLeft:"10px"}} />: null}
          </div>
        </form>

    </div>
    </>
  )
}

export default Assignteacher