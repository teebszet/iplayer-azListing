/* @flow */
import React, { PropTypes } from 'react'

export const MoreButton = ({onClick, count = 20}) => {
  return (
    <button type='button' className='button-action pull-right' onClick={onClick}>
      {count} more programmes
    </button>
  )
}
MoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  count: PropTypes.number
}
