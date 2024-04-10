import { useState,useEffect } from "react";
import Card from "../Components/Card";
import { useNavigate } from 'react-router-dom';

function Home()
{       
    let options={weekday:'long',year:'numeric',month:'long',day:'numeric'}

      let [Live,SetLive]=useState([]);
      let[filter,setfilter]=useState([]);
     
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
     
    let filtermeeting=Live;
    let Navigate=useNavigate();
    if(filter=='dev')
    {
        filtermeeting=Live.filter(meeting => meeting.type=='dev')
    }
    else if(filter=='operation')
    {
        filtermeeting=Live.filter(meeting => meeting.type=='operation')
    }
    else if(filter=='marketing')
    {
        filtermeeting=Live.filter(meeting => meeting.type=='marketing')
    }
    
    function devHandler()
    {
        setfilter('dev');
    }
    function opHandler()
    {
        setfilter('operation');
    }
    function maHandler()
    {
        setfilter('marketing');
    }
    function addmeet()
    {
        Navigate('/meet')
    }
    
    return(
        <>

        <nav className="w-[1150px] items-center justify-between m-auto my-12 flex">
            <div className="link text-blue-500 text-5xl font-bold">Zoon.com</div>

            <div className="gap-5 flex">
                <button onClick={addmeet} className="bg-blue-200 px-6 font-semibold py-2 rounded-[150px] hover:bg-black hover:text-white transition-all shadow-md ">Add Meetings</button>
                <button className="font-bold text-blue-500">My Meetings</button>
            </div>
        </nav>

            <div className="w-[1150px] m-auto mt-32 flex gap-10">
                <button onClick={devHandler} className="bg-orange-100 text-orange-400 px-8 font-semibold py-3 rounded-[10px] transition-all shadow-md">DEVELOPERS</button>
                <button onClick={opHandler} className="bg-orange-100 text-orange-400 px-8 font-semibold py-3 rounded-[10px] transition-all shadow-md">OPERATIONS</button>
                <button onClick={maHandler} className="bg-orange-100 text-orange-400 px-8 font-semibold py-3 rounded-[10px] transition-all shadow-md">MARKETING</button>
                
            </div>

           

              <div className="flex font-semibold gap-2 w-[1150px] mt-20 m-auto flex-wrap">  
              {
                 filtermeeting.length >0 ?

                filtermeeting.map((LiveDatas)=>{

                    let date=new Date(LiveDatas.date)

                    let fdate=date.toLocaleDateString('en',options)
                    
                      return <Card title={LiveDatas.topic} date={fdate} type={LiveDatas.type} />  
                })

                :
                <div className="font-serif bottom-12  text-2xl"> No Meeting Available..  </div>

             }
              </div>

            
        </>
    )
}
export default Home;