import React from 'react'
import {Container, Row} from 'react-bootstrap'
import MatchProfile from "./matchProfile"


export default function Matches({uid}) { 

    return (
    <>
        <br />  
        <div className="text-center">
            <h1>
                Your Matches 
            </h1> 
        </div>
        <br />
        <Container>
            <h3>Pending:</h3>
            <Row className="justify-content-md-center">
                <MatchProfile uid={uid}/>
            </Row> 
        </Container>
        <Container>
            <h3>MATCHED!!!</h3>
            <Row className="justify-content-md-center">
                <MatchProfile uid={uid}/>
            </Row> 
        </Container>
     </>
  )
}