import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { bindActionCreators } from 'redux'
import { ListingsCards } from 'components/ListingsCards'
import { mount } from 'enzyme'

function shallowRender (component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

function renderWithProps (props = {}) {
  return TestUtils.renderIntoDocument(<ListingsCards {...props} />)
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<ListingsCards {...props} />)
}

describe('(Component) ListingsCards', function () {
  let _component, _rendered, _props, _spies

  beforeEach(function () {
    _spies = {}
    _props = {
      listingsItems: [],
      ...bindActionCreators({
        onClick: (_spies.onClick = sinon.spy()),
      }, _spies.dispatch = sinon.spy())
    }

    _component = shallowRenderWithProps(_props)
    _rendered = renderWithProps(_props)
  })

  it('should render as a <div>.', function () {
    expect(_component.type).to.equal('div')
  })
})
