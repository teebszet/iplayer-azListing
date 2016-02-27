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
  updateLetter: Function,
  paginateLetter: Function
}

// declare component
export class HomeView extends React.Component<void, Props, void> {
  static propTypes = {
    letter: PropTypes.string.isRequired,
    listingsItems: PropTypes.array.isRequired,
    updateLetterFromClick: PropTypes.func.isRequired,
    updateLetter: PropTypes.func.isRequired,
    paginateLetter: PropTypes.func.isRequired,
    params: PropTypes.object
  };

  componentDidMount() {
    if (this.props.params.letter !== this.props.letter) {
      this.props.updateLetter(this.props.params.letter)
    }
  }

  render () {
    return (
      <div className='container'>
        <h1>iPlayer A-Z Listings</h1>
        <div className='row'>
          <div className='col-md-2'>
            <LettersNav onClick={this.props.updateLetterFromClick} />
          </div>
          <div className='col-md-10'>
            <ListingsCards listingsItems={this.props.listingsItems} />
            <button type='button' onClick={this.props.paginateLetter}>
              ...more
            </button>
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
const mapDispatchToProps = (dispatch, ownProps) => ({
  updateLetterFromClick: ({target: {id: letter}}) => {
    dispatch(updateLetter(letter))
    dispatch(fetchListingsIfNeeded(letter))
  },
  updateLetter: (letter) => {
    dispatch(updateLetter(letter))
    dispatch(fetchListingsIfNeeded(letter))
  },
  paginateLetter: () => {
    console.log('paginateLetter called', ownProps.params.letter)
    const paginate = true
    dispatch(fetchListingsIfNeeded(ownProps.params.letter, paginate))
  }
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeView)
