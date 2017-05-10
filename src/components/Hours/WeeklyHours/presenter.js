import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import { Link } from 'react-router-dom'
import WeeklyHoursList from '../WeeklyHoursList'
import * as statuses from '../../../constants/APIStatuses'

const Loading = (
  <span>loading</span>
)
const Loaded = (hoursEntry) => (
  <div className="service-point">
    <h4>{ hoursEntry.name }</h4>
    <WeeklyHoursList hours={ hoursEntry.thisWeek } title="Current Hours" showEffectiveDates={false} />
    <WeeklyHoursList hours={ hoursEntry.upcomingDifferentHours } title="Current Hours" showEffectiveDates={true} />
    <hr />
  </div>
)
const ErrorLoading = (
  <span>Error</span>
)
const NotFound = (
  <span>Not Found</span>
)

const Presenter = ({ hoursEntry, jsonHoursApiKey }) => {
  switch(hoursEntry.status) {
    case statuses.FETCHING:
      return Loading;
    case statuses.SUCCESS:
      let hours = hoursEntry.json[jsonHoursApiKey];
      if (hours) {
        return Loaded(hours);
      } else {
        return NotFound;
      }
    default:
      return ErrorLoading
  }
}

Presenter.propTypes = {
  jsonHoursApiKey: PropTypes.string.isRequired
}

export default Presenter