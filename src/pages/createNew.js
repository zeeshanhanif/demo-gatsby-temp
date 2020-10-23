import { useMutation, useQuery } from "@apollo/client";
import gql from 'graphql-tag';
import React, { useRef, useState } from "react"
import ReactDOM from 'react-dom'
//import Lolly from '../svgs/lolly-image.svg'
import Header from '../components/Header'
import Lolly from '../components/Lolly'

const GET_LOLLY = gql`
{
    getLolly {
        message,
        senderName
    }
}
`
const createLollyMutation = gql`
    mutation createLolly($recipientName:String!, $message: String!, $senderName: String!,$flavourTop: String!,$flavourMiddle: String!,$flavourBottom: String!) {
        createLolly(recipientName: $recipientName, message: $message, senderName: $senderName,flavourTop: $flavourTop, flavourMiddle: $flavourMiddle,flavourBottom: $flavourBottom){
            recipientName
            message
            senderName
            flavourTop
            flavourMiddle
            flavourBottom
        }
    }
`;

export default function NewLolly() {
    const [color1, setColor1] = useState("#d52358");
    const [color2, setColor2] = useState("#e95946");
    const [color3, setColor3] = useState("#deaa43");
    const recipientNameRef = useRef();
    const messageRef = useRef();
    const senderNameRef = useRef();
    const {loading,error, data} = useQuery(GET_LOLLY);
    console.log(data);
    const [createLolly] = useMutation(createLollyMutation);
    const createLollySubmit = async () => {
        console.log("recipientNameRef = ", recipientNameRef.current.value);
        const result = await createLolly({
            variables: {
                recipientName : recipientNameRef.current.value,
                message :messageRef.current.value,
                senderName: senderNameRef.current.value,
                flavourTop: color1,
                flavourMiddle: color2,
                flavourBottom: color3
            }
        })
        console.log("result = ",result);
    }
  return (
      
    <div className="container">
      <Header/>
      <div className="newLollyForm">
        <div >
            <Lolly lollyTopFill={color1} lollyMiddleFill={color2} lollyBottomFill={color3} />
        </div>
        <div className="flavours">
            <input type="color" className="colorPicker" name="flavourTop" id="flavourTop" value={color1} 
                onChange={(e)=>{
                    setColor1(e.target.value);
                }}/>
            <input onChange={(e)=>{
                    setColor2(e.target.value)
                }} type="color" className="colorPicker" name="flavourMiddle" id="flavourMiddle" value={color2}/>
            <input onChange={(e)=>{
                    setColor3(e.target.value)
                }} type="color" className="colorPicker" name="flavourBottom" id="flavourBottom" value={color3}/>
        </div>
        <div>
            <div className="details" style={{textAlign:"left"}}>
                <div style={{margin:"20px"}}>
                    <label htmlFor="recipientName" style={{display:"block", }}>To</label>
                    <input name="recipientName" id="recipientName" ref={recipientNameRef} />
                </div>
                <div style={{margin:"20px"}}>
                    <label htmlFor="message" style={{display:"block", }}>Message</label>
                    <textarea cols="30" rows="10" name="message" id="message" ref={messageRef} />
                </div>
                <div style={{margin:"20px"}}>
                    <label htmlFor="senderName" style={{display:"block", }}>From</label>
                    <input name="senderName" id="senderName" ref={senderNameRef} />
                </div>
            </div>
            <input type="button"  value="Create" onClick={createLollySubmit}/>
        </div>
      </div>
    </div>
    
  )
}
