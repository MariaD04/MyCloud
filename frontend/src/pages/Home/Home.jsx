import React from 'react'
import './Home.css'

export default function Home() {
  return (
    <div className='home-container'>
      <h1>MyCloud</h1>
      <p>MyCloud - бесплатная облачная платформа для хранения файлов и безопасного предоставления доступа к ним.</p>
      <ol>С помощью MyCloud можно:
        <li>загружать новые файлы;</li>
        <li>редактировать файлы;</li>
        <li>удалять файлы;</li>
        <li>переименовывать файлы;</li>
        <li>предоставлять доступ к файлам другим пользователям;</li>
      </ol>
    </div>
  )
}
