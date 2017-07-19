import React from 'react'
import Link from '../../Link'
import LandingPage from '../index.js'

const Libraries = () => {
  return (

    <LandingPage title='Libraries and Centers'>

      <div className='row'>
        <div className='col-md-4 col-xs-12'>

          <h3>Hesburgh Libraries</h3>
          <ul className='child'>
            <li><Link to='/hesburgh'>Hesburgh Library</Link></li>

            <li><Link to='/architecture/'>Architecture Library</Link></li>

            <li><Link to='/business/'>Business Library</Link></li>

            <li><Link to='http://cds.library.nd.edu/'>Center for Digital Scholarship</Link></li>

            <li><Link to='/chemistry/'>Chemistry/Physics Library</Link></li>

            <li><Link to='/engineering/'>Engineering Library</Link></li>

            <li><Link to='/kellogg-kroc/'>Kellogg/Kroc Library</Link></li>

            <li><Link to='/mathematics/'>Mathematics Library</Link></li>

            <li><Link to='/medieval/'>Medieval Institute Library</Link></li>

            <li><Link to='/preservation/'>Preservation</Link></li>

            <li><Link to='/radiation-lab-reading-room/'>Radiation Lab Reading Room</Link></li>

            <li><Link to='http://rarebooks.library.nd.edu/'>Rare Books and Special Collections</Link></li>

            <li><Link to='http://archives.nd.edu/'>University Archives</Link></li>

            <li><Link to='/visual-resources-center/'>Visual Resources Center</Link></li>

          </ul>

        </div>
        <div className='col-md-4 col-md-offset-1 col-xs-12'>

          <h3>Global Gateways</h3>
          <ul className='child'>

            <li><Link to='/jerusalem-global-gateway/'>Tantur</Link></li>

            <li><Link to='/london-global-gateway/'>London</Link></li>

            <li><Link to='/rome-global-gateway/'>Rome</Link></li>

          </ul>

          <p>&nbsp;</p>

          <h3>Area Libraries</h3>
          <ul className='child'>

            <li><Link to='http://sjcpl.lib.in.us/'>St. Joseph County Public Library</Link></li>

            <li><Link to='https://www.bethelcollege.edu/library/'>Bethel College Bowen Library</Link></li>

            <li><Link to='https://www.saintmarys.edu/library/'>Saint Mary's College Cushwa-Leighton Library</Link></li>

            <li><Link to='http://www.hcc-nd.edu/mckenna-library/'>Holy Cross College McKenna Library</Link></li>

            <li><Link to='https://www.iusb.edu/library/'>Indiana University South Bend</Link></li>

            <li><Link to='http://law.nd.edu/library/'>Kresge Law Library</Link></li>

            <li><Link to='http://latinostudies.nd.edu/library-archives/'>Institute for Latino Studies Julian Samora Library</Link></li>
          </ul>
        </div>
      </div>
    </LandingPage>
  )
}

export default Libraries
