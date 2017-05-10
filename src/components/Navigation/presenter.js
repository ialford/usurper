
import React from 'react'
import { NavLink } from 'react-router-dom'
import AskMenu from './AskMenu'

import '../../static/css/global.css'

const Navigation = (props) => {
  return (
    <nav>
      <div className='container-fluid'>
        <div className='menu-link'><NavLink to='/'>Home</NavLink></div>
        <div className='menu-link'><NavLink to='/research'>Research</NavLink></div>
        <div className='menu-link'><NavLink to='/services/'>Services</NavLink></div>
        <div className='menu-link'><NavLink to='/libraries/'>Libraries & Centers</NavLink></div>
        <div className='menu-link'><NavLink to='/about/'>About</NavLink></div>
        <div className='menu-link ask'>
          <a className='right m'>Ask Us</a>
          <AskMenu open={false} />
        </div>
        <div className='menu-link search'>
          <a
            className='right search'
            id='header-search-button'
            onClick={props.search.drawerOpen ? props.closeSearchDrawer : props.openSearchDrawer}
          >Search</a>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
