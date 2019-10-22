import React from 'react'
import PropTypes from 'prop-types'

import * as helper from 'constants/HelperFunctions'

import parentStyles from '../style.module.css'
import clearIcon from 'static/images/clear-icon.svg'

const ActiveFiltersList = (props) => {
  const sortedList = helper.sortList(props.subjects, 'linkText', 'asc')
  return (
    <div className={parentStyles.activeFilters}>
      { props.letter && (
        <div>
          <span className={parentStyles.activeFiltersLabel}>Name Starts With:</span>
          <span
            className={parentStyles.itemTag}
            onClick={props.removeLetterFilter}
            title={`Click to remove filter: Starts with ${props.letter.toUpperCase()}`}
          >
            <img src={clearIcon} className={parentStyles.clearIcon} alt='X' />
            <span>{props.letter.toUpperCase()}</span>
          </span>
        </div>
      )}
      { props.subjects.length > 0 && (
        <div>
          <span className={parentStyles.activeFiltersLabel}>Active Subject Filters:</span>
          { sortedList.map(subject => (
            <span
              key={subject.sys.id}
              className={parentStyles.itemTag}
              onClick={() => props.removeSubjectFromFilter(subject.fields.id)}
              title={`Click to remove subject: ${subject.linkText}`}
            >
              <img src={clearIcon} className={parentStyles.clearIcon} alt='X' />
              <span>{subject.linkText}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

ActiveFiltersList.propTypes = {
  subjects: PropTypes.array.isRequired,
  letter: PropTypes.string,
  removeSubjectFromFilter: PropTypes.func.isRequired,
  removeLetterFilter: PropTypes.func.isRequired,
}

export default ActiveFiltersList
