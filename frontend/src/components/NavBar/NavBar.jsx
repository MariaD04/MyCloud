import React from 'react'
import { useSelector } from 'react-redux'
import "./NavBar.css"
import NavBarItem from './NavBarItem'

export default function NavBar() {

    const { userInfo } = useSelector(state => state.user)
    const { loginInfo } = useSelector(state => state.login)

    return (
        <nav className="navbar-container">
            <NavBarItem key={'Главная'} label={'Главная'} link="/" />
            {Object.keys(loginInfo).length != 0 &&
                <NavBarItem key={'Диск'} label={'Диск'} link="/disk" />
            }
            {userInfo.is_superuser == true &&
                <NavBarItem key={'Пользователи'} label={'Пользователи'} link="/users" />
            }
        </nav>
    )
}

