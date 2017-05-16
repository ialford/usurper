// Container component for a Page content type from Contentful
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPage, clearPage } from '../../../actions/contentful/page'
import PresenterFactory from '../../APIPresenterFactory'
import ContentfulPagePresenter from './presenter.js'
import * as statuses from '../../../constants/APIStatuses'

const mapStateToProps = (state, ownProps) => {
  return { cfPageEntry: state.cfPageEntry }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchPage, clearPage }, dispatch)
}

export class ContentfulPageContainer extends Component {
  componentDidMount () {
    let pageSlug = this.props.match.params.id
    this.props.fetchPage(pageSlug)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.cfPageEntry.status === statuses.SUCCESS
      && nextProps.cfPageEntry.json.fields.requiresLogin) {
      this.props.clearPage()
      this.props.history.push('/secure/' + nextProps.match.params.id)
    }
  }

  render () {
    return <PresenterFactory
              presenter={ ContentfulPagePresenter }
              status={ this.props.cfPageEntry.status }
              props={ {cfPageEntry: this.props.cfPageEntry.json} } />
  }
}

const ContentfulPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentfulPageContainer)

export default ContentfulPage
