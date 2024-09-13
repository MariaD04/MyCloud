import React from 'react'
import { useSelector } from 'react-redux'
import "./NavBar.css"
import NavBarItem from './NavBarItem'

export default function NavBar() {

    const { userInfo } = useSelector(state => state.user)

    const navbarItems = [
        { label: 'Главная', link: '/'},
        { label: 'Диск', link: '/disk'},
    ]

    return (
        <nav className="navbar-container">
            {navbarItems.map(({ label, link }) => (
                    <NavBarItem key={label} label={label} link={link} />
            ))}
            {userInfo.superuser == true &&
                <NavBarItem key={'Пользователи'} label={'Пользователи'} link="/users" />
            }
        </nav>
    )
}

