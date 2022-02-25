import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect } from "react";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button, Stack, Card, Container, Row, Col } from "react-bootstrap"
import { getProfilePicUrl } from "../../utils/storage"
import useAuthLevel from "../app/useAuthLevel";
import "./searchBar.css"
export default function Search() {
    const [sugarUsers, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const { loading, user, profile } = useAuthLevel();
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
                    "profilePic" : null
                };
                newUsers.push(userObject);
            });
            setUsers(newUsers);
        });
    }
    function nextPage() {
        if(!((page + 1) * 9 > sugarUsers.length))
            setPage(page + 1);
    }
    function prevPage() {
        if(page != 0)
            setPage(page - 1);
    }
    useEffect(() => {
        getUserInfo();
        console.log(sugarUsers);
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
                            }).slice(page * 9,page * 9 +9).map((user) => {
                                if(user.userId === uid) {
                                    return
                                }
                                else {
                                    return <Col key={user.userId}>
                                        <Card border="dark">
                                            <Card.Img src={getProfilePicUrl(user.userId)} className="card-img"/>
                                            <Card.Body>
                                                <Card.Title>
                                                    {user.name}
                                                </Card.Title>
                                                <Link as={Link} to = "/viewprofile" state = {{
                                                    uid : user.userId
                                                }}>
                                                Go to Profile
                                                </Link>
                                                <Button variant="success">
                                                    Match
                                                </Button>
                                                <Button variant="danger">
                                                    Reject
                                                </Button>
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
