/* @flow */
import React, { PropTypes } from 'react'
import { Link } from 'react-router'

// Flow types here
type Props = {
  onClick: Function
}

// TODO get these from the API and store as state (possible unicode characters?)
const az = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0-9']

// stupid dumb component...
export class LettersNav extends React.Component<void, Props, void> {
  static propTypes = {
    onClick: PropTypes.func.isRequired
  };

  render () {
    return (
      <ul>
        {az.map((e) =>
          <li key={e}>
            <Link
              to={`/${e}`}
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
