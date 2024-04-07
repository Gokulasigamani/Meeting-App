import { useState,useEffect } from "react";
import Card from "../Components/Card";

function Home()
{       
    let options={weekday:'long',year:'numeric',month:'long',day:'numeric'}

      let [Live,SetLive]=useState([])
      
      useEffect(()=>{
        
        fetch('https://sunajo-85479-default-rtdb.europe-west1.firebasedatabase.app/meetings.json').
        then(data=>data.json()).then((data)=>{
            let TempMeeting=[];
            console.log(data)
           
        for(let key in data)
            {
            let LiveDatas={
                id:key,
                ...data[key]
            }

            TempMeeting.push(LiveDatas)
            

            SetLive(TempMeeting);
        }

    })

    },[])

    
    return(
        <>

        <nav className="w-[1150px] items-center justify-between m-auto my-12 flex">
            <div className="link text-blue-500 text-5xl font-bold">Zoon.com</div>

            <div className="gap-5 flex">
                <button className="bg-blue-200 px-6 font-semibold py-2 rounded-[150px] hover:bg-black hover:text-white transition-all shadow-md ">Add Meetings</button>
                <button className="font-bold text-blue-500">My Meetings</button>
            </div>
        </nav>

            <div className="w-[1150px] m-auto mt-32 flex gap-10">
                <button className="bg-orange-100 text-orange-400 px-8 font-semibold py-3 rounded-[10px] transition-all shadow-md">DEVELOPERS</button>
                <button className="bg-orange-100 text-orange-400 px-8 font-semibold py-3 rounded-[10px] transition-all shadow-md">OPERATIONS</button>
                <button className="bg-orange-100 text-orange-400 px-8 font-semibold py-3 rounded-[10px] transition-all shadow-md">MARKETING</button>
                
            </div>

           

              <div className="flex font-semibold gap-2 w-[1150px] mt-20 m-auto flex-wrap">
                
              {
                Live.map((LiveDatas)=>{

                    let date=new Date(LiveDatas.date)

                    let fdate=date.toLocaleDateString('en',options)
                    
                      return <Card title={LiveDatas.topic} date={fdate} type={LiveDatas.type} />  
                })
             }
              </div>

            
        </>
    )
}
export default Home;