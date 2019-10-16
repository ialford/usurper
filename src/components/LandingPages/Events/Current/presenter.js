import React from 'react'
import PropTypes from 'prop-types'

import Calendar from './Calendar'
import EventsWrapper from '../Wrapper'
import Facet from 'components/Interactive/Facet'

import Config from 'shared/Configuration'

// These should exactly match the validations in the Contentful model
const AUDIENCES = [
  'Undergraduates',
  'Graduate Students',
  'Faculty',
  'Staff',
  'Postdocs',
  'Public, Alumni, & Friends',
].map(value => ({ // Facet expects key value pairs, but in this case the display value and key are the same
  key: value,
  value: value,
}))

const Presenter = (props) => {
  return (
    <EventsWrapper
      linkPath={props.pageDate ? '/events' : '/events/past'}
      linkText={props.pageDate ? 'Current Events' : 'Past Events'}
      pageTitle={props.pageTitle}
      pageDate={props.pageDate}
      events={props.events}
      filteredEvents={props.filteredEvents}
    >
      <div className='col-md-4 col-sm-5 col-xs-12 right'>
        <Calendar events={props.events} history={props.history} match={props.match} />
        { Config.features.subjectFilteringEnabled && (
          <Facet
            label='Audience'
            options={AUDIENCES}
            selectedValues={props.audienceFilter}
            onChangeCallback={props.onAudienceFilterApply}
          />
        )}
      </div>
    </EventsWrapper>
  )
}

Presenter.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  pageDate: PropTypes.string,
  events: PropTypes.array.isRequired,
  filteredEvents: PropTypes.array.isRequired,
  onAudienceFilterApply: PropTypes.func.isRequired,
  audienceFilter: PropTypes.array,
  history: PropTypes.object,
  match: PropTypes.object,
}

export default Presenter
