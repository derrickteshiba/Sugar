import { getDatabase, ref as dbRef, get } from "firebase/database"
import React, { useState, useEffect } from 'react'
import { Accordion, Row, Col, Image, Container, Card} from 'react-bootstrap'
import { getProfilePicUrl } from "../../utils/storage"

const db = getDatabase()

export default function MatchProfile( {uid} ) {
    const picRef = getProfilePicUrl(uid)

    const [profile, setProfile] = useState({
        data: null,
        loading: true
    })
    useEffect(() => {
        const userRef = dbRef(db, "user/" + uid)
    
        return get(userRef).then((snap) => {
          setProfile({
            data: {
              ...snap.val()
            },
            loading: false
          })
        })
    }, [uid])

    if (!profile.data)
    {
        console.log("no data")
        return (
            <p>ERROR: no data</p>
        )
    }

    return (
    <>
        <Accordion defaultActiveKey="0" style={{ width: '70%' }}>
            <Accordion.Item eventKey="1">
                <Accordion.Header>
                <Row style={{ width: '100%' }}>
                    <Col  xs={4}> 
                        <Image style={{ width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden'}} src={picRef} alt="Match's Profile Picture" />
                    </Col>
                    <Col className='d-flex justify-content-center align-self-center'>
                        <h1>{profile.data.name}</h1>
                    </Col> 
                </Row>
                </Accordion.Header>
                <Accordion.Body>
                    <h5>Bio:</h5>
                    <p>{profile.data.bio}</p>
                    <h5>Status:</h5>
                    <p>{profile.data.status}</p>
                    <h5>Phone Number:</h5>
                    <p>{profile.data.phoneNumber}</p>
                    <h5>Venmo:</h5>
                    <p>{profile.data.venmoUsername}</p>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
     </>
  )
}