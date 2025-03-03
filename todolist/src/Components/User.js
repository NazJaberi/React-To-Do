import react from 'react'
import profile from "../images/profile.png"

function User(){

    return(
        <div className='User'>
            <div className='profile'>
                <img src={profile} alt= "profile" />
            </div>
            <div className='info'>
                <p> Nezar Jaberi</p>
                <a href="#">Logout!</a>
            </div>
        </div>
    )
}

export default User