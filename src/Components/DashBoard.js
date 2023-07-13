import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react'
import loadings from '../loading.svg'


function DashBoard() {

  const [teacher,setTeacher]=useState([]);
  const [student,setStudent]=useState([]);
  const [dsloading,setDSloading]=useState(false);
  const [dmloading,setDMloading]=useState(false);
  const [sloading,setSloading]=useState(false);
  const [tloading,setTloading]=useState(false);

  useEffect(()=>{
      loadingTeacher();
      loadingStudent();
  },[]);

  const loadingTeacher = async () =>{
    setTloading(true)
    try{
      let value = await axios.get(`https://64a24575b45881cc0ae4f17b.mockapi.io/teacher`);
      setTeacher(value.data);
      if(value.status===200){
        setTloading(false)
      }

    }
    catch( error){
      console.log(error);
    }
  }
  const loadingStudent = async () =>{
    setSloading(true)
    try{
      let value = await axios.get(`https://64a24575b45881cc0ae4f17b.mockapi.io/student`);
      setStudent(value.data);
      if(value.status===200){
        setSloading(false)
      }

    }
    catch( error){
      console.log(error);
    }
  }

  async function studentDelete(id,name,name1){
    setDSloading(true)
    try{
      if(teacher.assignStudent===""){
        await axios.delete(`https://64a24575b45881cc0ae4f17b.mockapi.io/student/${id}`)
        setDSloading(false)
        loadingStudent();
        loadingTeacher();
      }else{
        await axios.delete(`https://64a24575b45881cc0ae4f17b.mockapi.io/student/${id}`)
        setDSloading(false)
        loadingStudent();
        loadingTeacher();
        let s1 = teacher.filter((item)=>{
          return item.name ===name
        });
        let index = s1[0].assignStudent.findIndex((item)=>item===name1)
        s1[0].assignStudent.splice(index,1)
        console.log("index:",index);
        console.log("id:",s1[0].id);
        await axios.put(`https://64a24575b45881cc0ae4f17b.mockapi.io/teacher/${s1[0].id}`,{
          name:s1[0].name,
          email:s1[0].email,
          subject:s1[0].subject,
          assignStudent:s1[0].assignStudent,
          id:s1[0].id,
        })
        setDSloading(false)
        loadingTeacher();
        loadingStudent();
      }
    }
    catch(error){
      console.log(error);
    }
  }
  async function teacherDelete(id,name){
    setDMloading(true)

    if(student.assignTeacher >0){
      let v1 = await axios.delete(`https://64a24575b45881cc0ae4f17b.mockapi.io/teacher/${id}`)
      console.log(v1);
      setDMloading(false)
      loadingStudent();
      loadingTeacher();
    }
    else{
      
      let v1 = await axios.delete(`https://64a24575b45881cc0ae4f17b.mockapi.io/teacher/${id}`)
      
      let data = student.filter((item)=>item.assignTeacher===name);
      console.log(data);
      console.log(v1);
      let v2;
      for(let i=0;i<data.length;i++){
        console.log(data[i].id);
        console.log(v2);
        v2=await axios.put(`https://64a24575b45881cc0ae4f17b.mockapi.io/student/${data[i].id}`,{
          id:data[i].id,
          name:data[i].name,
          email:data[i].email,
          subject:data[i].subject,
          assignTeacher:""

        })
      }
      setDMloading(false)
      loadingStudent();
      loadingTeacher();
    }
  }

  return (
    <>
    <div>
      <div>
        <h3>Student Details:</h3>
        {sloading ? <div className='d-flex justify-content-center mb-5'> <img src={loadings}alt="load" style={{width:"3rem",paddingLeft:"10px"}}/></div>:
        <table>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Subject</th>
              <th scope='col'>Teacher Name</th>
              <th scope='col'>Action</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
              {
                student.map((item,index)=>{
                  return <tr key={index}>
                    <th scope='row'>{index+1}</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.subject}</td>
                    <td>{item.assignTeacher}</td>
                    <td><button onClick={()=>{studentDelete(item.id,item.assignTeacher,item.name)}} className='btn'>Delete</button></td>
                    <td>{dsloading && item.id ? <img src={loadings} alt="load" style={{width:"3rem",paddingLeft:"10px"}} />: null }</td>
                    
                  </tr>
                })
              }
            </tbody>
            </table>
            }
      </div>
      <div>
        <h3>Teachers Details:</h3>
        {tloading ? <div className='d-flex justify-content-center mb-5'><img src={loadings} alt="load" style={{width:"3rem",paddingLeft:"10px"}} /></div>:
        <table>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Subject</th>
              <th scope='col'>Student Name</th>
              <th scope='col'>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
           {
            teacher.map((item,index)=>{
              return <tr key={index}>
                <th scope='row'>{index+1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.subject}</td>
                <td>{item.assignStudent.join(" ")}</td>
                <td><button onClick={()=>{teacherDelete(item.id,item.name)}} className='btn'>Delete</button></td>
                <td>
                  {dmloading ?<img src={loadings} alt="load" style={{width:"3rem",paddingLeft:"10px"}} />:null}
                </td>
              </tr>
            })
           }
          </tbody>
          </table>
          }
      </div>
    </div>
    </>
  )
}

export default DashBoard
