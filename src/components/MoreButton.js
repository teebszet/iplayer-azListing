/* @flow */
import React, { PropTypes } from 'react'

export const MoreButton = ({onClick}) => {
  const x = 20 // TODO implement this
  return (
    <button type='button' className='button-action pull-right' onClick={onClick}>
      {x} more programmes
    </button>
  )
}
MoreButton.propTypes = {
  onClick: PropTypes.func.isRequired
}
