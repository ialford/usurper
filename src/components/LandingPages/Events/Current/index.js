import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import typy from 'typy'

import Presenter from './presenter'

import { fetchAllEvents } from 'actions/contentful/allEvents'
import * as statuses from 'constants/APIStatuses'
import * as helper from 'constants/HelperFunctions'

export class CurrentEventsContainer extends Component {
  constructor (props) {
    super(props)

    this.onAudienceFilterApply = this.onAudienceFilterApply.bind(this)
  }

  componentDidMount () {
    const preview = (new URLSearchParams(this.props.location.search)).get('preview') === 'true'
    if (this.props.allEventsStatus === statuses.NOT_FETCHED) {
      this.props.fetchAllEvents(preview)
    }
  }

  onAudienceFilterApply (selection) {
    const queryString = helper.buildQueryString(this.props.location.search, 'audience', selection)
    this.props.history.push(this.props.location.pathname + queryString)
  }

  render () {
    return <Presenter
      {...this.props}
      onAudienceFilterApply={this.onAudienceFilterApply}
    />
  }
}

export const mapStateToProps = (state, ownProps) => {
  const { allEvents } = state
  // Check for date filter
  const dateString = ownProps.match.params.date || ''
  const hasFilter = !!(dateString.match(/^\d{8}$/))

  let pageTitle = 'Current Events'
  let pageDate

  if (hasFilter) {
    pageTitle = `Events on ${moment(dateString, 'YYYYMMDD').format('MMM Do YYYY')}`
    pageDate = dateString
  }

  const now = new Date()
  const events = typy(state, 'allEvents.json').safeArray.filter(entry => {
    if (entry && entry.startDate && entry.endDate) {
      return entry.startDate >= now || entry.endDate >= now
    }
    return false
  })
  const filteredEvents = hasFilter ? events.filter(entry => {
    const start = moment(entry.startDate).format('YYYYMMDD')
    const end = moment(entry.endDate).format('YYYYMMDD')
    return start === dateString || end === dateString || (start < dateString && end >= dateString)
  }) : events

  // Get audience filter
  const audienceFilter = []
  const queryParams = ownProps.location.search.replace('?', '').split('&')
  queryParams.forEach(param => {
    const split = decodeURIComponent(param).split('=')
    if (split[0].toLowerCase() === 'audience') {
      audienceFilter.push(split[1])
    }
  })

  return {
    pageTitle,
    pageDate,
    hasFilter,
    events,
    filteredEvents,
    allEventsStatus: allEvents.status,
    audienceFilter,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchAllEvents }, dispatch)
}

CurrentEventsContainer.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  pageDate: PropTypes.string,
  hasFilter: PropTypes.bool,
  events: PropTypes.array.isRequired,
  filteredEvents: PropTypes.array.isRequired,
  allEventsStatus: PropTypes.string.isRequired,
  fetchAllEvents: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    pathname: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

const CurrentEvents = connect(mapStateToProps, mapDispatchToProps)(CurrentEventsContainer)

export default CurrentEvents
