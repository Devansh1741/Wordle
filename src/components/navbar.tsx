import { Link } from 'react-router-dom'
import '../App.css'
import {auth, provider} from '../config/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
export const Navbar = () => {

    const [user] = useAuthState(auth);

    const signInWithGoogle = async() => {
        const result = await signInWithPopup(auth, provider);
        console.log(result);
    }

    const userSignOut = async() => {
        await signOut(auth);
    }

    return (
    <div className='navBar'>
        {/* <div className='right'> <p> Hello</p></div> */}
        <div className='title'>
            <Link to="/" >Wordle</Link>
        </div>
        <div className='links'>
            {!user && <button onClick={signInWithGoogle}>Login</button>}
        </div>
        <div className='user'>
            {user && (
                <>
                <p>{user?.displayName}</p>
                <img src={user?.photoURL || "https://static.vecteezy.com/system/resources/previews/008/302/462/original/eps10-grey-user-icon-or-logo-in-simple-flat-trendy-modern-style-isolated-on-white-background-free-vector.jpg"} alt='Broken' height={20} width={20}/>
                <button onClick={userSignOut}>Log Out</button>
                </>
            )}
        </div>

    </div>

    )
}