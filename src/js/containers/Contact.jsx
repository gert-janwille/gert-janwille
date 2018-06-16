import React from 'react';
import {Text, Textarea} from '../components/form/';
import Fields from '../../assets/data/contact.json';
import {animateInUp} from '../lib/animate';

const Contact = () => {

  const handleOnChange = e => {
    console.log({name: e.target.name, value: e.target.value});
  }

  return(
    <main className="contact-container">

      <section className='contact-info'>
        <h1>{animateInUp(['Get in', 'touch', 'with me'])}</h1>
        <p><span className="call small-icon"></span>+32 (0)494 91 32 68</p>
        <p><span className="mail small-icon"></span>hello@gert-janwille.com</p>
      </section>

      <form className="contact-form" method='POST'>

        {Fields.map(({label, name, required}) => <Text key={name} label={label} value={name} onChange={handleOnChange} required={required} />)}

        <Textarea label='Message' value='message' onChange={handleOnChange} required/>

        <div className="bottom-fields">
          <p><span className="required-mark">*</span>Required Field</p>
          <input type="submit" value='Submit'/>
        </div>

      </form>

    </main>
  )
}

export default Contact;
