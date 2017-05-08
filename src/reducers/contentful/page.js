import { CF_REQUEST_PAGE, CF_RECEIVE_PAGE, CF_NO_SUCH_PAGE } from '../../actions/contentful'

export default(state = { status: 'fetching' }, action) => {
  switch (action.type) {
    case CF_REQUEST_PAGE:
      return Object.assign({}, state, {
        status: 'fetching'
      })
    case CF_RECEIVE_PAGE:
      return Object.assign({}, state, {
        status: action.status,
        json: action.page
      })
    case CF_NO_SUCH_PAGE:
      return Object.assign({}, state, {
        status: action.status
      })
    default:
      return state
  }
}
