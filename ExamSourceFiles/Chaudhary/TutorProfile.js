import React, { useState, useEffect } from "react"
import { getToken } from "../../utils/utilityFunctions"
import TutorProfileForm from "./TutorProfileForm"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import TutorDetail from "./TutorDetail";
import Navbar from "../../Navbar/FuldemyNavbar";


export default function TutorProfile(){
    const navigate = useNavigate();
    const [tutorProfile, setTutorProfile] = useState(null)
    const [showEdit,setShowEdit] = useState(false)
    

    useEffect(()=>{
        fetchProfileData()
       
    },[])

   
  
  

    const fetchProfileData = () => {
      const token = getToken()
      if(token) {
        const baseEndPoint = process.env.REACT_APP_API_END_POINT 
        const apiEndPoint = baseEndPoint+"/api/user/detail"

    axios.get(apiEndPoint,{
      headers: {
        Authorization: "Bearer "+ token
      }
    })
      .then(res => {
      
        setTutorProfile(res.data)
      })
      .catch((err)=>{
       // setErrMsg("Error")
       setTutorProfile(null)
      
      })
      }
       
    }

    return (
        <>
        <Navbar />
        <div className="mt-5 container">
             <div className="d-flex flex-row-reverse mb-2">
           
            <button
            onClick={() => navigate(-1)}
            className="btn btn-sm btn-secondary">
                Back
            </button>
        </div>
        {tutorProfile ? showEdit ? <TutorProfileForm 
        tutorData={tutorProfile}
        onEditClickClose={()=>{setShowEdit(false)}} /> :
        <TutorDetail onEditClick={()=>{setShowEdit(true)}} tutorData={tutorProfile} /> : ''
        
}
</div>
        </>
    )
}