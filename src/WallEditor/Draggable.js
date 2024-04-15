import React from "react";
import Draggable from "react-draggable";
import { BsArrowDownRight } from "react-icons/bs";

class Drag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      mouseStart: { x: 0, y: 0 },
      dragging: false,
    };
  }

  componentDidMount() {
    const image = new Image();
    image.src = this.props.img;
    image.onload = () => {
      // const aspectRatio = image.naturalWidth / image.naturalHeight;
      this.setState({
        width: image.naturalWidth * 0.1,
        height: image.naturalHeight * 0.1,
      });
    };
  }

  handleStop = (event, data) => {
    // if its out of bounds, pop back to og position
    console.log(this.props.xWall)
    console.log(data.x)
    console.log(Math.abs(data.y))
    console.log(this.props.yWall)
    console.log(this.props.heightWall + this.props.heightWall)
    console.log(Math.abs(data.x) < 0)
    console.log(Math.abs(data.y) < (this.props.yWall))
    console.log(Math.abs(data.y) > (this.props.heightWall + this.props.heightWall))
    if (
      Math.abs(data.x) < 0 ||
      Math.abs(data.y) < this.props.yWall ||
      Math.abs(data.y) > (this.props.yWall + this.props.heightWall)
    ) {
      this.setState((prevState) => ({
        top: 0,
        left: 0,
      }));
    } else {
      // use the Draggable lastX and lastY prop
      this.setState((prevState) => ({
        top: data.lastY,
        left: data.lastX,
      }));
    }
  };

  handleShuffle = () => {
    if (this.state.top !== 0 && this.state.left !== 0) {
      this.setState((prevState) => ({
        // randomly calculate an x and y value that are within their respective bounds
        top: -1 * (Math.random() * this.props.heightWall + this.props.yWall),
        left: (Math.random() * (this.props.widthWall - this.state.width)),
      }));
    }
    this.props.setShuffle(false);
  };

  resizeImg = (e) => {
    this.setState((prevState) => ({
      width: e.clientX || e.touches[0].clientX,
      height: e.clientY || e.touches[0].clientY,
    }));
  };

  mouseDown = () => {
    this.setState((prevState) => ({
      dragging: true
    }));
  }

    mouseMove = (e) => {
      if (this.state.dragging) {
        // get rectangle which contains this element
        const bound = e.target.getBoundingClientRect();
        // calculate offset from mouse to bounding rectangle
        const mouseX = e.clientX || e.touches[0].clientX;
        const mouseY = e.clientY || e.touches[0].clientY;
        const offsetX = mouseX - bound.left;
        const offsetY = mouseY - bound.top;
        this.setState((prevState) => ({
          width: offsetX,
          height: offsetY 
        }));
      }
    }
  

  mouseUp = () => {
    this.setState((prevState) => ({
      dragging: false
    }));
  }

  render() {
    return (
      <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={null}
        position={{ x: this.state.left, y: this.state.top }}
        scale={1}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}
      >
        <div>
          {this.props.shuffle && this.handleShuffle()}
          <div
            style={{
              // resize: "both",
              height: this.state.height,
              width: this.state.width,
              // overflow: "auto",
            }}
            // onResize={this.resizeImg}
          >
            {/* <button style={{height: '10px', width:80, fontSize:'8px'}} onClick={() => {
            this.setState(prevState => ({
              top: 0,
              left: 0
            }))
          }}>remove</button> */}
            <img
              src={this.props.img}
              className="handle"
              style={{
                height: "100%",
                width: "100%",
                top: this.state.top,
                left: this.state.left,
              }}
            />
            <button style={{height:'1px', width:'1px', fontSize:'8px', background:'none', border:'none', float:'right', paddingTop:0}}
                        onMouseDown={this.mouseDown}
                        onMouseMove={this.mouseMove}
                        onMouseUp={this.mouseUp}
                        onTouchStart={this.mouseDown}
                        onTouchMove={this.mouseMove}
                        onTouchEnd={this.mouseUp}
            ><BsArrowDownRight /></button>
          </div>
        </div>
      </Draggable>
    );
  }
}

export default Drag;
