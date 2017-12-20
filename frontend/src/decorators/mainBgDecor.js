import React, {Component} from 'react'
import scrollToComponent from 'react-scroll-to-component';

//svg
import AboutBgLeft from 'svg/aboutBgLeft'
import AboutBgRight from 'svg/aboutBgRight'
import ArrowDown from 'svg/arrowDown'

export default (OriginalComponent, mainClass = 'main', leftColor = '#f2f0e8', rightColor = '#f2f0e8') => class SvgBgWrap extends Component{
  componentDidMount = () => {
    let width = screen.width || document.body.clientWidth
    if(width <= 994){
      this.setState({
        leftColorState: rightColor
      })
    }else {
      this.setState({
        leftColorState: leftColor
      })
    }

    window.addEventListener('resize', e => {
      let resizeWidth = screen.width || document.body.clientWidth
      if(resizeWidth <= 994){
        if(this.state.leftColorState !== rightColor){
          this.setState({
            leftColorState: rightColor
          })
        }
      }else{
        if(this.state.leftColorState !== leftColor){
          this.setState({
            leftColorState: leftColor
          })
        }
      }
    })
  }

  state = {
    leftColorState: '#f2f0e8'
  }
  
  render(){
    const {leftColorState} = this.state
    return(
      <main className={mainClass}>
        <div className="bg__wrap">
          <button 
            className="arrow__down" 
            onClick={() => scrollToComponent(this.Blue, { offset: 0, align: 'top', duration: 500, ease:'inQuad'})}>
            <ArrowDown color="rgba(255, 255, 255, .7)" width="25" />
          </button>
          <AboutBgLeft color={leftColorState} width="100%" />
          <AboutBgRight color={rightColor} width="100%" />
        </div>
        <div className="container" ref={(section) => { this.Blue = section }}>
          <OriginalComponent 
              {...this.props} 
              {...this.state} 
          />
        </div>
      </main>
    )
  }
}