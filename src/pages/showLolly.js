import React from "react"
import Lolly from '../svgs/lolly-image.svg'
import Header from '../components/Header'

export default function ShowLolly() {
  return (
    <div className="container">
      <Header/>
      <div className="newLollyForm">
        <div>
            <Lolly />
        </div>
        <div>
            <div className="details" style={{textAlign:"left", border: "2px solid red"}}>
                <p>Your lolly is freezing. Share it with this link:</p>
                <pre>https://vlolly.net/lolly/UJpEMsWGR</pre>
                <div style={{height: "200px"}}>
                    <div id="recipient" className="recipient">
                        Zeeshan
                    </div>
                    <div id="message" className="message">
                        Hello this is for you
                    </div>
                    <div id="from" className="from">
                        shan
                    </div>
                </div>
            </div>
            <input type="submit"  value="Create"/>
        </div>
      </div>
    </div>
    
  )
}
