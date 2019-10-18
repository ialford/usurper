import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'

import LibMarkdown from 'components/LibMarkdown'
import Image from 'components/Image'
import Link from 'components/Interactive/Link'
import Tags from 'components/Interactive/Tags'

import styles from './style.module.css'

const EventCard = ({ entry, isLast, showDescription, showImage, showTags, onTagClick }) => {
  return (
    <div className='event-card' itemScope itemType='http://schema.org/Event'>
      <Link
        ariaLabel={entry.title + ' on ' + entry.displayDate + ' at ' + entry.displayTime}
        to={'/event/' + entry.slug}
        itemProp='mainEntityOfPage'
      >
        <meta itemProp='startDate' content={entry.startDate} />
        <meta itemProp='endDate' content={entry.endDate} />
        <div itemProp='location' itemScope itemType='http://schema.org/Place' hidden>
          <meta itemProp='address' content={entry.locationText} />
        </div>
        { showImage && (
          <Image cfImage={entry.representationalImage} className='card-image' itemProp='image' />
        )}
        <div className='date'>
          {entry.displayDate}
        </div>
        { entry.displayTime && (
          <div className='time'>
            {entry.displayTime}
          </div>
        )}
        <h2 itemProp='name'>{entry.title}</h2>
        { entry.type && (
          <div className={styles.eventType}>{entry.type}</div>
        )}

        { showDescription && (
          <div className='description' itemProp='description'>
            <LibMarkdown>{entry.shortDescription}</LibMarkdown>
          </div>
        )}
      </Link>
      { showTags && (
        <Tags
          items={typy(entry.audience).safeArray.map(displayName => ({
            key: displayName,
            value: displayName,
          }))}
          onClick={(pair) => onTagClick('audience', [ pair.key ])}
          ariaLabel='audience'
        />
      )}
      { !isLast && <hr /> }
    </div>
  )
}

EventCard.propTypes = {
  entry: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    shortDescription: PropTypes.string,
    displayDate: PropTypes.string,
    displayTime: PropTypes.string,
    locationText: PropTypes.string,
    representationalImage: PropTypes.object,
    audience: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string,
  }).isRequired,
  isLast: PropTypes.bool,
  showDescription: PropTypes.bool,
  showImage: PropTypes.bool,
  showTags: PropTypes.bool,
  onTagClick: PropTypes.func,
}

EventCard.defaultProps = {
  isLast: false,
  showDescription: true,
  showImage: true,
  showTags: true,
}

export default EventCard
