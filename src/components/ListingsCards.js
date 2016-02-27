/* @flow */
import React, { PropTypes } from 'react'
import { isEmpty } from 'lodash'

// Flow types here
type Props = {
  listingsItems: Array
};

export const Card = ({item: {image, title}}) => {
  return (
    <div className='col-sm-6 col-md-4'>
      <div className='thumbnail'>
        <img src={image} alt={title} />
        <div className='caption'>
          <h4>{title}</h4>
        </div>
      </div>
    </div>
  )
}

export class ListingsCards extends React.Component<void, Props, void> {
  static propTypes = {
    listingsItems: PropTypes.array.isRequired
  };

  pickImageSize (image) {
    return image.replace('{recipe}', '406x228')
  }

  displayListingsCards () {
    if (!isEmpty(this.props.listingsItems)) {
      const listings = this.props.listingsItems
        .map((item) => {
          item.image = this.pickImageSize(item.image)
          return <Card item={item} key={item.id}/>
        })
      // console.log(listings)
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
