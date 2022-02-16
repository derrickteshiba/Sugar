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

export default function CustomerContent() {
    const [sugarUsers, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    function printUsers() {
        const db = getDatabase();
        var users = ref(db, 'user');
        get(users).then((snapshot) => {
            const newUsers = [];
            snapshot.forEach((snap) => {
                const userObject = snap.val();
                const name = userObject.name;
                newUsers.push(name);
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
                    } else if (user.toLowerCase().includes(searchTerm.toLowerCase())) {
                       return user;
                    }
                }).map((user) => {
                        return <li>{user}</li>;
                })}
            </ul>
        </div>
    );
}
