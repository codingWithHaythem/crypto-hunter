import React from 'react'

const SelectButton = ({children, onClick, selected}) => {
  return (
    <span
    onClick = {onClick}
    className='button'>{children}</span>
  )
}

export default SelectButton