import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { saveLogin, fetchLogin } from '../../store/slices/loginSlice'
import { fetchUser } from '../../store/slices/userSlice'
import './Authorization.css'

export default function LogIn() {

  const [inputData, setInputData] = useState({login: '', password: ''})
  const { login, password } = inputData

  const { loginInfo, loginError, access, refresh } = useSelector((state) => state.login)
  const { userInfo } = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (Object.keys(loginInfo).length == 0) return
    userInfo.admin == true ? navigate('/users') : navigate('/disk')
  }, [userInfo])

  useEffect(() => {
    if (loginError.message == 401) {
      alert('Ошибка! Неправильно введён логин или пароль!')
    } else if (Object.keys(loginInfo).length != 0) {
      dispatch(saveLogin(login))

      localStorage.clear()
      localStorage.setItem('access_token', access)
      localStorage.setItem('refresh_token', refresh)
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`

      const decoded = jwtDecode(access)
      dispatch(fetchUser(decoded.user_id))
    } 

  }, [loginInfo, loginError])

  const inputChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target

    setInputData(prevForm => ({
      ...prevForm,
      [name]: value,
    }))
  }

  const handleClick = (e) => {
    e.preventDefault()
    const user = {
      login: login,
      password: password
    }
    dispatch(fetchLogin(user))
  }

  return (
    <div className='login-container'>
      <form className='form'>
        <h2>Войти</h2>
        <div className='form-control'>
          <label className='form-label' htmlFor='login'>Логин</label>
          <input 
            className='form-input'
            type='text'
            id='login'
            name={'login'}
            value={login}
            onChange={inputChange}
            placeholder='Введите логин'
          />
        </div>
        <div className='form-control'>
          <label className='form-label' htmlFor='password'>Пароль</label>
          <input 
            className='form-input'
            type='text'
            id='password'
            name={'password'}
            value={password}
            onChange={inputChange}
            placeholder='Введите пароль'
          />
        </div>
        <div className='checkbox'>
          <label className='checkbox-label' htmlFor="checkbox">Запомнить меня</label>
          <input className='checkbox-input' type="checkbox" id="checkbox"/>
        </div>
        <div className='btn enter-btn' onClick={handleClick}>
          <button className='btn enter-btn' type='submit'>Войти</button>
        </div>
      </form>
    </div>
  )
}
