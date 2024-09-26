import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import "./Header.css"
import NavBar from '../NavBar/NavBar'
import cloudStorage from '../../assets/cloudStorage.png'

export default function Header() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loginInfo, saveLogin } = useSelector((state) => state.login)

    return (
        <div className='header-container'>
            <img className='cloudStorage'
                src={cloudStorage}
                alt="cloudStorage" 
                onClick={() => navigate('/')}
            />
            <NavBar />
            <div className='buttons'>
                {!Object.keys(loginInfo).length &&
                    <button className='enter' onClick={() => navigate('/login')}>Войти</button>
                }
                {!Object.keys(loginInfo).length &&
                    <button className='registration' onClick={() => navigate('/signup')}>Зарегистрироваться</button>
                }
                {Object.keys(loginInfo).length != 0 &&
                    <button className='logout' onClick={() => navigate('/')}>Выход</button>
                }
            </div>
        </div>
    )
}
