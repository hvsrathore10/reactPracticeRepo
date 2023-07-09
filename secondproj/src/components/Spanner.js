import React from 'react'
import loading from './loading.gif'

export default function Spanner() {
  return (
    <div className='text-center'>
      <img className='my-3' src={loading} alt="" />
    </div>
  )
}
