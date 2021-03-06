import reducer from 'reducers/librarians'
import * as actions from 'actions/librarians'
import * as statuses from 'constants/APIStatuses'

describe('Page reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      status: statuses.NOT_FETCHED,
    })
  })

  it('should handle REQUEST_LIBRARIANS', () => {
    expect(
      reducer(undefined, {
        type: actions.REQUEST_LIBRARIANS,
        netids: ['a123', 'b456'],
      })
    ).toEqual({
      status: statuses.FETCHING,
      netids: ['a123', 'b456'],
    })
  })

  it('should handle RECEIVE_LIBRARIANS', () => {
    expect(
      reducer(undefined, {
        type: actions.RECEIVE_LIBRARIANS,
        status: 'status from receiveLibrarians',
        data: 'page from receiveLibrarians',
      })
    ).toEqual({
      status: 'status from receiveLibrarians',
      json: 'page from receiveLibrarians',
    })
  })
})
