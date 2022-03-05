/*import { getDatabase, ref, child, get, onValue } from "firebase/database";
import { useEffect } from "react";
import React, { useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getDatabase();

export default function Search() {
   const [userState, setUserState] = useState();
   const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        return onAuthStateChanged(getAuth(), async (user) => {
          const userRef = ref(db, "user/" + user.uid);
    
          return onValue(userRef, (snap) => {
            if (searchTerm === "") {
                setUserState(snap.val().name);
            } else if (snap.val().name.toLowerCase().includes(searchTerm.toLowerCase())) {
                setUserState(snap.val().name);
            }
            else {
                setUserState("");
            }
            });
          });
        });
    return (
        <div className="Search"> 
            <input type="text" placeholder="Search..." onChange={event => {setSearchTerm(event.target.value)}}/>
            <div>
                {userState} sucks at firebase
            </div>
        </div>

    );
}*/
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import { useEffect } from "react";
import React, { useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";

export default function Search() {
    const [sugarUsers, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');



    function printUsers() {
        const db = getDatabase();
        var users = ref(db, 'user');
        onValue(users, (snapshot) => {
            const newUsers = [];
            snapshot.forEach((snap) => {
                const userVal= snap.val();
                const userId = snap.key;
                const userObject = {
                    "name" : userVal.name,
                    "userId" : userId,
                    "status" :userVal.status
                };
                newUsers.push(userObject);
            });
            setUsers(newUsers);
        });
    }
    useEffect(() => {
        printUsers();
        console.log(sugarUsers);
    }, []);

    return (
        <div>
            <input type="text" placeholder="Search..." onChange={event => {setSearchTerm(event.target.value)}}/>
            <h2>Our Users</h2>
            <ul>
                {sugarUsers.filter((user) => {
                        if (searchTerm === "") {
                            return user;
                        } else if (user.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return user;
                        }
                }).map((user) => {
                        return <li key = {user.userId}>
                            <Link as={Link} to = "/viewprofile" state = {{
                                uid : user.userId
                            }}>
                                {user.name + " " + user.userId}
                            </Link>
                        </li>;
                })}
            </ul>
        </div>
    );
}



