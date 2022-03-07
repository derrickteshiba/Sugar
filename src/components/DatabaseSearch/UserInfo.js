import { getDatabase, ref, onValue, get, push, set, update } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function getUserInfo() {
    const db = getDatabase();
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
    })
    return {"Users": newUsers, "Matches": newMatches}
}