import Opic from '../assets/Online.png'
import { useRef,useState } from 'react'
import { useNavigate } from 'react-router-dom';

function  AddMeeting()
{
    let[loading,setloading]=useState(false)
    let Navigate=useNavigate();
    
    let topicInput=useRef();
    let dateInput=useRef();
    let typeInput=useRef();

     
    function MeetingHandler()
    {
        setloading(true)
        let MeetingData={
            
            topic:topicInput.current.value,
            date:dateInput.current.value,
            type:typeInput.current.value
             
        }

        fetch('https://sunajo-85479-default-rtdb.europe-west1.firebasedatabase.app/meetings.json',

            {
                method:'post',
                body: JSON.stringify(MeetingData)
            }
        ).then(()=>{
            setloading(false)
            Navigate('/')
        })
    }

       
    return(
        <>

             <div className="w-[100%] m-auto mt-32 flex items-center justify-center gap-36">
                <div className='w-[40%]'>
                <h1 className=" font-bold text-4xl text-left text-blue-600">Add Meetings</h1>
                <p className="mt-2 text-3xl text-black font-semibold " > Businesses around the globe choose Zoom</p>
                <p className="mt-2 text-sm text-neutral-500  " >Connect, collaborate, and create with Zoom's AI powered platform. Empower your employees, teams, and customers to work better together and get more done.</p>

            <div className="mt-3">
                <div class="w-full ">
                    <input type="text" ref={topicInput} placeholder="Topic" class=" mb-4 flex w-full h-10 px-3 py-7 text-lg bg-white border rounded-md border-neutral-300 ring-offset-background placeholder:text-neutral-500 placeholder:text-lg focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer" />
                </div>

                <div class="w-full ">
                    <input type="datetime-local" ref={dateInput} placeholder="Name" class=" mb-3 flex w-full h-10 px-3 py-7 text-lg bg-white border rounded-md border-neutral-300 ring-offset-background placeholder:text-neutral-500 placeholder:text-lg focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50  cursor-pointer" />
                </div>

                <div class="w-full ">
                    <input type="text" ref={typeInput} placeholder="Type ie:(dev,Operations,Marketing)" class="mb-3 flex w-full h-10 px-3 py-7 text-lg bg-white border rounded-md border-neutral-300 ring-offset-background placeholder:text-neutral-500 placeholder:text-lg focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer " />
                </div>

                <button type="button" onClick={MeetingHandler} class=" w-full inline-flex items-center justify-center px-4 py-4 text-lg font-medium tracking-wide text-white transition-colors duration-200 rounded-xl bg-neutral-950 focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 focus:shadow-outline focus:outline-none hover:bg-blue-700">CREATE MEETING</button>

                <div className={loading ?"loader":" "}></div>

            </div>    
                  
                

                </div>

                <img src={Opic} className='w-[500px]' alt="" />
             </div>


        </>
    )
}
export default AddMeeting