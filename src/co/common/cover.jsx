import React from 'react'
import ReactDom from 'react-dom'

import network from 'network'
import config from 'config'
import Api from 'api'
import colors from '../../modules/colors'
import strings from '../../modules/strings'

var brokenImgs = []
var scaleDownImgs = []

export default class Cover extends React.PureComponent {
	displayName: "common/cover"

  cleanSource(src,link) {
    var finalSrc = src;
  	if (!src)
  		finalSrc = (config.screenshotService+encodeURIComponent(link||""));

    if (brokenImgs.indexOf(finalSrc)!=-1)
      return false;
    else
      return finalSrc;
  }

  makeNextState(props) {
    var scaleDown = props.scaleDown || null,
        src = props.src

    if (src){
      src = this.cleanSource(src, props.link);
      scaleDown = (scaleDownImgs.indexOf(src)!=-1 ? true : false);
    }

    return {
        src: src,
        domain: props.domain || "",
        scaleDown: scaleDown,
        width: props.width || 230,
        className: props.className,
        nothing: false
    };
  }

	constructor(props) {
		super(props);
		this.state = this.makeNextState(this.props)
	}

	componentWillReceiveProps(nextProps) {
      this.setState(this.makeNextState(nextProps));
  }

  handleImgLoadSuccess(e) {
    var _this = this, good = true;
    if (/*(_this.state.scaleDown==null)&&*/((_this.state.src||"").indexOf("data:")!=0))
    try {
        var coverScaleDown = ((e.target.offsetWidth > (e.target.naturalWidth*window.devicePixelRatio||1)) || (e.target.offsetHeight > (e.target.naturalHeight*window.devicePixelRatio||1)))

        if (_this.state.scaleDown != coverScaleDown) {
          if ((e.target.naturalWidth<50)&&(e.target.naturalHeight<50)){
            _this.handleImgLoadError();
            good = false;
          }

          if (coverScaleDown) {
            if (scaleDownImgs.indexOf(this.state.src)==-1){
              scaleDownImgs.push(this.state.src);
            }
            //Api.setItem("scaleDown-"+_this.state.src, coverScaleDown);

            _this.setState({scaleDown: coverScaleDown});
          }else{
            if (scaleDownImgs.indexOf(this.state.src)!=-1){
              scaleDownImgs.splice(scaleDownImgs.indexOf(this.state.src),1);
            }
          }
        }
    }catch(e){}

    if (good)
    if (brokenImgs.indexOf(this.state.src)!=-1){
      brokenImgs.splice(brokenImgs.indexOf(this.state.src),1);
    }

    if (this.props.onLoad)
      this.props.onLoad(e);

    //try{(ReactDom.findDOMNode(this.refs.img).parentElement).style.backgroundImage = "none";}catch(e){}
  }

  handleImgLoadError(e) {
    if (!e) return
    
    if (brokenImgs.indexOf(this.state.src)==-1){
      brokenImgs.push(this.state.src);
    }

    this.setState({src: false});

    //try{(ReactDom.findDOMNode(this.refs.img).parentElement).style.backgroundImage = "none";}catch(e){}
  }

  handleNothingError() {
    this.setState({nothing: true});
  }

	render() {
    var img, ghostImg;
    
    if (this.state.nothing) {
      img = (<span ref="img" className="cover cover-placeholder" style={{backgroundColor: "rgba("+colors.colorFromString(this.props.domain)+",.3)"}}></span>);
    }
    else{
      if (this.state.src){
          var retinaWidth = 230;
          if (this.state.width >= 230)
              retinaWidth = 460;

          var className="cover";
          if (this.state.src.indexOf(config.screenshotService)==0)
              className += " is-screenshot";

          if (this.state.scaleDown){
            className += " cover-scale-down";
            //ghostImg = <span className="ghostImg" style={{backgroundImage:"url("+network.thumb(this.state.src)+")"}}></span>
          }

          var nonRetina = network.thumb(this.state.src, this.state.width),
              retinaReady = network.thumb(this.state.src, retinaWidth);

          if (this.props.disableThumb){
            nonRetina = this.state.src;
            retinaReady = this.state.src;
          }

          img = <img ref="img"
                      crossOrigin={this.props.crossOrigin}
                      className={className}
                      src={nonRetina}
                      srcSet={nonRetina+" 1x, "+retinaReady+" 2x"} alt=""
                      onLoad={this.handleImgLoadSuccess.bind(this)}
                      onError={this.handleImgLoadError.bind(this)}/>;
      }else{
          if (this.state.width <= 230){
            var minDomain = strings.beautifulDomain(this.props.domain).toLowerCase();
            if (minDomain.length>3) minDomain = minDomain[0];

            img = (
                <img className="cover" crossOrigin={this.props.crossOrigin} src={network.favIcon(this.props.domain,"retina")} onLoad={this.props.onLoad} onError={this.handleNothingError.bind(this)} />
              );
          }else
            img = <img ref="img" className="cover is-screenshot" crossOrigin={this.props.crossOrigin} src={config.screenshotService+encodeURIComponent(this.props.link)} onLoad={this.props.onLoad} onError={this.handleNothingError.bind(this)}/>;
      }
    }

		return (
			<div className="cover-wrap">
        <div className="cover-over"  />
				{img}
			</div>
		);
	}
}