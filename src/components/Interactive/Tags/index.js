import React from 'react'
import PropTypes from 'prop-types'

import clearIcon from 'static/images/clear-icon.svg'
import styles from './style.module.css'

const Tags = (props) => {
  if (!props.items.length) {
    return null
  }
  const classes = [styles.itemTag]
  if (!props.hasRemove) {
    classes.push(styles.small)
  }
  const children = (
    props.items.map(item => (
      <span
        key={item.key}
        className={classes.join(' ')}
        onClick={() => props.onClick(item)}
        title={props.hasRemove ? `Click to remove filter: ${item.value}` : ''}
      >
        { props.hasRemove && (
          <img src={clearIcon} className={styles.clearIcon} alt='X' />
        )}
        <span>{item.value}</span>
      </span>
    ))
  )
  return props.inline ? <span>{children}</span> : <div aria-label={props.ariaLabel}>{children}</div>
}

Tags.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string,
  hasRemove: PropTypes.bool,
  inline: PropTypes.bool,
}

export default Tags
