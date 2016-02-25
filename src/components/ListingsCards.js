/* @flow */
import React, { PropTypes } from 'react'

// Flow types here
type Props = {
  listingsData: Object
};

export class ListingsCards extends React.Component<void, Props, void> {
  static propTypes = {
    listingsData: PropTypes.object.isRequired
  };

  render () {
    return (
      <div>
        listings cards
        <pre>{JSON.stringify(this.props.listingsData)}</pre>
      </div>
    )
  }
}
