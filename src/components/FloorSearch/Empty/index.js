import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchServicePoints } from 'actions/contentful/servicePoints'
import PresenterFactory from 'components/APIPresenterFactory'
import * as statuses from 'constants/APIStatuses'

import Presenter from './presenter'

const contactPoints = [
  {
    'title': 'Services and Offices',
    'points': [
      'circulationservicedesk',
    ],
  },
]

const mapStateToProps = (state) => {
  const points = {}

  if (state.cfServicePoints.status === statuses.SUCCESS) {
    state.cfServicePoints.json.map((entry) => {
      const point = entry.fields

      contactPoints.forEach((section) => {
        if (section.points.indexOf(point.slug) > -1) {
          points[point.slug] = entry
        }
      })
      return contactPoints
    })
  }

  return {
    servicePointsStatus: state.cfServicePoints.status,
    sections: contactPoints,
    points: points,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchServicePoints }, dispatch)
}

class FloorSearchEmptyContainer extends Component {
  componentDidMount () {
    if (this.props.servicePointsStatus === statuses.NOT_FETCHED) {
      const preview = (new URLSearchParams(this.props.location.search)).get('preview') === 'true'
      this.props.fetchServicePoints(preview)
    }
  }

  render () {
    return <PresenterFactory
      status={this.props.servicePointsStatus}
      presenter={Presenter}
      props={this.props}
    />
  }
}

FloorSearchEmptyContainer.propTypes = {
  fetchServicePoints: PropTypes.func,
  servicePointsStatus: PropTypes.string,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(FloorSearchEmptyContainer)
