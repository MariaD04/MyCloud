import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cleanSignupInfo, cleanSignupError, fetchSignup } from '../../store/slices/signupSlice'
import './Authorization.css'

export default function SignUp() {

  const [inputData, setInputData] = useState({login: '', fullname: '', email: '', password: ''})
  const { login, fullname, email, password } = inputData

  const { signupInfo, signupError } = useSelector((state) => state.signup)
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const inputChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target

    setInputData(prevForm => ({
      ...prevForm,
      [name]: value,
    }))
  }

  const enter = (e) => {
    e.preventDefault()
  }

  return (
    <div className='signup-container'>
      <form className='form'>
        <h2>Зарегистрироваться</h2>
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
          <label className='form-label' htmlFor='login'>Имя</label>
          <input 
            className='form-input'
            type='text'
            id='fullname'
            name={'fullname'}
            value={fullname}
            onChange={inputChange}
            placeholder='Введите полное имя'
          />
        </div>
        <div className='form-control'>
          <label className='form-label' htmlFor='login'>Email</label>
          <input 
            className='form-input'
            type='text'
            id='email'
            name={'email'}
            value={email}
            onChange={inputChange}
            placeholder='Введите email'
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
        <div className='btn registration-btn' onClick={enter}>
          <button className='btn registration-btn' type='submit'>Зарегистрироваться</button>
        </div>
      </form>
    </div>
  )
}
