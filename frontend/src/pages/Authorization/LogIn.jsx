import React, { useState } from 'react'
import './Authorization.css'

export default function LogIn() {

  const [inputData, setInputData] = useState({login: '', password: ''})

  const { login, password } = inputData

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
        <div className='btn enter-btn' onClick={enter}>
          <button className='btn enter-btn' type='submit'>Войти</button>
        </div>
      </form>
    </div>
  )
}
