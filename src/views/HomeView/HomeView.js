/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateLetter } from '../../redux/modules/letters'
import { fetchListingsIfNeeded } from '../../redux/modules/listingsData'
import { LettersNav } from '../../components/LettersNav'
import { ListingsCards } from '../../components/ListingsCards'

// Flow types here
type Props = {
  letter: string,
  listingsItems: Array,
  updateLetter: Function
}

// declare component
export class HomeView extends React.Component<void, Props, void> {
  static propTypes = {
    letter: PropTypes.string.isRequired,
    listingsItems: PropTypes.array.isRequired,
    updateLetter: PropTypes.func.isRequired
  };

  render () {
    return (
      <div className='container'>
        <h1>iPlayer A-Z Listings</h1>
        <div className='row'>
          <div className='col-md-2'>
            <LettersNav onClick={this.props.updateLetter} />
          </div>
          <div className='col-md-10'>
            <ListingsCards
              listingsItems={this.props.listingsItems}
            />
          </div>
        </div>
      </div>
    )
  }
}

// connect component to store
const mapStateToProps = (state) => ({
  letter: state.letter,
  listingsItems: state.letter ? state.listingsData[state.letter].items : []
})
const mapDispatchToProps = (dispatch) => ({
  updateLetter: ({target: {id: letter}}) => {
    dispatch(updateLetter(letter))
    dispatch(fetchListingsIfNeeded(letter))
  }
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeView)
