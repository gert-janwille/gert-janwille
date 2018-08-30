import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

class DotIndicator extends Component {

  state = {
    idex: 0,
    view: [],
    breakpoints: []
  }

  componentDidMount = () => {
    this.renderDots()
    window.addEventListener('scroll', this.handleScrollEvent);
  };

  componentWillUnmount = () => window.removeEventListener('scroll', this.handleScrollEvent);

  handleScrollEvent = e => {
    const {breakpoints} = this.state;
    let position = window.pageYOffset;

    const {top} = document.querySelector('.main-info-block').getBoundingClientRect();

    const changeBoxes = [document.querySelector('.scroll-indicator')];
    document.querySelectorAll('.dot-indicator').forEach(e => changeBoxes.push(e));

    changeBoxes.forEach(el => {
      const {bottom, height} = el.getBoundingClientRect();

      if (bottom - (height / 2) >= top) {
        el.classList.remove('light-indicator');
        el.classList.add('dark-indicator');
      } else {
        el.classList.remove('dark-indicator');
        el.classList.add('light-indicator');
      }

      return 0;
    });


    for (var i = 0; i < breakpoints.length; i++) {
      if (position <= breakpoints[i]) {
        this.setState({index: i});
        break;
      }
    }

    const {index} = this.state;
    if (isNaN(index)) return;

    const arr = document.querySelectorAll('.dot-indicator');
    for (let i = 0; i < arr.length; i++) {
      arr[i].classList.remove('active-indicator');
      if (i === index) arr[i].classList.add('active-indicator');
    }

  }

  renderDots = () => {
    const {dotindicators} = this.props;

    const view = [];
    const breakpoints = [];

    for (var i = 1; i <= dotindicators; i++) {
      breakpoints.push((document.body.scrollHeight / dotindicators) * i);
      view.push(<li key={i} className={`dot-indicator ${i === 1 ? 'active-indicator' : null}`}></li>);
    }

    this.setState({view, breakpoints});
  }

  render(){
    const {view} = this.state;

    return(
      <ul className="dot-container">
        {view}
        <p className="scroll-indicator">Scroll</p>
      </ul>
    );
  }
}

export default inject(
  ({projectStore}) => ({
    dotindicators: projectStore.dotindicators,
  })
)(
  observer(DotIndicator)
);
