import React from 'react';
import {inject, observer} from 'mobx-react';

import {QueryStringToJSON} from '../lib/util';
import serialize from '../lib/serialize';

import questions from '../../assets/data/questionary.json';
import {Textarea, YesNo, Text, None} from '../components/questionary/';


const Questionary = ({history, submitQuestionary}) => {
  const {ref, lang = 'en'} = QueryStringToJSON(history.location.search);

  const renderQuestion = q => {
    switch (q.type) {
      case "textarea":
        return <Textarea key={q.name} {...q}/>

      case "text":
        return <Text key={q.name} {...q}/>

      case "yes/no":
        return <YesNo key={q.name} {...q}/>

      case "none":
        return <None key={q.name} {...q}/>

      default:
    }
  }

  const handleQuestionary = e => {
    e.preventDefault();
    submitQuestionary(serialize(e.currentTarget), history);
  }

  return (
    <main className="questionary-container">
      <form method="POST" onSubmit={handleQuestionary}>

        <div className="q-info">
          <h1>Questionary</h1>
          <p>Thank you for your trust and choosing our services. To offer you the best of services we're asking you to complete this form so we can familiarize with your company/product and create together an amazing product! <span className="great"> - Gert-Jan Wille</span></p>

          <div className="client">
            <p>Client: <span>{atob(ref)}</span></p>
            <input type="hidden" name="client" value={atob(ref)}/>
            <p>Date: <span>{new Date().toDateString()}</span></p>
          </div>

        </div>

        {questions[lang].map(q => renderQuestion(q))}

        <input type="submit" name="send" value="Complete"/>

      </form>
    </main>
  );
}

export default inject(
  ({store}) => ({
    submitQuestionary: store.submitQuestionary
  })
)(
  observer(Questionary)
);
