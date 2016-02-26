/* @flow */
import React, { PropTypes } from 'react'
import _ from 'lodash'

// Flow types here
type Props = {
  listingsData: Object
};

export class ListingsCards extends React.Component<void, Props, void> {
  static propTypes = {
    listingsData: PropTypes.object.isRequired
  };

  displayListingsCards () {
    if (!_.isEmpty(this.props.listingsData)) {
      return <pre>{JSON.stringify(this.props.listingsData)}</pre>
    }
    return
  }

  render () {
    return (
      <div>
        {this.displayListingsCards()}
      </div>
    )
  }
}
