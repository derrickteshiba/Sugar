import React from 'react'
import { useState, useEffect } from 'react'
import {Accordion, Container, Row} from 'react-bootstrap'
import {MatchProfilePending, MatchProfileAccepted} from "./matchProfile"
// import { getDatabase, ref as dbRef, set, get } from "firebase/database"
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage"
import { getDatabase, ref, onValue, get, push, set, update } from "firebase/database";

const db = getDatabase()
const storage = getStorage()

function statusFilter(name, Array){
    var res = [];
    for (var i=0; i < Array.length; i++) {
        if (Array[i].reciever === name) {
            res.push([Array[i].sender, Array[i].matchID]);
        }
        else if (Array[i].sender === name) {
            res.push([Array[i].reciever, Array[i].matchID]);
        }
    }
    return res;
}


export default function Matches({uid}) { 
    const [matches, setMatches] = useState([])

    function getMatches() {
        const matches = ref(db, 'matches');
        return onValue(matches, (snapshot) => {
            const newMatches= [];
            snapshot.forEach((snap) => {
                const match = snap.val();
                const matchId = snap.key;
                const matchObject = {
                    "sender" : match.sender,
                    "reciever" : match.reciever,
                    "status" : match.matchStatus,
                    "matchId" : matchId
                };
                newMatches.push(matchObject);
            });
            setMatches(newMatches);
        });
    }

    useEffect(() => {
       getMatches()
    }, []);

    const pendingMatches = matches.filter(match =>(
        match.reciever === uid && match.status === "pending"
        )
    )
    const acceptedMatches = matches.filter(match =>(
        (match.reciever === uid || match.sender === uid) && match.status === "match"
        )
    )
        
    var pendingNames = statusFilter(uid, pendingMatches);
    var acceptedNames = statusFilter(uid, acceptedMatches);
    

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
        <Accordion>
            <Accordion.Header>
            <h3>Pending:</h3>
            </Accordion.Header>
            <Accordion.Body>
            <Row className="justify-content-md-center">
                {pendingNames.map(d => (<MatchProfilePending uid={d[0]} />))} 
            </Row> 
            </Accordion.Body>
        </Accordion>
        <Accordion>
            <Accordion.Header>
            <h3>Matches:</h3>
            </Accordion.Header>
            <Accordion.Body>
            <Row className="justify-content-md-center">
                {acceptedNames.map(d => (<MatchProfileAccepted uid={d[0]} />))} 
            </Row> 
            </Accordion.Body>
        </Accordion>
        </Container>
     </>
  )
}