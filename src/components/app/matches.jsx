import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage"
import React from 'react'
import { Accordion, Card, Container, Row, Col, Image} from 'react-bootstrap'

const storage = getStorage()

export default function Matches( {uid} ) {
    const picRef = storageRef(storage, "profilePic/" + uid)
    
    return (
    <>
        <div className="text-center">
            <h1>
                Your Matches 
            </h1> 
        </div>
        <Container> 
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                    <Row>
                        <Col> 
                            <Image variant="top" src="picRef" alt="Match's Profile Picture"/>
                        </Col>
                        <Col>
                            <h3>Match's Name</h3>
                        </Col> 
                    </Row>
                    </Accordion.Header>
                    <Accordion.Body>
                        <p>Match's Bio</p>
                        <p>Match's Venmo</p>
                        <p>Match's Phone Number</p>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>

     </>
  )
}