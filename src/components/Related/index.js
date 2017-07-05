import React from 'react'
import PropTypes from 'prop-types'

import Image from '../Image'
import Link from '../Link'

const Related = ({ title, className, showImages, children }) => {
  if (!children) {
    return null
  }

  return (
    <section aria-label={title}>
      { title && <h3>{title}</h3> }
      <ul className={className}>

        {
          children.map((currentItem) => {
            let link = currentItem.fields.slug ? currentItem.fields.slug : currentItem.fields.url
            if (!link) {
              link = currentItem.fields.purl
            }
            let image = ''
            if (showImages) {
              image = (<Image cfImage={currentItem.fields.image} />)
            }
            return (
              <li key={currentItem.fields.title}>
                <Link to={'/' + link}>
                  {image}
                  <span>{currentItem.fields.title}</span>
                </Link>
              </li>
            )
          })
        }

      </ul>
    </section>
  )
}

Related.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  showImages: PropTypes.bool,
  children: PropTypes.array,
}

Related.defaultProps = {
  showImages: true,
}

export default Related
