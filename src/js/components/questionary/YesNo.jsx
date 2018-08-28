import React, {Component} from 'react';
import {Textarea, Text, None} from './';

class YesNo extends Component {
  state = {
    visible: false
  }

  renderMore = e =>this.setState({visible: e.currentTarget.id === 'true' ? true : false});

  renderQuestion = q => {
    switch (q.type) {
      case "textarea":
        return <Textarea key={q.name} {...q}/>

      case "text":
        return <Text key={q.name} {...q}/>

      case "yes/no":
        return <Text key={q.name} {...q}/>

      case "none":
        return <None key={q.name} {...q}/>

      default:
    }
  }

  render() {
    const {question, subtitle, name, isTrue} = this.props
    const {visible} = this.state;

    return(
      <div className="yes-no-box">
        <div className="input-box yes-no">
          <p className='q-title'>{question}</p>
          <p className='q-sub'>{subtitle}</p>

          <div className="box-radio">
            <label className="button-radio" htmlFor="true">Yes</label>
            <input type="radio" name={name} id="true" onClick={this.renderMore}/>
            <label className="button-radio" htmlFor="false">No</label>
            <input type="radio" name={name} id="false" onClick={this.renderMore}/>
          </div>

        </div>

        {visible ?
          <div className="others">
            {isTrue.map(q => this.renderQuestion(q))}
          </div>
        : null}


        {!visible ? <div className="divider"></div> : null}

      </div>
    );
  }
}


export default YesNo;
