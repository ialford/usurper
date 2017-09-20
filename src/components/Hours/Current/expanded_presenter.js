import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import WeeklyHours from '../WeeklyHours'


const Presenter = (hoursEntry, isOpen, collapseHandler, children) => {
  const title = 'Hours for ' + hoursEntry.name
  const servicePointClassName = 'service-point ' + (isOpen ? 'open' : 'closed')
  const todayLabel = 'Today: ' + hoursEntry.today.rendered

  let timezoneMessage = ''
  if (hoursEntry.timezone !== 'EST' || hoursEntry.timezone !== 'EDT') {
    timezoneMessage = (<p className='timezoneMessage'> * All times are {hoursEntry.timezone}</p>)
  }
  return (
    <section className={servicePointClassName} aria-label={title}>
      <a
        className='collapse'
        tabIndex={0}
        onClick={collapseHandler}
        onKeyDown={collapseHandler}
        aria-expanded={true}
        aria-controls={hoursEntry.servicePoint.slug}
      >
        <h4>
          <div className='location' itemProp='name'>{hoursEntry.name}</div>
          <div className='today' itemProp='openingHours' content={hoursEntry.today.schemaOpeningHours}>{todayLabel}</div>
          <div className='arrow'>
            <div className='carrow' />
          </div>
        </h4>
      </a>
      <div className='row hours-listing' id={hoursEntry.servicePoint.slug}>
        <div className='col-md-6'>
          <WeeklyHours hours={hoursEntry.weeks[0]} title='Current Hours' showEffectiveDates={false} />
          <WeeklyHours hours={hoursEntry.upcomingChangedHours} title='Upcoming Hours' showEffectiveDates />
          { timezoneMessage }
        </div>
        <div className='col-md-5 col-md-offset-1'>
          {children}
        </div>
      </div>
    </section>
  )
}

Presenter.propTypes = {
  hoursEntry: PropTypes.object.isRequired,
}

export default Presenter
