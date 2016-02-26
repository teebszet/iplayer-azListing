/* @flow */
import React, { PropTypes } from 'react'
import { isEmpty } from 'lodash'

// Flow types here
type Props = {
  listingsData: Object
};

export const Image = (image) =>
  <img src={image} />

export const Content = (title) =>
  <h3>{title}</h3>

export const Card = ({image, title}) => {
  console.log(title)
  return (
    <div>
      {title}
    </div>
  )
}


export class ListingsCards extends React.Component<void, Props, void> {
  static propTypes = {
    listingsData: PropTypes.object.isRequired
  };

  displayListingsCards () {
    if (!isEmpty(this.props.listingsData)) {
      const listings = this.props.listingsData.items
        .map((item) => {
          return <Card item={item} />
          //return <div>hello</div>
        })
      console.log(listings)
      return listings
    }
  }

  render () {
    return (
      <div>
        {this.displayListingsCards()}
      </div>
    )
  }
}
