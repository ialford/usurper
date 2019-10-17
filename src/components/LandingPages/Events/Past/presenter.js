import React from 'react'
import PropTypes from 'prop-types'

import DateFilter from './DateFilter'
import EventsWrapper from '../Wrapper'

const Presenter = (props) => {
  return (
    <EventsWrapper
      linkPath='/events'
      linkText='Current Events'
      pageTitle={props.pageTitle}
      pageDate={props.pageDate}
      events={props.events}
      filteredEvents={props.filteredEvents}
      location={props.location}
      history={props.history}
    >
      <DateFilter events={props.events} filterYear={props.filterYear} filterMonth={props.filterMonth} />
    </EventsWrapper>
  )
}

Presenter.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  pageDate: PropTypes.string,
  events: PropTypes.array.isRequired,
  filteredEvents: PropTypes.array.isRequired,
  filterYear: PropTypes.number,
  filterMonth: PropTypes.number,
  location: PropTypes.object,
  history: PropTypes.object,
}

export default Presenter
