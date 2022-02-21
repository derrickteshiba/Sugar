import React from 'react'
import {Container, Row} from 'react-bootstrap'
import MatchProfile from "./matchProfile"

var user = "Jason"

var matches = [
    { to:"Jason", from:"Krish", status: "pending" },
    { to:"Krish", from:"Derrick", status: "pending" },
    { to:"Derrick", from:"Matthew", status: "pending" },
    { to:"Matthew", from:"Victor", status: "accepted" },
    { to:"Victor", from:"Jason", status: "accepted" },
    { to:"Jason", from:"Matthew", status: "accepted" }
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
            res.push(Array[i].from);
        }
        else if (Array[i].from === name) {
            res.push(Array[i].to)
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
                {pendingNames.map(d => (<p>{d}</p>))} 
            </Row> 
        </Container>
        <Container>
            <h3>MATCHED!!!</h3>
            <Row className="justify-content-md-center">
                {acceptedNames.map(d => (<p>{d}</p>))} 
            </Row> 
        </Container>
     </>
  )
}

// export default function Matches({uid}) { 

//     return (
//     <>
//         <br />  
//         <div className="text-center">
//             <h1>
//                 Your Matches 
//             </h1> 
//         </div>
//         <br />
//         <Container>
//             <h3>Pending:</h3>
//             <Row className="justify-content-md-center">
//                 <MatchProfile uid={uid}/>
//             </Row> 
//         </Container>
//         <Container>
//             <h3>MATCHED!!!</h3>
//             <Row className="justify-content-md-center">
//                 <MatchProfile uid={uid}/>
//             </Row> 
//         </Container>
//      </>
//   )
// }