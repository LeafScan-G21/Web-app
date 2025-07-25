import React from 'react'

const FullWidthButton = ({onClick, body}) => {
  return (
    <button onClick={onClick} className='w-full bg-green-700 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2'>
        {body}
    </button>
  )
}

export default FullWidthButton