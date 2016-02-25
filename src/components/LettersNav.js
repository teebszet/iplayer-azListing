/* @flow */
import React, { PropTypes } from 'react'
import { Link } from 'react-router'

// Flow types here
type Props = {
  updateLetter: Function
}

// TODO get these from the API
const az = ['a', 'b', 'c', 'd']
// stupid dumb component...
export class LettersNav extends React.Component<void, Props, void> {
  static propTypes = {
    onClick: PropTypes.func.isRequired
  }

  render () {
    return (
      <ul>
        {az.map((e) =>
          <li key={e}>
            <Link
              to={`/listings/${e}`}
              onClick={this.props.onClick}
              id={e}>
              {e.toUpperCase()}
            </Link>
          </li>
        )}
      </ul>
    )
  }
}
