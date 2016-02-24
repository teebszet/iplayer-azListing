import React from 'react'
import { Route, IndexRoute } from 'react-router'

import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import HomeView from 'views/HomeView/HomeView'

// we have store for hookables on the route
export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
  </Route>
)
