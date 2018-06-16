import React from 'react';
import serialize from '../../lib/serialize';

const Invite = () => {

  const handleSubmitInviteCode = e => {
    e.preventDefault();
    console.log(serialize(e.target));
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

export default Invite;
