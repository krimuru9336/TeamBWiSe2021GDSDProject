import React, {useState, useEffect} from "react";
import { initialValues } from "./schema";
import defaultImage from "../../assets/images/default.png"
import FormComponent from "./FormComponent"
import ResponseMessage from "../../common/ResponseMessage";
import axios from "axios"
import { getToken } from "../../utils/utilityFunctions";
import moment from "moment"

export default function TutorProfileForm({onEditClickClose, tutorData}){
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState("")
    const [cv, setCV] = useState("")
    const [responseMessage, setResponseMessage] = useState(false)
    const [errorResponseMessage, setErrorResponseMessage] = useState(false)
    const [skillOptions, setSkillOptions] = useState([])


    useEffect(()=>{
        fetchSkills()
    },[])

    const fetchSkills = () => {
        const baseEndPoint = process.env.REACT_APP_API_END_POINT 
        const apiEndPoint = baseEndPoint+"/api/skills"
    
    axios.get(apiEndPoint,{
    })
      .then(res => {
      
       if(res.data) {
       
           let formattedData = res.data.map((i)=>{
             return {
               label: i.skill_name,
               value: i.id
             }
           })
           setSkillOptions(formattedData)
        
       }
      })
      .catch((err)=>{
       
     
      })
    
       
    }

    const { profile_pic }  = tutorData?.data
    const profileImage = profile_pic ? profile_pic : defaultImage



    const handleFormSubmit = (values) => {
            setIsSubmitting(true);
            const {
              email,
              passwordNew,
              address,
              first_name,
              last_name,
              phone_number,
              DOB,
              cv,
              profileImage,
              price_hourly_in_eur,
              skillsNew
            } = values;
            const token = getToken()
            const baseEndPoint = process.env.REACT_APP_API_END_POINT;
            const apiEndPoint = baseEndPoint + "/api/user/detail"
              const reqBody = {
                email: email,
                address: address,
                last_name: last_name,
                first_name: first_name,
                phone_number: phone_number,
                DOB: moment(DOB).format("YYYY-MM-DD"),
                price_hourly_in_eur: price_hourly_in_eur,
              } 
              if(cv) {
                reqBody.CV = cv
              }
              if(profileImage) {
                reqBody.profile_pic = profileImage
              }
              if(passwordNew){
                  reqBody.password = passwordNew
              }
             
            
              
              const form_data = new FormData();
        
        for ( var key in reqBody ) {
            form_data.append(key, reqBody[key]);
            
        }
        
        const skills_presentArr = skillsNew ? skillsNew.map(i=>i.value): []
        
        
        for(let skillId of skills_presentArr) {
          form_data.append('skills_present', skillId);
        }
            axios
              .patch(apiEndPoint,form_data,  {
                headers: {
                    "Content-type": "multipart/form-data",
            
                        Authorization: "Bearer "+ token
                      
                },                    
            } )
              .then((res) => {
           
            
              
               if(res.data.data) {
                setResponseMessage("success")
           
                
               }
        
        setTimeout(()=>{
          setResponseMessage("")
        }, 5000)
                
              })
              .catch((err) => {
                setResponseMessage(
                  "error"
                
                )
                console.log(err);
              
                //setResponseData("Error")
              }).finally(()=>{
                setIsSubmitting(false);
              })
    }

    return (
        <>
        <div className="card p-5">
        <div className="d-flex flex-row-reverse mb-2">
           
           <button
           onClick={onEditClickClose}
           className="btn btn-sm btn-primary">
             Cancel
           </button>
       </div>
        
           
            
<FormComponent 
handleFormSubmit={handleFormSubmit}
formData={tutorData?.data}
errorResponseMessage={errorResponseMessage}
skillOptions={skillOptions}
/>
         
     
         <ResponseMessage 
          
          response={responseMessage} />
        </div>
       
        </>
    )
}