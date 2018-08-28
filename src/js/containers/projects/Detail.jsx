import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import {isEmpty} from 'lodash';

import {MainSlide, DotIndicator} from '../../components/';
import {createValidString} from '../../lib/util';

class Detail extends Component {

  state = {
    url: null,
    detailProject: {}
  }

  componentDidMount = () => {
    const {getDetail, match} = this.props;
    this.detailProject = getDetail(match.params.title);
  }

  handleChangeDetail = e => {
    e.preventDefault();
    const {getOtherProject} = this.props;
    const newItem = getOtherProject(e.currentTarget.getAttribute('data-type'));
    window.history.pushState(null, null, `/projects/${createValidString(newItem.title)}`);
  }

  renderPreview = () => {
    const {title, preview} = this.detailProject;
    const arr = preview.split('.');

    switch (arr[arr.length - 1]) {
      case 'mp4':
        return(<video src={`/uploads/${createValidString(title)}/${preview}`} onError={({currentTarget}) => currentTarget.src = '/assets/img/default/preview.jpg'}  controls={true} loop></video>);

      case 'png':
      case 'jpg':
        return (<img src={`/uploads/${createValidString(title)}/${preview}`} onError={({currentTarget}) => currentTarget.src = '/assets/img/default/preview.jpg'}  alt="feature"/>);

      default:
        return (<img src={`/uploads/${createValidString(title)}/${preview}`} onError={({currentTarget}) => currentTarget.src = '/assets/img/default/preview.jpg'}  alt="feature"/>);
    }
  }

  renderGoToProjectBtn = url => {
    return(
      <a className='button' href={url} target="_blank" rel='noopener noreferrer'>
        See in action
        <span className="btn-line"></span>
      </a>
    )
  }

  render() {
    const {detailProject} = this.props;

    if (isEmpty(detailProject)) return(<p>fetching</p>);
    this.detailProject = detailProject;

    const {title, services, url, introText, bigImage, smallImage, centerText} = this.detailProject;

    return(
      <section className='home-container detail-container'>
        <DotIndicator />
        <MainSlide {...detailProject} />

        <article className="main-info-block block">
          <div className="text">

            <ul className="services">
              <li className="headline hard">Our Services</li>
              {services.map(s => <li key={s} className="service-item">{s}</li>)}

              {url ? this.renderGoToProjectBtn(url) : null}

            </ul>

            <p className='main-info-box'>
              <span className="headline hard">About the project </span>
              {introText}
            </p>

          </div>

          <div className="image">
            <img src={`/uploads/${createValidString(title)}/${bigImage}`} onError={({currentTarget}) => currentTarget.src = '/assets/img/default/big-image.jpg'} alt="work1" />
            <img src={`/uploads/${createValidString(title)}/${smallImage}`} onError={({currentTarget}) => currentTarget.src = '/assets/img/default/small-image.jpg'} alt="work2" />
          </div>

        </article>

        <article className="text-info-block block">
          <p>
            <span className="headline">About the project - </span>
            {centerText}
          </p>
        </article>

        <article className="image-info-block block">
          <div className="image-holder">
            {this.renderPreview()}
          </div>
        </article>

        <article className="hire-me block">
          <h4 className="thanks pf-400">Want something like this?</h4>
          <p>Let's just collaborate together and we will create a wonderfull piece of happiness and magic.</p>
          <Link className='button' to={`/contact`}>
            Contact me
            <span className="btn-line"></span>
          </Link>
        </article>

        <article className="other-projects block">
          <Link to={`/projects/`} className="other-project-link" data-type='previous' onClick={this.handleChangeDetail}>&lt; Previous</Link>
          <Link to={`/projects/`} className="other-project-link" data-type='next' onClick={this.handleChangeDetail}>Next &gt;</Link>
        </article>

      </section>
    );
  }
}

export default inject(
  ({projectStore}) => ({
    getDetail: projectStore.getDetail,
    detailProject: projectStore.detailProject,
    getOtherProject: projectStore.getOtherProject
  })
)(
  observer(Detail)
);
