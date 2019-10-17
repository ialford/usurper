import React from 'react'
import PropTypes from 'prop-types'

import Tags from 'components/Interactive/Tags'
import * as helper from 'constants/HelperFunctions'

import parentStyles from '../style.module.css'

const ActiveFiltersList = (props) => {
  const sortedList = helper.sortList(props.subjects, 'linkText', 'asc')
  return (
    <div className={parentStyles.activeFilters}>
      { props.letter && (
        <div>
          <span className={parentStyles.activeFiltersLabel}>Name Starts With:</span>
          <Tags
            items={[
              {
                key: props.letter,
                value: props.letter.toUpperCase(),
              },
            ]}
            onClick={props.removeLetterFilter}
            inline
            hasRemove
          />
        </div>
      )}
      { props.subjects.length > 0 && (
        <div>
          <span className={parentStyles.activeFiltersLabel}>Active Subject Filters:</span>
          <Tags
            items={sortedList.map(subject => ({
              key: subject.sys.id,
              value: subject.linkText,
            }))}
            onClick={(pair) => props.removeSubjectFromFilter(pair.key)}
            inline
            hasRemove
          />
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
