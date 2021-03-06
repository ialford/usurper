import React from 'react'
import PropTypes from 'prop-types'
import Chat from '../../../../Chat'
import ChatImage from '../../images/ask.svg'

const ChatModal = (props) => {
  let buttonMessage = (<span><img src={ChatImage} alt='' aria-hidden='true' /> Chat with us</span>)
  if (props.chatOpen) {
    buttonMessage = (<span>Hide Chat</span>)
  }
  return (
    <div
      id='chat'
      className='footer-chat'>
      <button
        className='chat-button'
        onClick={props.onClick}
        onKeyDown={props.onKeyDown}
        tabIndex='0'
        href='/chat'
        aria-haspopup='true'
        aria-owns='chat-modal'
        aria-expanded={props.chatOpen}
      >{buttonMessage}</button>
      <div id='chat-modal' role='tabpanel' className={props.chatOpen ? 'chat-open' : 'hidden'}><Chat /></div>
    </div>
  )
}

ChatModal.propTypes = {
  chatOpen: PropTypes.bool,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
}

export default ChatModal
