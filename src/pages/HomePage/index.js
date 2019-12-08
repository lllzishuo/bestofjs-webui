import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Home from '../../components/home/Home'
import * as uiActionCreators from '../../actions/uiActions'
import { getPopularTags, getHotProjects } from '../../selectors'

const HomePage = ({
  hotProjects,
  auth,
  uiActions,
  ui,
  authActions,
  popularTags,
  pending,
  error
}) => {
  return (
    <Home
      hotProjects={hotProjects}
      isLoggedin={auth.username !== ''}
      pending={auth.pending || pending}
      uiActions={uiActions}
      authActions={authActions}
      hotFilter={ui.hotFilter}
      showMetrics={ui.showMetrics}
      viewOptions={ui.viewOptions}
      popularTags={popularTags}
      error={error}
    />
  )
}

function mapStateToProps(state, { count = 5 }) {
  const { auth, ui } = state
  const hot = getHotProjects(count)(state)
  const popularTags = getPopularTags(state)
  const { pending, error } = state.entities.meta
  return {
    hotProjects: hot,
    popularTags,
    auth,
    ui,
    pending,
    error
  }
}

function mapDispatchToProps(dispatch) {
  return {
    uiActions: bindActionCreators(uiActionCreators, dispatch),
    authActions: {}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)
