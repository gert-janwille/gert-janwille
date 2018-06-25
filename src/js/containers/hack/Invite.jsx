import React from 'react';
import serialize from '../../lib/serialize';
import {inject, observer} from 'mobx-react';

const Invite = ({redeem, history}) => {

  const handleSubmitInviteCode = e => {
    e.preventDefault();
    try {
      redeem(serialize(e.target))
        .then(success => success ? history.push(`/hack`) : null)
        .catch(e.target.reset());
    } catch(d) {
      e.target.reset();
    }
  }

  return(
    <main className="invite-container">

      <section className="invite-box">
        <div className="invite-icon"></div>
        <h1>Invite Code</h1>
        <p>Hack your way in</p>

        <form method='POST' onSubmit={handleSubmitInviteCode}>
          <input type="text" name='invite' placeholder="XXXX-XXXX-XXXX-XXXX"/>
          <input type="submit" value="Enter"/>
        </form>
      </section>

    </main>
  )
}

export default inject(
  ({hackStore}) => ({
    redeem: hackStore.redeem
  })
)(
  observer(Invite)
);
