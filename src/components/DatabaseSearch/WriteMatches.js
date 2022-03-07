import { getDatabase, ref, onValue, get, push, set, update } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function writeMatch(recieverId, which) {
    const currentUser = getAuth().currentUser.uid;
    const db = getDatabase();
    const matches = ref(db, 'matches');
    var write = true;
    get(matches).then((snapshot) => {
        snapshot.forEach((snap) => {
            if(snap.val().sender === currentUser && snap.val().reciever === recieverId) 
            {
                write = false;
            }
            else if(snap.val().sender === recieverId && snap.val().reciever === currentUser && snap.val().matchStatus === "pending") {
                const match = {
                    ...snap.val(),
                    "matchStatus" : which
                }
                set(ref(db, 'matches/' + snap.key), match);
                write = false;
            }
        })
        const newStatus = (which === "match") ? "pending" : "reject";
        if(write) {
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