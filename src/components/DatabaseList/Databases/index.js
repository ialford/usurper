import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'

import DatabaseSummary from './DatabaseSummary'
import BestBets from './BestBets'

import styles from '../style.module.css'

const Databases = (props) => {
  const noResultsMessage = props.filterValue
    ? `No results found matching "${props.filterValue}" with current filters.`
    : `No results found with current filters.`
  const filteredList = props.list.filter((item) => {
    if (!props.subjectFilter.length) {
      return true
    }
    return item.fields.subjects.some(fullSubject => props.subjectFilter.includes(fullSubject.sys.id))
  })
  const nonBestBets = filteredList.filter(db => {
    return !typy(db.fields, 'bestBets').safeArray.some(search => props.subjectFilter.some(subject => subject === search.sys.id))
  })

  return (
    <section aria-label='List of databases' className={styles.dbList}>
      <BestBets databases={filteredList} subjects={props.subjects} subjectFilter={props.subjectFilter} onSubjectFilterApply={props.onSubjectFilterApply} />
      { filteredList.length
        ? nonBestBets.map((item) => (
          <DatabaseSummary key={item.sys.id} item={item} onSubjectFilterApply={props.onSubjectFilterApply} />
        ))
        : noResultsMessage
      }
    </section>
  )
}

Databases.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    sys: PropTypes.shape({
      id: PropTypes.string,
    }),
    fields: PropTypes.shape({
      subjects: PropTypes.array,
      bestBets: PropTypes.array,
    }).isRequired,
  })).isRequired, // NOTE: These should be pre-filtered
  filterValue: PropTypes.string,
  subjects: PropTypes.array,
  subjectFilter: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubjectFilterApply: PropTypes.func,
}

export default Databases
