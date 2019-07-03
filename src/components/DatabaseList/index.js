// Container component for a Page content type from Contentful
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import typy from 'typy'
import { fetchSubjects } from 'actions/contentful/subjects'
import { fetchLetter } from 'actions/contentful/database'
import ListPresenter from './presenter.js'
import * as statuses from 'constants/APIStatuses'
import * as helper from 'constants/HelperFunctions'
import PageNotFound from 'components/Messages/NotFound'

import getToken from 'actions/personal/token'
import { getFavorites, KIND as FAVORITES_KIND } from 'actions/personal/favorites'

import Config from 'shared/Configuration'

const alphabet = 'abcdefghijklmnopqrstuvwxyz#'.split('')
// dont allow going to /foo or /1 etc
const routeValid = (letter) => (letter && letter.length === 1 && alphabet.includes(letter))

// Concat all database letters into one big list for searching
const concatDbs = (raw) => {
  let out = []
  alphabet.forEach((letter) => {
    if (raw[letter] && raw[letter].data) {
      out = out.concat(raw[letter].data)
    }
  })
  return out
}

// sort all letters by title alphabetically
const sortDbs = (raw) => {
  const out = {}
  if (raw) {
    alphabet.forEach((letter) => {
      out[letter] = {
        ...raw[letter],
        data: helper.sortList(typy(raw[letter], 'data').safeArray, 'fields.title', 'asc'),
      }
    })
  }
  return out
}

export class DatabaseListContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      filterValue: '',
      filteredList: [],
      assistText: '',
    }

    this.onFilterChange = this.onFilterChange.bind(this)
    this.onSubjectFilterApply = this.onSubjectFilterApply.bind(this)
    this.checkFullyLoaded = this.checkFullyLoaded.bind(this)
  }

  checkFullyLoaded () {
    const preview = (new URLSearchParams(this.props.location.search)).get('preview') === 'true'

    if (!this.props.login || this.props.login.state === statuses.NOT_FETCHED) {
      this.props.getToken()
    }
    if (this.props.login && this.props.login.token && this.props.favoritesStatus === statuses.NOT_FETCHED) {
      this.props.getFavorites(FAVORITES_KIND.databases)
    }
    if (Config.features.subjectFilteringEnabled && this.props.cfSubjects.status === statuses.NOT_FETCHED) {
      this.props.fetchSubjects(preview)
    }
    // Subjects are needed before fetching databases because the databases depend on it
    if (this.props.cfSubjects.status === statuses.SUCCESS || !Config.features.subjectFilteringEnabled) {
      alphabet.forEach(letter => {
        const letterStatus = typy(this.props.cfDatabases, `${letter}.status`).safeString || statuses.NOT_FETCHED
        if (letterStatus === statuses.NOT_FETCHED) {
          this.props.fetchLetter(letter, preview)
        }
      })
    }
  }

  componentDidMount () {
    this.checkFullyLoaded()
  }

  componentDidUpdate () {
    this.checkFullyLoaded()
  }

  componentWillReceiveProps (nextProps) {
    const slug = this.props.match.params.id
    const nextSlug = nextProps.match.params.id
    if (slug !== nextSlug) {
      this.setState({
        filterValue: '',
      })
    } else {
      this.setState({
        filteredList: this.filter(this.state.filterValue, nextProps.allDbs),
      })
    }
  }

  filter (filterValue, list) {
    const value = filterValue.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`'~()]/g, '')
    return helper.filterList(list, 'searchBlob', value).slice(0, 50)
  }

  onFilterChange (event) {
    const filtered = this.filter(event.target.value, this.props.allDbs)
    const assistText = event.target.value
      ? `${filtered.length} results found for "${event.target.value}"`
      : `${filtered.length} items beginning with "${this.props.currentLetter.toUpperCase()}"`

    this.setState({
      filterValue: event.target.value,
      filteredList: filtered,
      assistText: assistText,
    })

    setTimeout(() => {
      this.setState({
        assistText: '',
      })
    }, 1500)
  }

  onSubjectFilterApply (selection) {
    let queryString = ''
    if (Array.isArray(selection)) {
      selection.forEach((subject, index) => {
        queryString += index === 0 ? '?' : '&'
        queryString += `subject=${encodeURIComponent(subject.sys.id)}`
      })
    }

    // Add any query parameters that were already part of the url besides subject filters
    const oldQuery = this.props.location.search.replace('?', '').split('&')
    oldQuery.forEach(item => {
      const pair = item.split('=')
      if (pair[0].toLowerCase() !== 'subject') {
        queryString += `${queryString.length ? '&' : '?'}${pair[0]}=${pair[1]}`
      }
    })

    this.props.history.push(this.props.location.pathname + queryString)
  }

  shouldComponentUpdate (nextProps, nextState) {
    const currentStatusChanged = (this.props.currentLetter !== nextProps.currentLetter ||
      this.props.allLettersStatus !== nextProps.allLettersStatus)
    const oldLetterStatus = typy(this.props, 'cfDatabases[this.props.currentLetter].status').safeString
    const newLetterStatus = typy(nextProps, 'cfDatabases[this.props.currentLetter].status').safeString
    const letterStatusChanged = oldLetterStatus && oldLetterStatus !== newLetterStatus
    const filterChanged = this.state.filterValue !== nextState.filterValue
    const subjectsChanged = JSON.stringify(this.props.activeSubjects) !== JSON.stringify(nextProps.activeSubjects)

    return currentStatusChanged || letterStatusChanged || filterChanged || subjectsChanged
  }

  render () {
    const letter = this.props.currentLetter
    if (!routeValid(letter)) {
      return <PageNotFound />
    }

    let status = typy(this.props, `cfDatabases[${letter}].status`).safeString || statuses.FETCHING
    let data = typy(this.props, `cfDatabases[${letter}].data`).safeArray
    if (this.state.filterValue) {
      status = this.props.allLettersStatus
      data = this.state.filteredList
    }

    return <ListPresenter
      list={data}
      letter={letter}
      status={status}
      filterValue={this.state.filterValue}
      onFilterChange={this.onFilterChange}
      assistText={this.state.assistText}
      subjects={typy(this.props.cfSubjects, 'data').safeArray}
      activeSubjects={this.props.activeSubjects}
      onSubjectFilterApply={this.onSubjectFilterApply}
      history={this.props.history}
    />
  }
}

export const mapStateToProps = (state, thisProps) => {
  const { personal, favorites, cfSubjects } = state

  // get a status for all letters, either error, fetching or success (not found || success = success)
  const allLettersStatus = helper.reduceStatuses([
    ...alphabet.map((letter) => typy(state.cfDatabases[letter], 'status').safeString || statuses.NOT_FETCHED),
    cfSubjects.status,
  ])
  const queryParams = decodeURIComponent(thisProps.location.search.replace('?', '')).split('&')
  const activeSubjects = []
  queryParams.forEach(param => {
    const split = param.split('=')
    if (split[0].toLowerCase() === 'subject') {
      activeSubjects.push(split[1])
    }
  })

  return {
    cfDatabases: sortDbs(state.cfDatabases),
    cfSubjects: cfSubjects,
    allLettersStatus: allLettersStatus,
    allDbs: allLettersStatus === statuses.SUCCESS ? concatDbs(state.cfDatabases) : [],
    currentLetter: decodeURIComponent(thisProps.match.params.id),
    login: personal.login,
    favoritesStatus: favorites[FAVORITES_KIND.databases].state,
    activeSubjects: activeSubjects,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchSubjects, fetchLetter, getToken, getFavorites }, dispatch)
}

DatabaseListContainer.propTypes = {
  fetchSubjects: PropTypes.func.isRequired,
  fetchLetter: PropTypes.func.isRequired,
  currentLetter: PropTypes.string.isRequired,
  cfDatabases: PropTypes.object.isRequired, // eslint-disable-line react/no-unused-prop-types
  cfSubjects: PropTypes.object.isRequired,
  allLettersStatus: PropTypes.string.isRequired,
  getToken: PropTypes.func,
  getFavorites: PropTypes.func,
  login: PropTypes.shape({
    state: PropTypes.string,
    token: PropTypes.string,
  }),
  favoritesStatus: PropTypes.string,
  activeSubjects: PropTypes.arrayOf(PropTypes.string),
  allDbs: PropTypes.array.isRequired,
  location: PropTypes.shape({
    search: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    pathname: PropTypes.string,
  }),
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  history: PropTypes.object,
}

const DatabaseList = connect(mapStateToProps, mapDispatchToProps)(DatabaseListContainer)
export default DatabaseList
