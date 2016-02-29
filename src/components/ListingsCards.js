/* @flow */
import React, { PropTypes } from 'react'
import { isEmpty } from 'lodash'

// Flow types here
type Props = {
  listingsItems: Array
};

export const Row = ({children}) =>
  <div className='row'>{children}</div>

export const Card = ({item: {image, title}}) => {
  return (
    <div className='col-sm-12 col-md-4 col-ld-3'>
      <div className='thumbnail'>
        <img className='img-responsive' src={image} alt={title} />
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

  createListingsCards () {
    return this.props.listingsItems
      .map((item) => {
        item.image = this.pickImageSize(item.image)
        return <Card item={item} key={item.id}/>
      })
  }

  createCardRows () {
    if (!isEmpty(this.props.listingsItems)) {
      const cards = this.createListingsCards()
      let rows = []
      let row = cards.splice(0, 3)
      while (!isEmpty(row)) {
        rows.push(<Row children={row} key={rows.length}/>)
        row = cards.splice(0, 3)
      }
      return rows
    }
  }

  render () {
    return (
      <div>
        {this.createCardRows()}
      </div>
    )
  }
}
