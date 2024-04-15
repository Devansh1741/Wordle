import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import { DocumentReference, addDoc, collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../pages/Home";
import { ProgressBar } from "./progress-bar";

export const ScoreCard = () => {
    const {currAttempt} = useContext(AppContext);
    const [user] = useAuthState(auth);
    const scoreRef = collection(db, "Score");
    const userData = query(scoreRef, where("userId", "==", user?.uid));
    const [userScore, setUserScore] = useState<number[]>([]);

    useEffect(() => {
        getDocs(userData).then((querySnapShot) => {
            if(!querySnapShot.empty){
                querySnapShot.forEach((doc) => {
                    console.log(doc.id, "=>", doc.data());

                    const newScore = doc.data().score;
                    newScore[currAttempt.attempt] += 1;
                    newScore[6] += 1;
                    setUserScore(newScore);

                    updateDoc(doc.ref, {score: newScore, lastPlayed: new Date()}).then(() => {
                        console.log("Document added")
                    }).catch((error: Error) => console.log("Error update: ", error));
                })
            } else{
                let newUser = {
                    lastPlayed: new Date(),
                    score: [0, 0 ,0 ,0 ,0 ,0 ,1],
                    userId: user?.uid
                }

                newUser.score[currAttempt.attempt] += 1;
                

                addDoc(scoreRef, newUser)
                .then((docRef: DocumentReference) => {
                    setUserScore(newUser.score);
                    console.log('Document added with ID: ', docRef.id);
                })
                .catch((error: Error) => {
                    console.error('Error adding document: ', error);
                });
            }
             
        }).catch((error: Error) => {
            console.error('Error getting documents: ', error);
        })
    }, [])

    return (
        <div>
            {userScore.map((score, index) => {
                if(index !== 6){
                    return <>
                        <div key={index}> {/* Added key prop to the wrapping div */}
                        <p>{index}</p> 
                        <ProgressBar num={score} den={userScore[6]} />
                        </div>
                    </>
                    
                }
            })}
        </div>
    )
}