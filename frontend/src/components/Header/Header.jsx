import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import "./Header.css"
import NavBar from '../NavBar/NavBar'
import cloudStorage from '../../assets/cloudStorage.png'
import { cleanLoginInfo } from '../../store/slices/loginSlice'
import { cleanUserInfo } from '../../store/slices/userSlice'
import { fetchLogout } from '../../store/slices/logoutSlice'

export default function Header() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loginInfo } = useSelector((state) => state.login)

    const handleClick = () => {
        dispatch(fetchLogout()).then(() => {
            dispatch(cleanUserInfo())
            dispatch(cleanLoginInfo())
            localStorage.clear()
            navigate('/')   
        })
    }

    return (
        <div className='header-container'>
            <img className='cloudStorage'
                src={cloudStorage}
                alt="cloudStorage" 
                onClick={() => navigate('/')}
            />
            <NavBar />
            <div className='buttons'>
                {Object.keys(loginInfo).length == 0 &&
                    <button className='enter' onClick={() => navigate('/login')}>Войти</button>
                }
                {Object.keys(loginInfo).length == 0 &&
                    <button className='registration' onClick={() => navigate('/signup')}>Зарегистрироваться</button>
                }
                {Object.keys(loginInfo).length != 0 &&
                    <button className='logout' onClick={handleClick}>Выход</button>
                }
            </div>
        </div>
    )
}
