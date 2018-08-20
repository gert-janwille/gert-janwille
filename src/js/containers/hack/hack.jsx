import React from 'react';
import {inject, observer} from 'mobx-react';

const Hack = ({socket, msgs, me, sendMsg}) => {

  const scrollToBottom = el => el ? el.scrollTop = el.scrollHeight : null;
  const handleFocus = ({currentTarget}) => currentTarget.querySelector('textarea').focus();
  const handleChange = ({currentTarget}) => currentTarget.style.height = `${currentTarget.scrollHeight}px`;

  const handleSubmitMsg = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMsg(e.currentTarget.value);
      e.currentTarget.value = '';
    }
  }

  const renderProfile = (m, id) => {
    if (m.user.username === me.username) return (<p key={id} className="me"><span className="username">{m.user.username}</span>{m.msg}</p>);
    if (m.info) return (<p key={id} className="info">{m.msg}</p>);

    return (<p key={id} className="stranger"><span className="username">{m.user.username}</span>{m.msg}</p>);
  }

  return (
    <section className="terminal-container" onClick={handleFocus}>

      <article className="terminal" ref={scrollToBottom}>
        <p className="info">
          *** <br/>
           * The Hack Chat Terminal<br/>
           * This is a live chat room for anyone who could hack this site. <br/>
           * All chats will be <b>deleted</b> when there is no activity for 30 minutes. <br/>
           * Wanna change your username? just type: <b>SET username=USERNAME</b><br/>
           * <br/>
           * @version 1.0 <br/>
           * @author  Gert-Jan Wille, talk@gert-janwille.com <br/>
           * <br/>
          ***
        </p>

        {msgs.map((m, id) => renderProfile(m, id))}

        <form method="POST">
          <span className="dollar">$</span>
          <textarea name="msg" onChange={handleChange} onKeyPress={handleSubmitMsg} autoFocus></textarea>
        </form>

      </article>

      <div className="overlay"></div>

    </section>
  )
}


export default inject(
  ({hackStore}) => ({
    socket: hackStore.socket,
    me: hackStore.me,
    msgs: hackStore.msgs,
    sendMsg: hackStore.sendMsg
  })
)(
  observer(Hack)
);
