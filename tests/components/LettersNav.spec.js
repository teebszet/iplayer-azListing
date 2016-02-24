import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { bindActionCreators } from 'redux'
import { LettersNav } from 'components/LettersNav'
import { mount } from 'enzyme'

function shallowRender (component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

function renderWithProps (props = {}) {
  return TestUtils.renderIntoDocument(<LettersNav {...props} />)
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<LettersNav {...props} />)
}

describe('(Component) LettersNav', function () {
  let _component, _rendered, _props, _spies

  beforeEach(function () {
    _spies = {}
    _props = {
      ...bindActionCreators({
        onClick: (_spies.onClick = sinon.spy()),
      }, _spies.dispatch = sinon.spy())
    }

    _component = shallowRenderWithProps(_props)
    _rendered = renderWithProps(_props)
  })

  it('should render as a <ul>.', function () {
    expect(_component.type).to.equal('ul')
  })

  describe('An <a href> item', function () {
    let _href

    beforeEach(() => {
      _href = TestUtils.scryRenderedDOMComponentsWithTag(_rendered, 'a')[0]
    })

    it('should be rendered.', function () {
      expect(_href).to.exist
    })

    it('should dispatch an action when clicked.', function () {
      _spies.dispatch.should.have.not.been.called
      TestUtils.Simulate.click(_href)
      _spies.dispatch.should.have.been.called
    })
  })


})
