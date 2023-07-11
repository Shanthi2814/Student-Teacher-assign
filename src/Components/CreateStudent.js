import axios from 'axios';
import React, {useState } from 'react'
import { useNavigate } from 'react-router-dom';

import loadings from '../loading.svg'

function CreateStudent() {

  const navigate = useNavigate();
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [subject,setSubject] = useState('');
  const [loading,setLoading] = useState(false);

  async function handleSubmit(e){
    setLoading(true)
    e.preventDefault()
    let data = { name,
                email,
              subject,
            assignTeacher:""}
            let value =await axios.post(`https://64a24575b45881cc0ae4f17b.mockapi.io/student`,data)
            if(value.status===201){
              setLoading(false)
              navigate("/");
            }
  }
  return (
    <div className=' w-50 mx-auto '>
      <form className='w-100 p-5' onSubmit={handleSubmit}>
      <h1 className='text-center'> Create Student</h1>
      <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Name:-</label>
    <input type="text" className="form-control" id="exampleInputPassword1" required value={name} onChange={(e)=>setName(e.target.value)}  />
      </div><br/>
      <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email:-</label>
    <input type="email" className="form-control" id="exampleInputEmail1" required value={email}  onChange={(e)=>setEmail(e.target.value)} />
      </div><br/>
      <div className="mb-3">
    <label htmlFor="num" className="form-label">Subject:-</label>
    <input type="tel" className="form-control" id="num" required value={subject} onChange={(e)=>setSubject(e.target.value)} />
  </div><br/>
  <button type="submit" className="btn">Submit</button> {loading ? <img src={loadings} alt="load" style={{width:"3rem",paddingLeft:"10px"}} />: null}
      </form>

    </div>
  )
}

export default CreateStudent