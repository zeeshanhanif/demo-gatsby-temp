import React from "react"
//import Lolly from '../svgs/lolly-image.svg'
import Header from '../components/Header'
import { navigate } from "gatsby"
import Lolly from '../components/Lolly'

export default function Home() {
  return (
    <div className="container">
      <Header/>
      <div className="homeLollyList">
        <div className="first"><Lolly /></div>
        <div className="second"><Lolly /></div>
        <div className="third"><Lolly /></div>
        <div className="forth"><Lolly lollyTopFill="yellow" lollyMiddleFill="gray" lollyBottomFill="purple" /></div>
        {
          /*
          <div className="first"><Lolly /></div>
        <div className="second"><Lolly /></div>
        <div className="third"><Lolly /></div>
        <div className="forth"><Lolly /></div>
           */
        }
        
      </div>
      <div>
        <button onClick={()=>{
          navigate("/createNew")
        }} >Make a new lolly</button>
      </div>
    </div>
    
  )
}
