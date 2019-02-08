import React from 'react';

const Button = (props) => {
  const {size, color, children} = props
  const sizeClass = size ? `btn-${size}` : ''

  return (
    <button
      className={`btn btn-${color} ${sizeClass}`}
    >
      {children}
    </button>
  )
}

export default Button;