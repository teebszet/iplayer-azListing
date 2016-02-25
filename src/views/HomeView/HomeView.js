/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateLetter } from '../../redux/modules/letters'
import { LettersNav } from '../../components/LettersNav'
import { ListingsCards } from '../../components/ListingsCards'

// Flow types here
type Props = {
  letter: string,
  listingsData: Object,
  updateLetter: Function
}

// declare component as a stateless function
export class HomeView extends React.Component<void, Props, void> {
  static propTypes = {
    letter: PropTypes.string.isRequired,
    listingsData: PropTypes.object.isRequired,
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
            <ListingsCards listingsData={this.props.listingsData} />
          </div>
        </div>
      </div>
    )
  }
}

// connect component to store
const mapStateToProps = (state) => ({
  letter: state.letter,
  listingsData: state.listingsData
})
const mapDispatchToProps = (dispatch) => ({
  updateLetter: ({target: {id: letter}}) => {
    dispatch(updateLetter(letter))
  }
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeView)
