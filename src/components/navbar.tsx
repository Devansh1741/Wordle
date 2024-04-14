import { Link } from 'react-router-dom'
import '../App.css'
import {auth, provider} from '../config/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
export const Navbar = () => {

    const [user] = useAuthState(auth);

    const signInWithGoogle = async() => {
        const result = await signInWithPopup(auth, provider);
    }

    const userSignOut = async() => {
        await signOut(auth);
    }

    return (
    <div className='navBar'>
        <div className='logo'>
            <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEUAAAD///97tnfavEWBvn0pJRQcJBvjxEkrOCozMzMjIyMDAAOvr6/o6OgmJiYsJxXh4eGBgYEICAjFxcVXV1eNjY0bGxvW1tY4ODjrzE2HxoNiYmK3t7cPDw9xcXH5+flMakpDXEFvoGxhiV4oLSeGPYFrAAADtElEQVR4nO3c4VLaQBSG4V2KippgEgKigAJy/9dYUoucjaCHA5ksmff9h22+yTNYEmYKztfKkrwcFu4aK4ZlnmR1kAsepePrtMmKcXpUmM7aPrsLNUsPC/O2T+yC5QeE2aTts7pok6wuHLV9ShdvFArnbZ9PA82lsHvPYNVoL8zaPpeGyr6E3XqR2TfZCbt0mQjLP4Xp9z9Z3J/YVB49PfXoC80svkPSf8L6nUz+XL+1UySOHxoO3zUUO4bDn+u/jrNKWHsK395NpyYWHkwDnz2cJ/T+/a3+JDo/Dn6SGE8tFqH3SeAZb4XBuwkrMCJhSCy8C66Fb+ZTi0jog1/UzAVi27/BqpiE78FvpZOvPvnvRx8rJmFwgc9dKR5ZLhP/i0r4LFZKd+YVaFdUwuDq7MRL6eIymxEIxd1NcKm4P2MzLuG9OxzCn0KoDKEyhJYQKkOoDKElhMoQKkNoCaEyhMoQWkKoDKEyhJYQKkOoDKElhMoQKkNoCaEyhMoQWkKoDKEyhJYQKkOoDKElhMoQKkNoCaGyhoXTMzbFTIufmdk1rdOIiIiI6JoaPliT95Pu6cbak5y5tXfse4QudOf99HJn7UUQi9e+tdfBEeGF3j3d3P2xdnezn3ns96z1ESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIEeqE3f/MTPc/90RERETUiYpHa0W8M7LBGfe6YvT2jJlbAWzgzntwxvuVRyE8Y0YIm3j3hPCnTYTKGYTKGYSWTYTKGYTKGYSWTYTKGYTKGYSWTYTKGYTKGYSWTYTKGYTKGYSWTYTKGYTKGYSWTYTKGYTKGYSWTYTKGYTKGYSWTYTKGYTKGYSWTYTKGYTKGYSWTYTKGYTKGYSWTYTKmSaE4r++bjoj3Eif/NRZZ4TCNHSleLS2b0YlXAtT6XLxaGkejUrYXwpT7hLxyNlPLSZhT5ISl8mHK+tqTML+SpIy54MPJ3wYZyMS9j8kaOGdH8sfWInxCEOgG2+FafATt+pZlmMR9nurkJNuhX4W/swt14ZPqcTxmZn1smaZ+UpYexKrNoNTEwcXJx+8T74onHzwps6onsJK6PPvf9KRcv8p9JO2z6ShJn4nzH7/y1dZ9iX0o7bPpZFGfi/087bPpoHmXgo7+CyOfCj0abdebiaZrwt97fbtusvFN+eIb9FJ63c319os9YeFW+P4+r+7phingSkUVtfGJC+H1+kshmWeZHXQX6U5H505GXFpAAAAAElFTkSuQmCC' />
        </div>
        <div className='title'>
            <Link to="/" >Wordle</Link>
        </div>
        {/* <div className='links'>
        </div> */}
        <div className='user'>
            {!user && <button onClick={signInWithGoogle}>Login</button>}
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