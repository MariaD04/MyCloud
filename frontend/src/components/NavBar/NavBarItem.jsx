import { NavLink } from "react-router-dom"

export default function NavBarItem({ label, link }) {

    const classname = ({ isActive }) => isActive ? "navbar__item navbar__item-active " : "navbar__item"

    return (
        <NavLink to={link} className={classname}>
            {label.toUpperCase()}
        </NavLink>
    )
}