/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateLetter } from '../../redux/modules/letters'

// Flow types here
type Props = {
  letter: string,
  updateLetter: Function
};

// declare component as a stateless function
export class HomeView extends React.Component<void, Props, void> {
  static propTypes = {
    letter: PropTypes.string.isRequired,
    updateLetter: PropTypes.func.isRequired
  };

  render () {
    return (
      <div className='container'>
        <h1>iPlayer A-Z Listings</h1>
      </div>
    )
  }
}

// connect component to store
const mapStateToProps = (state) => ({
  letter: state.letter
})
const mapDispatchToProps = (dispatch) => ({
  updateLetter: () => updateLetter
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeView)
