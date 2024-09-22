import React from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import moment from 'moment'
import { deleteFileStatus, saveFileData } from '../../store/slices/diskSlice'
import { fetchSignup } from '../../store/slices/signupSlice'

const apiUrl = import.meta.env.VITE_APP_API_URL

export default function File({ id, fileName, size, comment, createdAt, downloadDate, path}) {
  const dispatch = useDispatch()

  const handleClick = (url, fileName) => {
    axios.get(url, {
      responseType: 'blob',
    })
    .then(result => {
      fileDownLoad(result.data, fileName)
    })

    const downloadDate = moment().format('YYYY-MM-DD HH:mm')
    dispatch({
      id: props.id,
      newData: {
        downloadDate
      }
    })
  }

  const deleteFile = () => {
    axios
      .delete(`${apiUrl}/delete/${id}`)
      .then(() => {
        dispatch(deleteFileStatus('file was delete'))
      })
  }

  const renameFile = (event) => {
    dispatch(saveFileData())
  }

  const downloadFile = () => {
    
  }

  const copyFileLink = async () => {
    await navigator.clipboard.writeText(`${apiUrl}${path}`)
    alert('Ссылка скопирована!')
  }

  const openFile = () => {
    dispatch(openFile(`${apiUrl}${path}`))
  }

  return (
    <div className='file-container'>
        <span className='fileName' onClick={openFile}>{fileName}</span>
        <span className='comment'>{comment}</span>
        <span className='size'>{size}</span>
        <span className='createdAt'>{createdAt}</span>
        <span className='downloadDate'>{downloadDate}</span>
        <div className='file-buttons'>
          <button className='delete' onClick={deleteFile}>✘</button>
          <button className='rename' onClick={renameFile}>✎</button>
          <button className='download' onClick={downloadFile}>⬇</button>
          <button className='copyLink' onClick={copyFileLink}>❒</button>
        </div>
    </div>
  )
}
