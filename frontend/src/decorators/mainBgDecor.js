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
          <button 
            className="arrow__down" 
            onClick={() => scrollToComponent(this.Blue, { offset: -200, align: 'middle', duration: 1500, ease:'inCirc'})}>
            <ArrowDown color="rgba(255, 255, 255, .7)" width="25" />
          </button>
          <AboutBgLeft color={leftColor} width="100%" />
          <AboutBgRight color={rightColor} width="100%" />
        </div>
        <div className="container" ref={(section) => { this.Blue = section; }}>
          <OriginalComponent 
              {...this.props} 
              {...this.state} 
          />
        </div>
      </main>
    )
  }

  handleClick = () => {
    scrollToComponent(this.Blue, {
      offset: -200,
      align: 'middle',
      duration: 500,
      ease: 'inQuad'
    })
  }
}