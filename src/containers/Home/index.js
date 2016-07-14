import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Radium from 'radium';

import vars from '../../vars';

import Subheader from '../../components/Subheader';
import Hero from '../../components/Hero';
import Services from '../../components/Services';

class Home extends Component {
  componentWillMount() {
    this.state = {
      theme: {
        primary: vars.boy,
        secondary: vars.purple
      }
    }

    document.body.style.backgroundColor = this.state.theme.primary;
    document.body.style.color = this.state.theme.secondary;
  }

  render() {
    return (
      <div>
        <section className='container'>
          <Hero headline='Multifunctional designer/developer based in Bath — a traditionally trained designer that codes.'/>
          <Link to='/about'>Discover more about me</Link>
        </section>
        <Services/>
      </div>
    )
  }
}

module.exports = Radium(Home);
