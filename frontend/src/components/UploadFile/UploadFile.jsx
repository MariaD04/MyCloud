import React from 'react'

export default function UploadFile() {
    const inputChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
    
        setInputData(prevForm => ({
          ...prevForm,
          [name]: value,
        }))
    }

    const handleClick = () => {
        
    }

    return (
        <form className='upload-container'>
            <div className='form-control'>
                <input 
                    type="text"
                    name={"comment"}
                    value={comment}
                    onChange={inputChange}
                    placeholder='Добавить комментарий к файлу'
                />
            </div>
            <div className='form-control'>
                <input 
                    type="text"
                    name={"fileName"}
                    value={fileName}
                    onChange={inputChange}
                    placeholder='Добавить файл'
                />
            </div>
            <button type='submit' className='upload-btn' onClick={handleClick}>Загрузить файл</button>
        </form>
    )
}
