import Config from '../../shared/Configuration'
import * as states from './constants'
import * as statuses from '../../constants/APIStatuses'

const resourcesURL = Config.resourcesAPI + '/items/' // borrowed || pending

export const handleResources = (dispatch, data) => {
  if (data.checkedOut) {
    dispatch(
      states.recievePersonal(
        'resources_have',
        statuses.SUCCESS,
        {
          checkedOut: data.checkedOut,
          web: data.web,
        }
      )
    )
  } else {
    dispatch(
      states.recievePersonal(
        'resources_pending',
        statuses.SUCCESS,
        {
          pending: data.pending,
        }
      )
    )
  }
  dispatch(
    states.recievePersonal(
      'user',
      statuses.SUCCESS,
      data.user,
    )
  )
}

const getResources = () => {
  return (dispatch, getState) => {
    var state = getState().personal

    dispatch(states.requestPersonal('resources_pending'))
    states.startRequest(
      resourcesURL + 'pending',
      dispatch,
      handleResources,
      state.login.token,
      (e) => {
        dispatch(states.recievePersonal('resources_pending', statuses.ERROR, e.message))
      })

    dispatch(states.requestPersonal('resources_have'))
    states.startRequest(
      resourcesURL + 'borrowed',
      dispatch,
      handleResources,
      state.login.token,
      (e) => {
        dispatch(states.recievePersonal('resources_have', statuses.ERROR, e.message))
      }
    )
  }
}

export const renewAleph = (barcode, alephId) => {
  return dispatch => {
    dispatch(states.requestPersonal('renewal'))
    let url = Config.resourcesAPI + '/aleph/renew'
    return fetch(url, {
      method: 'post',
      headers: {
        'barcode': barcode,
        'aleph-id': alephId,
      },
    })
    .then(response => { return response.json() })
    .then(json => dispatch(states.recievePersonal('renewal', statuses.SUCCESS, { barcode: barcode, ...json })))
  }
}

export default getResources
