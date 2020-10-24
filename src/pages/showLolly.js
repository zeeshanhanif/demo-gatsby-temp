import React from "react"
//import Lolly from '../svgs/lolly-image.svg'
import Lolly from '../components/Lolly'
import Header from '../components/Header'
import { gql, useQuery } from "@apollo/client"
import { useQueryParam } from "gatsby-query-params";

const GET_LOLLY = gql`  
    query getData($lollyPath: String!){
        getLolly(lollyPath: $lollyPath) {
            recipientName
            message
            senderName
            flavourTop
            flavourMiddle
            flavourBottom
            lollyPath
        }
    }
`

export default function ShowLolly() {
    const id = useQueryParam("id","123");
    console.log("id = ",id);
    const {loading, error, data} = useQuery(GET_LOLLY, {
        variables: {lollyPath: id}
    })
    console.log("data = ",data);

  return (

    <div className="container">
      <Header/>
      {loading && <p>Loading Client Side Querry...</p>}
      {error && <p>Error: ${error.message}</p>}
      {data && data.getLolly && 
      <div className="newLollyForm">
        <div>
            <Lolly lollyTopFill={data.getLolly.flavourTop} lollyMiddleFill={data.getLolly.flavourMiddle} lollyBottomFill={data.getLolly.flavourBottom} />
        </div>
        <div>
            <div className="details" style={{textAlign:"left", border: "2px solid red", marginLeft:"30px"}}>
                <p>Your lolly is freezing. Share it with this link:</p>
                <pre>https://vlolly.net/lolly/UJpEMsWGR</pre>
                <div style={{height: "200px"}}>
                    <div id="recipient" className="recipient">
                        {data.getLolly.recipientName}
                    </div>
                    <div id="message" className="message">
                        {data.getLolly.message}
                    </div>
                    <div id="from" className="from">
                        {data.getLolly.senderName}
                    </div>
                </div>
            </div>
        </div>
      </div>}
    </div>
    
  )
}
