import React, { useState } from "react";
import { Formik } from "formik";
import { initialValues, schemaValidation } from "./schema";
import defaultImage from "../../assets/images/default.png"
import Select from 'react-select'

export default function FormComponent({ handleFormSubmit, isFormSubmitting, formData, errorResponseMessage, skillOptions }) {
    const [selectedFile, setSelectedFile] = useState()
  

  const ErrorContent = (touched, fieldName) => {
    return errorResponseMessage && touched[fieldName] ? 
    <div className="text-danger">{errorResponseMessage[fieldName]}</div> : ""
   
  }

  return (
    <>
      <Formik
        initialValues={formData}
        validationSchema={schemaValidation}
        enableReinitialize
        onSubmit={(values) => {
          handleFormSubmit(values);
        }}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            setFieldValue
          } = props;
          return (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              autoComplete="off"
            >
           
           <div className="row">
            <h5 className="text-primary">Update Profile</h5>
           <div className="col-sm-12 col-xs-12 col-md-3 mt-2">
           <img src={defaultImage} height="120" width="120"
           
           
           />
<input 
 id="profileImage"
 placeholder="Profile Pic"
 type="file"

 onChange={(e)=>{
   e.preventDefault()
   
   setFieldValue("profileImage",e.target.files[0])
 }}
 onBlur={handleBlur}
 className={"mt-2"}
></input>
            </div>

            <div className="col-md-9 col-xs-12 col-sm-12">
  <div class="form-group row mb-3">
    <label htmlFor="fname" class="col-sm-2 col-form-label">First Name</label>
    <div class="col-sm-10">
      <input type="text" 
      name="first_name"
       value={values.first_name}
       onChange={handleChange}
       onBlur={handleBlur}
      class="form-control" id="fname" placeholder="First Name" />
      {errors.first_name && touched.first_name && (
                  <div className="text-danger">{errors.first_name}</div>
                )}
                {ErrorContent(touched, "first_name")}
    </div>
  {/*   {errors.first_name && touched.first_name && (
                  <div className="text-danger">{errors.first_name}</div>
                )} */}
  </div>
  <div class="form-group row mb-3">
    <label htmlFor="lname" class="col-sm-2 col-form-label">Last Name</label>
    <div class="col-sm-10">
      <input type="text" 
      name="last_name"
       value={values.last_name}
       onChange={handleChange}
       onBlur={handleBlur}
      class="form-control" id="lname" placeholder="Last Name" />
      {errors.last_name && touched.last_name && (
                  <div className="text-danger">{errors.last_name}</div>
                )}
                {ErrorContent(touched, "last_name")}
    </div>
  
  </div>
  <div class="form-group row mb-3">
    <label htmlFor="address" class="col-sm-2 col-form-label">Address</label>
    <div class="col-sm-10">
      <input type="text" 
      name="address"
       value={values.address}
       onChange={handleChange}
       onBlur={handleBlur}
      class="form-control" id="address" placeholder="Address" />
      {errors.address && touched.address && (
                  <div className="text-danger">{errors.address}</div>
                )}
                {ErrorContent(touched, "address")}
    </div>
  
  </div>
  <div class="form-group row mb-3">
    <label htmlFor="email" class="col-sm-2 col-form-label">Email</label>
    <div class="col-sm-10">
      <input type="email" 
      name="email"
       value={values.email}
       onChange={handleChange}
       onBlur={handleBlur}
       disabled
      class="form-control" id="fname" placeholder="Email" />
      {errors.email && touched.email && (
                  <div className="text-danger">{errors.email}</div>
                )}
                {ErrorContent(touched, "email")}
    </div>
  
  </div>
  <div class="form-group row mb-3">
    <label htmlFor="dob" class="col-sm-2 col-form-label">DOB</label>
    <div class="col-sm-10">
      <input type="date" 
      name="DOB"
       value={values.DOB}
       onChange={handleChange}
       onBlur={handleBlur}
      class="form-control" id="dob" placeholder="DOB" />
      {errors.DOB && touched.DOB && (
                  <div className="text-danger">{errors.DOB}</div>
                )}
                {ErrorContent(touched, "DOB")}
    </div>
  
  </div>
  <div class="form-group row mb-3">
    <label htmlFor="phone" class="col-sm-2 col-form-label">Phone</label>
    <div class="col-sm-10">
      <input type="number" 
      name="phone_number"
       value={values.phone_number}
       onChange={handleChange}
       onBlur={handleBlur}
      class="form-control" id="phone" placeholder="Phone" />
      {errors.phone && touched.phone && (
                  <div className="text-danger">{errors.phone}</div>
                )}
                {ErrorContent(touched, "phone")}
    </div>
  
  </div>

  <div class="form-group row mb-3">
    <label htmlFor="hourlyRate" class="col-sm-2 col-form-label">Hourly Rate(EUR)</label>
    <div class="col-sm-10">
      <input type="number" 
      name="price_hourly_in_eur"
       value={values.price_hourly_in_eur}
       onChange={handleChange}
       onBlur={handleBlur}
      class="form-control" id="hourlyRate" placeholder="Hourly Rate(EUR)" />
      {errors.price_hourly_in_eur && touched.price_hourly_in_eur && (
                  <div className="text-danger">{errors.price_hourly_in_eur}</div>
                )}
                {ErrorContent(touched, "price_hourly_in_eur")}
    </div>
  
  </div>

  <div class="form-group row mb-3">
    <label htmlFor="password" class="col-sm-2 col-form-label">Password</label>
    <div class="col-sm-10">
      <input type="password" 
      name="passwordNew"
       value={values.passwordNew}
       onChange={handleChange}
       onBlur={handleBlur}
      class="form-control" id="password" placeholder="Password" />
      {errors.passwordNew && touched.passwordNew && (
                  <div className="text-danger">{errors.passwordNew}</div>
                )}
                {ErrorContent(touched, "password")}
    </div>
  </div>
 
  <div class="form-group row mb-3">
    <label htmlFor="cv" class="col-sm-2 col-form-label">Upload CV</label>
    <div class="col-sm-10">
    <input
                  id="cv"
                  placeholder="CV"
                  type="file"
                 
                  onChange={(e)=>{
                    e.preventDefault()
                    
                    setFieldValue("cv",e.target.files[0])
                  }}
                  onBlur={handleBlur}
                  className={"form-control"}
                />
                {errors.CV && touched.CV && (
                  <div className="text-danger">{errors.CV}</div>
                )}
                {ErrorContent(touched, "cv")}
    </div>
  </div>

  <div class="form-group row mb-3">
    <label htmlFor="skills" class="col-sm-2 col-form-label">Skills</label>
    <div class="col-sm-10">
 
              <Select options={skillOptions} isMulti 
              onChange={(options)=>{
                setFieldValue("skillsNew", options)
              }}
              />
                {errors.skillsNew && touched.skillsNew && (
                  <div className="text-danger">{errors.skillsNew}</div>
                )}
                  {formData?.skills_text}
                {ErrorContent(touched, "skills_present")}
                </div>
              
  </div>

  <div className="d-flex flex-row-reverse mb-2">
           
           <button
           type="submit"
           className="btn btn-sm btn-primary">
             Submit
           </button>
       </div>

       

</div>

</div>
</form>

              
             
             
            
           
          
          );
        }}
      </Formik>
    </>
  );
}
