import React, {Component} from 'react'
import scrollToComponent from 'react-scroll-to-component';

//svg
import AboutBgLeft from 'svg/aboutBgLeft'
import AboutBgRight from 'svg/aboutBgRight'
import ArrowDown from 'svg/arrowDown'

export default (OriginalComponent, mainClass = 'main', leftColor = '#f2f0e8', rightColor = '#f2f0e8') => class SvgBgWrap extends Component{
  render(){
    return(
      <main className={mainClass}>
        <div className="bg__wrap">
          <button className="arrow__down" onClick={() => scrollToComponent(this.main, { offset: -350, align: 'middle', duration: 500, ease:'inQuad'})}>
            <ArrowDown color="rgba(255, 255, 255, .7)" width="25" />
          </button>
          <AboutBgLeft color={leftColor} width="100%" />
          <AboutBgRight color={rightColor} width="100%" />
        </div>
        <div className="container" ref={section => { this.main = section }} >
          <OriginalComponent 
              {...this.props} 
              {...this.state} 
          />
        </div>
      </main>
    )
  }
}