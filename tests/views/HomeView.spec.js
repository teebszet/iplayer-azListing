import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { bindActionCreators } from 'redux'
import { HomeView } from 'views/HomeView/HomeView'
import { mount } from 'enzyme'

function shallowRender (component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

function renderWithProps (props = {}) {
  return TestUtils.renderIntoDocument(<HomeView {...props} />)
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<HomeView {...props} />)
}

describe('(View) Home', function () {
  let _component, _rendered, _props, _spies

  beforeEach(function () {
    _spies = {}
    _props = {
      // props
      letter: '',
      listingsItems: [],
      params: {letter: '/'},
      remainingListings: 0,
      ...bindActionCreators({
        // dispatch as props
        updateLetter: (_spies.updateLetter = sinon.spy()),
        updateLetterFromClick: (_spies.updateLetterFromClick = sinon.spy()),
        paginateLetter: (_spies.paginateLetter = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }

    _component = shallowRenderWithProps(_props)
    _rendered = renderWithProps(_props)
  })

  it('should render as a <div>.', function () {
    expect(_component.type).to.equal('div')
  })

  it('should include an <h1> with welcome text.', function () {
    const h1 = TestUtils.findRenderedDOMComponentWithTag(_rendered, 'h1')

    expect(h1).to.exist
    expect(h1.textContent).to.match(/iplayer a-z listings/i)
  })
})
