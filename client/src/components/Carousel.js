import React from 'react'
import { connect } from 'react-redux'
import { fetchAllMytineraries } from './redux/actions/mytinerariesActions'

class Carousel extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      slide: 1,
      redirect: true
    }
    this.handleSlideLeft = this.handleSlideLeft.bind(this);
    this.handleSlideRight = this.handleSlideRight.bind(this);
  }


handleSlideLeft(){
  this.setState({
    slide: this.state.slide -1
  })
  if(this.state.slide === 1){
     this.setState({
      slide: 3
    })
  }
  }


handleSlideRight(){
     this.setState({
      slide: this.state.slide +1
    })
    if(this.state.slide === 3){
      this.setState({
        slide:1
      })
    }
    }

     componentDidMount(){
      console.log('hello')
    this.props.fetchAllMytineraries();
     
    }

    componentDidUpdate () {
      if (this.state.redirect) {
          this.setState({
              redirect: false
          })
          this.props.fetchAllMytineraries();
          console.log('hello again')
      }
  }
   

  render(){ 
    console.log(this.props.mytinerariesAreLoaded, this.props.mytineraries)
    if (this.props.mytinerariesAreLoaded)
    return( <>

      <div className="slide-wrapper">
      <div className="carousel-wrap">
      {this.state.slide === 1 && 
        <div className="slider">
        {this.props.mytinerariesAreLoaded && <>
             {/* <div className="slide" style={{backgroundImage: `url(${this.props.mytineraries[14].activities[5].photo})`}}>{this.props.mytineraries[14].activities[5].name}</div>
             <div className="slide" style={{backgroundImage: `url(${this.props.mytineraries[10].activities[1].photo})`}}>{this.props.mytineraries[10].activities[1].name}</div>
             <div className="slide" style={{backgroundImage: `url(${this.props.mytineraries[11].activities[0].photo})`}}>{this.props.mytineraries[11].activities[0].name}</div>
             <div className="slide" style={{backgroundImage: `url(${this.props.mytineraries[15].activities[0].photo})`}}>{this.props.mytineraries[15].activities[0].name}</div> */}

             </>}
        </div>}
      {this.state.slide === 2 && 
         <div className="slider">
         {this.props.mytinerariesAreLoaded && <>
          {/* <div className="slide" style={{backgroundImage: `url(${this.props.mytineraries[12].activities[0].photo})`}}>{this.props.mytineraries[12].activities[0].name}</div>
          <div className="slide" style={{backgroundImage: `url(${this.props.mytineraries[13].activities[2].photo})`}}>{this.props.mytineraries[13].activities[2].name}</div>
          <div className="slide" style={{backgroundImage: `url(${this.props.mytineraries[14].activities[6].photo})`}}>{this.props.mytineraries[14].activities[6].name}</div>
          <div className="slide" style={{backgroundImage: `url(${this.props.mytineraries[16].activities[0].photo})`}}>{this.props.mytineraries[16].activities[0].name}</div> */}

             </>}
        </div>}
      {this.state.slide === 3 && 
          <div className="slider">
          {this.props.mytinerariesAreLoaded && <>
            {/* <div className="slide" style={{backgroundImage: `url(${this.props.mytineraries[17].activities[4].photo})`}}>{this.props.mytineraries[17].activities[4].name}</div>
            <div className="slide" style={{backgroundImage: `url(${this.props.mytineraries[19].activities[7].photo})`}}>{this.props.mytineraries[19].activities[7].name}</div>
            <div className="slide" style={{backgroundImage: `url(${this.props.mytineraries[20].activities[0].photo})`}}>{this.props.mytineraries[20].activities[0].name}</div>
            <div className="slide" style={{backgroundImage: `url(${this.props.mytineraries[22].activities[0].photo})`}}>{this.props.mytineraries[22].activities[0].name}</div> */}

             </>}
          </div>}
      </div>
      </div>
     
     <div className="indicator-wrap">
           <div className="indicator-btn-wrap">
                <div onClick={this.handleSlideLeft} className="left-btn"></div>
          </div> 

        <div className="indicator-circle-wrap">
            <div className={this.state.slide === 1 ? "indicator-circle-active":"indicator-circle"}></div>
            <div className={this.state.slide === 2 ? "indicator-circle-active":"indicator-circle"}></div>
            <div className={this.state.slide === 3 ? "indicator-circle-active":"indicator-circle"}></div>
        </div>
         

          <div className="indicator-btn-wrap">
                <div onClick={this.handleSlideRight} className="right-btn"></div>
          </div> 
      </div>
      </>
    )
    else 
    return(
      <div>Loading ...</div>
    )
  }
}

const mapStateToProps = (state) => ({
  mytineraries: state.mytineraries.mytineraries,
  mytinerariesAreLoaded: state.mytineraries.mytinerariesAreLoaded,
  cities: state.cities.cities,
  citiesAreLoaded: state.cities.citiesAreLoaded
})

export default connect (mapStateToProps, { fetchAllMytineraries }) (Carousel)
// export default Carousel