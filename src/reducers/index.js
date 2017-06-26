// Import all reducers here
import contentfulPage from './contentful/page'
import contentfulFloor from './contentful/floor'
import databaseLetter from './contentful/databaseLetter'
import personalReducer from './personal'
import hoursReducer from './hours'
import searchReducer from './search'
import librarianInfo from './librarians'
import menuReducer from './menu'
import chatReducer from './chat'
import advancedSearch from './advancedSearch'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  cfPageEntry: contentfulPage,
  cfFloorEntry: contentfulFloor,
  cfDatabaseLetter: databaseLetter,
  personal: personalReducer,
  librarianInfo: librarianInfo,
  hours: hoursReducer,
  search: searchReducer,
  menus: menuReducer,
  chat: chatReducer,
  advancedSearch: advancedSearch,
})

export default rootReducer
