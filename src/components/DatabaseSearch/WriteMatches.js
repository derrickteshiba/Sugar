import { getDatabase, ref, onValue, get, push, set, update } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function writeMatch(recieverId, which) {
    const currentUser = getAuth().currentUser.uid;
    const db = getDatabase();
    console.log("yo")
    const matches = ref(db, 'matches');
    var write = true;
    get(matches).then((snapshot) => {
        snapshot.forEach((snap) => {
            if(snap.val().sender === currentUser && snap.val().reciever === recieverId) 
            {
                write = false;
                console.log("hello")
            }
            else if(snap.val().sender === recieverId && snap.val().reciever === currentUser) {
                if(snap.val().matchStatus === "pending") {
                    const match = {
                        ...snap.val(),
                        "matchStatus" : which
                    }
                    set(ref(db, 'matches/' + snap.key), match);
                    
                }
                write = false;
            }
        })
        const newStatus = (which === "match") ? "pending" : "reject";
        if(write) {
            console.log("hi")
            const newMatch = {
                "sender" : currentUser,
                "reciever" : recieverId,
                "matchStatus" : newStatus,
            }
            push(matches, newMatch);
        }
    })
    return
};