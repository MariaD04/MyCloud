import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cleanSignupInfo, cleanSignupStatus, cleanSignupError, fetchSignup } from '../../store/slices/signupSlice'
import './Authorization.css'

export default function SignUp() {

  const [inputData, setInputData] = useState({login: '', fullname: '', email: '', password: ''})
  const { login, fullname, email, password } = inputData

  const { signupInfo, signupStatus, signupError } = useSelector((state) => state.signup)
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (Object.keys(signupInfo).length != 0) {
      navigate('/disk')
    }
    //signupInfo.admin == true ? navigate('/users') : navigate('/disk')
  }, [signupInfo])

  useEffect(() => {
    if (signupStatus == 'Ok') {
      navigate('/login')
      dispatch(cleanSignupStatus())
    }
    if (signupError == 'Request failed with status code 400') {
      dispatch(cleanSignupError(''))
      alert('Пользователь с таким логином уже существует!')
    }
  }, [signupStatus, signupError])


  const inputChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target

    setInputData(prevForm => ({
      ...prevForm,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      "username": `${login}`,
      "fullname": `${fullname}`,
      "email": `${email}`,
      "password": `${password}`,
    }
    dispatch(fetchSignup(newUser));
  };


  return (
    <div className='signup-container'>
      <form className='form' onSubmit={handleSubmit}>
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
        <div className='btn registration-btn'>
          <button className='btn registration-btn' type='submit'>Зарегистрироваться</button>
        </div>
      </form>
    </div>
  )
}
