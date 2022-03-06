import { getDatabase, ref, onValue, get, push, set, update } from "firebase/database";
import { useEffect } from "react";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button, Stack, Card, Container, Row, Col } from "react-bootstrap"
import { getProfilePicUrl } from "../../utils/storage"
import useAuthLevel from "../app/useAuthLevel";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./searchBar.css"
import { connectStorageEmulator } from "firebase/storage";
//FIX: when typing in search bar the paging gets messed up
//FIX: split into multiple files
//FIX: shouldDisplay doesn't latch, resets on refresh.
//FIX: The paging generally speaking is whack
//TODO: Make Search Bar Nicer
//NOTE: Don't be a dummy like me and run the script repeatedly. You will use up the firebase storage limit for the day fetching images repeatedly.
export default function Search() {
    const [sugarUsers, setUsers] = useState([]);
    const [matchesList, setMatches] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const { user, profile } = useAuthLevel();
    const uid = user?.uid;
    const db = getDatabase();
    function User(props) {
        return <Card className="single-card" border="dark">
            <Card.Img src={getProfilePicUrl(props.toDisp?.userId)} className="card-img-singular"/>
            <Card.Body>
                <Card.Title className="text-center">
                    {props.toDisp?.name}
                </Card.Title>
                <Row xs="auto">
                    <Col>
                        <Link as={Link} to = "/viewprofile" state = {{uid : props.toDisp?.userId }}>
                            Profile
                        </Link>
                    </Col>
                    <Col>
                        <Button variant="success" onClick={() => writeMatch(props.toDisp?.userId, "match")}>
                            Match
                        </Button> 
                    </Col>
                    <Col>
                        <Button variant="danger" onClick={() => writeMatch(props.toDisp?.userId, "reject")}>
                            Reject
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    }
    function UserList(props) {
        console.log(props)
        return <Row xs={1} md={3} className="g-4">
        {props.sugarUsers.filter((user) => {
            if (props.searchTerm === "") {
                return user;
            } else if (user.name.toLowerCase().includes(props.searchTerm.toLowerCase())) {
                return user;
            }
        }).map((user) => {
            if(!user.shouldDisplay || !user.typeDisplay) {
                return
            }
            else {
                return <Col xs={4} key={user.userId}>
                    <Card border="dark">
                        <Card.Img src={getProfilePicUrl(user.userId)} className="card-img"/>
                        <Card.Body>
                            <Card.Title className="text-center">
                                {user.name}
                            </Card.Title>
                            <Row xs="auto">
                                <Col>
                                    <Link as={Link} to = "/viewprofile" state = {{
                                        uid : user.userId
                                    }}>
                                    Profile
                                    </Link>
                                </Col>
                                <Col>
                                    <Button variant="success" onClick={() => writeMatch(user.userId, "match")}>
                                     Match
                                    </Button> 
                                </Col>
                                <Col>
                                    <Button variant="danger" onClick={() => writeMatch(user.userId, "reject")}>
                                    Reject
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            }
        })}
        </Row>
    }
    function getUserInfo() {
        const matchesRef = ref(db, 'matches');
        const userRef = ref(db, 'user');
        const newUsers = [];
        const newMatches = [];
        const currentUser = getAuth().currentUser.uid
        onValue(matchesRef, (snapshot) => {
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
        })
        onValue(userRef, (snapshot) => {
            snapshot.forEach((snap) => {
                let display = true
                for(let i = 0; i < newMatches.length; i++) {
                    if (newMatches[i].reciever === snap.key && newMatches[i].sender === currentUser) {
                        display = false
                    }
                }
                if(currentUser === snap.key) {
                    display = false
                }
                const userVal = snap.val();
                const userId = snap.key;
                const userObject = {
                    "name" : userVal.name,
                    "userId" : userId,
                    "bio" : userVal.bio,
                    "status" : userVal.status,
                    "shouldDisplay" : display,
                    "typeDisplay" : true
                }
                newUsers.push(userObject);
            })
            setUsers(newUsers);
        })
    }
    function check(status, boxStatus) {
        const display = (boxStatus === "true")
        const updatedUsers = sugarUsers.map((user) => {
            if (user.status === status) {
                const changedUserDisplay = {
                    ...user,
                    "typeDisplay" : display
                }
                return changedUserDisplay
            }
            return user
        })
        setUsers(updatedUsers)
    }
    function writeMatch(recieverId, which) {
        console.log("running")
        const matches = ref(db, 'matches');
        var write = true;
        get(matches).then((snapshot) => {
            snapshot.forEach((snap) => {
                if(snap.val().sender === uid && snap.val().reciever === recieverId) 
                {
                    write = false;
                }
                else if(snap.val().sender === recieverId && snap.val().reciever === uid && snap.val().matchStatus === "pending") {
                    const match = {
                        ...snap.val(),
                        "matchStatus" : which
                    }
                    set(ref(db, 'matches/' + snap.key), match);
                    write = false;
                    changeDisplay(recieverId);
                }
            })
            const newStatus = (which === "match") ? "pending" : "reject";
            if(write) {
                const newMatch = {
                    "sender" : uid,
                    "reciever" : recieverId,
                    "matchStatus" : newStatus,
                }
                push(matches, newMatch);
            }
        }).then(changeDisplay(recieverId))
    };
    function changeDisplay(id) {
        const updatedUsers = [];
        for(var i = 0; i < sugarUsers.length; i++) {
            if (sugarUsers[i].userId === id) {
                const hideUser = {
                    ...sugarUsers[i],
                    "shouldDisplay": false
                }
                updatedUsers.push(hideUser);
            }
            else {
                updatedUsers.push(sugarUsers[i]);
            }
        } 
        if(updatedUsers)
            setUsers(updatedUsers);
    }
    function displayRandomUser(list) {
        if(list.length === 0) {
            return
        }
        const listSize = list.length;
        let randIndex = Math.floor(Math.random()*listSize)
        while(list[randIndex].shouldDisplay === false || list[randIndex].typeDisplay === false) {
            randIndex = Math.floor(Math.random()*listSize)
        }
        return list[randIndex]
    }

    useEffect(() => {
        getUserInfo();
    }, []);
    let myDisplay = <UserList sugarUsers={sugarUsers} searchTerm={searchTerm} />
    if (searchTerm === "") {
        myDisplay = <User toDisp={displayRandomUser(sugarUsers)}/>
    } 
    return (
        <div className="search">
            <Container>
                <Row>
                    <Col>  
                        <Row>
                            <input type="text" placeholder="Search..." onChange={event => {setSearchTerm(event.target.value)}}/>
                        </Row>
                        <Row>
                            <h4>Filter Users</h4>
                            <label>
                                <input type="checkbox" defaultChecked={true}  onChange={event => check("papa", event.target._valueTracker.getValue())}/>
                                Sugar Papa
                            </label>
                            <label>
                                <input type="checkbox" defaultChecked={true} onChange={event => check("moma", event.target._valueTracker.getValue())}/>
                                Sugar Moma
                            </label>
                            <label>
                                <input type="checkbox" defaultChecked={true} onChange={event => check("boy", event.target._valueTracker.getValue())}/>
                                Baby Boy
                            </label>
                            <label>
                                <input type="checkbox" defaultChecked={true} onChange={event => check("girl", event.target._valueTracker.getValue())}/>
                                Baby Girl
                            </label>
                        </Row>
                    </Col>
                    <Col xs={9}>
                        <h2>Welcome {profile?.name}</h2>
                        {myDisplay}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
