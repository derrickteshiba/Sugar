import { getDatabase, ref as dbRef, set, get } from "firebase/database"
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage"
import React, { useState, useEffect } from "react"
import { getProfilePicUrl } from "../../utils/storage"
import buildProfileSchema from "./buildProfileSchema"
import { Form, Image, InputGroup, Row, Col } from "react-bootstrap"
import styled from "styled-components"
import writeMatch from "../DatabaseSearch/WriteMatches"

const Button = styled.button`
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  border-color : #00FF00;
  border-style: clear;
  background-color: #00FF00;
`;

const Button1 = styled.button`
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  border-color : #FF0000;
  border-style: clear;
  background-color: #FF0000;
`;


const db = getDatabase()
const storage = getStorage()

const profileSchema = buildProfileSchema()

export default function ViewProfileCard({uid}) {

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

  if (profile.loading) return null

  return (
    <div className="card mb-2" style = {{background: "#EFE1CE", height: '100vh'}}>
        <div className="card-header" className = "text-center" className="d-flex align-items-center flex-column">   
            <Image
                src = {picRef}
                width = {250}
                height = {250}
                className = "border rounded-circle"
            />
        </div>
        <Row>
            <div 
            className="card mb-2" 
            className="col-sm-12 my-auto"
            style={{minHeight: "50px"}}>
                <div className="text-center" style={{ padding: "10px 20px", textAlign: "center", color: "black"}}>
                    <h1>{profile.data.name}</h1>
                </div>
            </div>
        </Row>
        <Row style={{border: 'none'}} >
            <div 
            className="card mb-2" 
            className="col-sm-12 my-auto"
            style={{minHeight: "50px"}}>
                <div className="text-center" style={{ padding: "10px 20px", textAlign: "center", color: "black"}}>
                    <h5>
                        {profile.data.bio}
                    </h5>
                </div>
            </div>
        </Row> 
        <Row>
            <Col  className="text-center">
                <Button className="text-center" onClick = {()=>writeMatch(uid, "match")}>
                    Accept
                </Button>
            </Col>
            <Col className="text-center">
                <Button1  onClick = {()=>writeMatch(uid, "reject")}>
                    Reject
                </Button1>
            </Col>
        </Row>  
    </div>

  )
}
