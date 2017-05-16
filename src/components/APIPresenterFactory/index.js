// Really not sure what to call this. It's supposed to be a reusable presenter component
// that handles rendering of the appropriate presenter based on an API request status. At
// the moment, we only really expect to use this for main landing pages that rely on content
// from an API like contentful, but we may find other objects follow a similar pattern.
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NotFound from '../Messages/NotFound'
import Loading from '../Messages/Loading'
import Error from '../Messages/Error'
import * as statuses from '../../constants/APIStatuses'

class APIPresenterFactory extends Component {
  render () {
    switch(this.props.status) {
      case statuses.NOT_FETCHED:
      case statuses.FETCHING:
        return <Loading/>
      case statuses.SUCCESS:
        return this.props.presenter(this.props.props)
      case statuses.NOT_FOUND:
        return <NotFound/>
      default:
        return <Error message={ 'There was an error loading the page.' }/>
    }
  }
}

APIPresenterFactory.propTypes = {
  presenter: PropTypes.func.isRequired, // The presenter to render when status === success
  status: PropTypes.string.isRequired,  // The current API status code
  props: PropTypes.object.isRequired,   // The props to pass to the given presenter when status === success
}

export default APIPresenterFactory
