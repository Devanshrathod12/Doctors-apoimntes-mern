import React, { useState } from 'react'
import { assets } from '../assets/assets';
const MyProfile = () => {

  const [userData,serUserData] = useState({
    name:"devansh rathod",
    Image:assets.profile_pic,
    email:"rathodevansh@gmail.com",
    phone:"+91077-240-121-93",
    address:{
      line1:" B-93/102 tarsh enclave ",
      line2:"samrth park colony umaria"
    },
    gender:'Male',
    DOB:'2004-01-27'
  })
  const [isEdit,setIsEdit] = useState(false)
  return (
    <div>
      <img src={userData.Image} alt="" />
     {
      isEdit ? <input type="text" value={userData.name} onChange={e=>serUserData(prev => ({...prev,name:e.target.value}))} /> : <p>{userData.name}</p>
     }
    <hr/>
    <div>
      <p>CONTACT INFORMATION</p>
      <div>
        <p>Email id:</p>
        <p>{userData.email}</p>
      </div>
    </div>
    </div>
  )
}
export default MyProfile
