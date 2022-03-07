import React from 'react'
import {Container, Row} from 'react-bootstrap'
import {MatchProfilePending, MatchProfileAccepted} from "./matchProfile"

var user = "Jason"

var matches = [
    { to:"Jason", from:"Krish", status: "pending", matchID: "1"},
    { to:"Krish", from:"Derrick", status: "pending", matchID: "2"},
    { to:"Derrick", from:"Matthew", status: "pending", matchID: "3"},
    { to:"Matthew", from:"Victor", status: "accepted", matchID: "4"},
    { to:"Victor", from:"Jason", status: "accepted", matchID: "5"},
    { to:"Jason", from:"Matthew", status: "accepted", matchID: "6"}
];

const pendingMatches = matches.filter(match =>(
    (match.to === user || match.from === user) && match.status === "pending"
    )
)
const acceptedMatches = matches.filter(match =>(
    (match.to === user || match.from === user) && match.status === "accepted"
    )
)

function statusFilter(name, Array){
    var res = [];
    for (var i=0; i < Array.length; i++) {
        if (Array[i].to === name) {
            res.push([Array[i].from, Array[i].matchID]);
        }
        else if (Array[i].from === name) {
            res.push([Array[i].to, Array[i].matchID]);
        }
    }
    return res;
}

var pendingNames = statusFilter(user, pendingMatches);
var acceptedNames = statusFilter(user, acceptedMatches);

console.log("Pending: " + pendingNames);
console.log("Accepted: " + acceptedNames);

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
                <MatchProfilePending uid="bPcbMZMxzVZUIwfgGH6wKCY7qmG3" />
                {/* {pendingNames.map(d => (<p>{d[0]}</p>))}  */}
            </Row> 
        </Container>
        <Container>
            <h3>MATCHED!!!</h3>
            <Row className="justify-content-md-center">
                <MatchProfileAccepted uid={uid}/>
                {/* {acceptedNames.map(d => (<p>{d[0]}</p>))}  */}
            </Row> 
        </Container>
     </>
  )
}