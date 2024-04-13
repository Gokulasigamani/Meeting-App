import { useState,useEffect } from "react";
import Card from "../Components/Card";
import { useNavigate } from 'react-router-dom';
import { Link,Route,Routes } from "react-router-dom";

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
   
    
    return(
        <>

        <nav className="w-[1150px] items-center justify-between m-auto my-12 flex">
            <div className="link text-blue-500 text-5xl font-bold">Zoon.com</div>

            <div className="gap-5 flex">
                <Link to={'/meet'} className="bg-blue-200 px-6 font-semibold py-2 rounded-[150px] hover:bg-black hover:text-white transition-all shadow-md ">Add Meetings</Link>
                <button className="font-bold text-blue-500">My Meetings</button>
            </div>
        </nav>

            <div className="w-[1150px] m-auto mt-32 flex gap-10">
                <button onClick={devHandler} className={filter=='dev'? "bg-orange-100 text-orange-400 px-8 font-semibold py-3 rounded-[10px]  shadow-md" :"bg-gray-300 text-black-400 px-8 font-semibold py-3 rounded-[10px] transition-all shadow-sm border border-neutral-200" }>DEVELOPERS</button>
                <button onClick={opHandler} className={filter=='operation'? "bg-orange-100 text-orange-400 px-8 font-semibold py-3 rounded-[10px]  shadow-md" :"bg-gray-300 text-black-400 px-8 font-semibold py-3 rounded-[10px] transition-all shadow-sm border border-neutral-200" }>OPERATIONS</button>
                <button onClick={maHandler} className={filter=='marketing'? "bg-orange-100 text-orange-400 px-8 font-semibold py-3 rounded-[10px]  shadow-md" : "bg-gray-300 text-black-400 px-8 font-semibold py-3 rounded-[10px] transition-all shadow-sm border border-neutral-200"}>MARKETING</button>
                
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