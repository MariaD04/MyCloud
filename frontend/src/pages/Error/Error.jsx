import React from 'react'
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <div className='error'>
        <h2>Error 404!</h2>
        <div>Page Not Found</div>
        <Link className='btn error-btn' to={'/'}>Home</Link>
    </div>
  )
}
