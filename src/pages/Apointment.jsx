import React, { useContext, useState , useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { AppContext } from '../components/Context/AppContext'
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
const Apointment = () => {
  const {docId} = useParams();
  const {doctors,currncySymbol} = useContext(AppContext)
  const [docSlots,setDocSlots] = useState([])
  const [slotIndex,setSlotIndex] = useState(0)
  const [slotTime,setSlotTime] = useState(0)
  const [docInfo, setDocInfo] = useState(null)
  const daysOfWeek = ["SUN","MON","TUE","WED","THU","FRI","SAT"]

  const fetchDocinfo = async () =>{
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async () => {
      setDocSlots([])

      // geting currnt date
      let today = new Date()

      for (let i = 0; i < 7; i++) {
        // geting date with Index
        let currntDate = new Date(today)
        currntDate.setDate(today.getDate()+i)
      

      //seting end time of the date with Index
      let endTime = new Date()
      endTime.setDate(today.getDate()+i)
      endTime.setHours(21,0,0,0)

      // seting hours
      if(today.getDate() === currntDate.getDate()){
        currntDate.setHours(currntDate.getHours() > 10 ? currntDate.getHours() + 1 : 10)
        currntDate.setMinutes(currntDate.getMinutes() > 30 ? 30 : 0)
      }else{
        currntDate.setHours(10)
        currntDate.setMinutes(0)
      }

      let timeSlots = []

  while (currntDate < endTime) {
    let formatedTime = currntDate.toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"})

    // add slot to Array
    timeSlots.push({
      datetime: new Date(currntDate),
      time:formatedTime
    })

   /// increment currnt time by 30 minutes 
   currntDate.setMinutes(currntDate.getMinutes() + 30)

  }
     setDocSlots(prev => ([...prev,timeSlots]))
  }
  }

  useEffect(() => {
    fetchDocinfo();
  }, [doctors,docId])

  useEffect(() => {
   getAvailableSlots()
  }, [docInfo])

  useEffect(() => {
   console.log(docSlots);
   
   }, [docSlots])
  
  return docInfo && (
    <div>
      {/* -----------   doctors details       ------------------- */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 ' >
          {/* doc info , name , degree , exprence */}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900' >{docInfo.name} 
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600' >
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full' >{docInfo.experience}</button>
          </div>

          {/* --------- doctors about  ------------- */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3' >About <img src={assets.info_icon} alt="" /></p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1 '>{docInfo.about}</p>
          </div>
           <p className='text-gray-500 font-medium mt-4' >
            Appointment Fee: <span className='text-gray-600' >{currncySymbol}{docInfo.fees}</span>
           </p>

        </div>
      </div>
      {/* BOKING SLOTS  */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700' >
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4' >
          {
            docSlots.length && docSlots.map((item,index)=>(
              <div onClick={()=> setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white': 'border border-gray-200'}`} key={index}>
                   <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                   <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4' >
          {docSlots.length && docSlots[slotIndex].map((item,index)=>(
            <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer  ${item.time === slotTime ? 'bg-primary text-white': 'text-gray-400 border border-gray-300'} `} key={index}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
         <button className='bg-primary text-white  text-sm font-light px-14 py-3 rounded-full my-6' >Book an appointment</button>
      </div>

      {/* listnning related doctors  */}
      <RelatedDoctors  docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Apointment
