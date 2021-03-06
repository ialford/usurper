import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'

import Presenter from './presenter'
import { dayOrder, months } from 'constants/hours'

const WeeklyHours = (props) => {
  return <Presenter
    hours={props.hours ? groupedByKeys(props.hours) : []}
    title={props.title}
    effectiveDate={effectiveDates(typy(props, `hours[${dayOrder[0]}].date`).safeString)}
    showEffectiveDates={props.showEffectiveDates}
  />
}

const groupedByKeys = (hours) => {
  const rows = []
  if (!typy(hours).isEmptyObject) {
    let startKey = dayOrder[0]
    let currentKey
    let nextKey
    for (let step = 0; step < dayOrder.length; step++) {
      currentKey = dayOrder[step]
      nextKey = dayOrder[step + 1]
      if (typeof nextKey === 'undefined' || hours[currentKey].rendered !== hours[nextKey].rendered) {
        rows.push({
          title: (currentKey === startKey) ? currentKey : `${startKey} – ${currentKey}`,
          rendered: hours[currentKey].rendered,
        })

        startKey = nextKey
      }
    }
  }
  return rows
}

const effectiveDates = (startDate) => {
  const getDate = (dateString) => {
    const date = new Date(dateString + 'T23:59:59')
    return dayOrder[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + date.getDate()
  }
  return startDate ? getDate(startDate) : ''
}

WeeklyHours.propTypes = {
  hours: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  showEffectiveDates: PropTypes.bool.isRequired,
}

export default WeeklyHours
