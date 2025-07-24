import React from 'react'

const FormField = ({htmlFor, label, input_type, id, value, placeholder, Icon, onChange }) => {
  return (
    <div>
        <label htmlFor={htmlFor} className='block text-sm font-medium text-gray-700 mb-2'>{label}</label>
        <div className='relative'>
            <Icon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
                <input 
                    type={input_type}
                    id={id}
                    value={value}
                    onChange={onChange}
                    className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all'
                    placeholder={placeholder}
                />
        </div>
    </div>
  )
}

export default FormField