import { getDatabase, ref, onValue, get, push, set, update } from "firebase/database";
import { useEffect } from "react";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button, Stack, Card, Container, Row, Col } from "react-bootstrap"
import { getProfilePicUrl } from "../../utils/storage"
import useAuthLevel from "../app/useAuthLevel";
import "./searchBar.css"
//FIX: when typing in search bar the paging gets messed up
//FIX: split into multiple files
//FIX: shouldDisplay doesn't latch, resets on refresh.
//FIX: The paging generally speaking is whack
//TODO: Make Search Bar Nicer
//NOTE: Don't be a dummy like me and run the script repeatedly. You will use up the firebase storage limit for the day fetching images repeatedly.
export default function Search() {
    const [sugarUsers, setUsers] = useState([]);
    const [matches, setMatches] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const { user, profile } = useAuthLevel();
    const uid = user?.uid;
    const db = getDatabase();
    function getUserInfo() {
        var users = ref(db, 'user');
        return onValue(users, (snapshot) => {
            const newUsers = [];
            snapshot.forEach((snap) => {
                const userVal= snap.val();
                const userId = snap.key;
                const userObject = {
                    "name" : userVal.name,
                    "userId" : userId,
                    "bio" : userVal.bio,
                    "shouldDisplay" : true
                };
                newUsers.push(userObject);
            });
            setUsers(newUsers);
        });
    }
    function getMatches() {
        const matches = ref(db, 'matches');
        return onValue(matches, (snapshot) => {
            const newMatches= [];
            snapshot.forEach((snap) => {
                const match = snap.val();
                const matchId = match.key;
                const matchObject = {
                    "sender" : match.sender,
                    "reciever" : match.reciever,
                    "status" : match.status,
                    "matchId" : matchId
                };
                newMatches.push(matchObject);
            });
            setMatches(newMatches);
        });
    }
    
    function nextPage() {
        if(!((page + 1) * 9 > sugarUsers.length))
            setPage(page + 1);
    }
    function prevPage() {
        if(page !== 0)
            setPage(page - 1);
    }
    function writeMatch(recieverId, which) {
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
                    "matchStatus" : newStatus
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
    useEffect(() => {
        getUserInfo();
       // getMatches()
       // changeDisplay();
    }, []);

    return (
        <div className="search">
            <Container>
                <Row>
                    <Col>  
                        <Row>
                            <input type="text" placeholder="Search..." onChange={event => {setSearchTerm(event.target.value)}}/>
                        </Row>
                        <Row>
                        <Stack direction="horizontal" gap={5}>
                            <Button onClick={prevPage}>
                             prevPage
                            </Button>
                            <Button onClick={nextPage}>
                            nextPage
                            </Button>
                        </Stack>
                        </Row>
                    </Col>
                    <Col xs={9}>
                        <h2>Welcome {profile?.name}</h2>
                        <Row xs={1} md={3} className="g-4">
                        {sugarUsers.filter((user) => {
                                if (searchTerm === "") {
                                    return user;
                                } else if (user.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                    return user;
                                }
                            }).slice(page * 9,page * 9 + 9).map((user) => {
                                if(user.userId === uid || !user.shouldDisplay) {
                                    return
                                }
                                else {
                                    return <Col key={user.userId}>
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
                    </Col>
                </Row>
            </Container>
        </div>
    );
}



