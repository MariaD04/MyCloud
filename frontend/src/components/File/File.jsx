import React from 'react'

export default function File({ fileName, size, title, createdAt, downloadDate}) {
  return (
    <div className='file-container'>
        <span className='fileName'>{fileName}</span>
        <span className='size'>{size}</span>
        <span className='title'>{title}</span>
        <span className='createdAt'>{createdAt}</span>
        <span className='downloadDate'>{downloadDate}</span>
    </div>
  )
}
