import React from 'react';
import {inject, observer} from 'mobx-react';

import {Text, Textarea} from '../components/form/';
import Fields from '../../assets/data/contact.json';
import {animateInUp} from '../lib/animate';

const Contact = ({setData, sentMail, errors}) => {

  const handleOnChange = e => setData({name: e.target.name, value: e.target.value});
  const handleMailMe = e => {
    e.preventDefault();
    sentMail(e.target);
  }

  return(
    <main className="contact-container">

      <section className='contact-info'>
        <h1>{animateInUp(['Get in', 'touch', 'with me'])}</h1>
        <div>
          <a href="tel:+32494913268"><span className="call small-icon"></span>+32 (0)494 91 32 68</a>
          <a href="mailto:hello@gert-janwille.com"><span className="mail small-icon"></span>hello@gert-janwille.com</a>
        </div>
      </section>

      <form className="contact-form" method='POST' onSubmit={handleMailMe}>

        {Fields.map(({label, name, required}) => <Text key={name} label={label} value={name} onChange={handleOnChange} required={required} error={errors[name]} />)}

        <Textarea label='Message' value='message' onChange={handleOnChange} error={errors.message} required/>

        <div className="bottom-fields">
          <p><span className="required-mark">*</span>Required Field</p>
          <input type="submit" value='Submit'/>
        </div>

      </form>

    </main>
  )
}

export default inject(
  ({contactStore}) => ({
    setData: contactStore.setData,
    sentMail: contactStore.sentMail,
    errors: contactStore.errors
  })
)(
  observer(Contact)
);
