import React from 'react'
import PropTypes from 'prop-types'
import PageTitle from 'components/Layout/PageTitle'
import SearchProgramaticSet from 'components/SearchProgramaticSet'
import ServiceNowLink from 'components/Interactive/ServiceNowLink'
import { Helmet } from 'react-helmet'

const Error = ({ message = 'An error has occured' }) => (
  <div className={'Error'}>
    <SearchProgramaticSet open />
    <PageTitle title='Server Error' />
    <Helmet>
      <meta name='prerender-status-code' content='500' />
    </Helmet>
    <div className='notfound errored'>
      <h1>500</h1>
      <h2>Error</h2>
      <div>{ message }
        <br />
        If you think you've reached this page in error, please <ServiceNowLink>report your problem</ServiceNowLink>.
      </div>
    </div>
  </div>
)

Error.propTypes = {
  message: PropTypes.string,
}

export default Error
