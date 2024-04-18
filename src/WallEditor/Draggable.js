import React from "react";
import Draggable from "react-draggable";
import { BsArrowDownRight } from "react-icons/bs";

class Drag extends React.Component {
  constructor(props) {
    super(props);

    // let hd = (335 - props.sumWidths) / 3;
    // let vd = (props.maxHeights - props.height) / 2;

    this.state = {
      // left: 25 + props.sumWidths + (props.index % 4) * hd, // x
      // top: 525 + Math.floor(props.index / 4) * (props.maxHeightPrev + 15) + vd,  // y
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      mouseStart: { x: 0, y: 0 },
      dragging: false,
    };

    // this.initPos();
  }

  initPos() {
    let hd = (335 - this.props.sumWidths) / 3;
    let vd = (this.props.maxHeights - this.state.height) / 2;

    this.setState({
      top: 525 + Math.floor(this.props.index / 4) * (this.props.maxHeightPrev + 15) + vd,
      left: 25 + this.props.sumWidths + (this.props.index % 4) * hd,
    });

    // console.log("x", data.x);
    // console.log("y", data.y);
  }

  componentDidMount() {
    const image = new Image();
    image.src = this.props.img;
    image.onload = () => {
      const aspectRatio = image.naturalWidth / image.naturalHeight;
      this.setState({
        // width: image.naturalWidth * 0.1,
        // height: image.naturalHeight * 0.1,
        height: 70,
        width: 70 * aspectRatio,
      });
    };
  }

  // handleStop = (event, data) => {
  //   console.log("xWall", this.props.xWall);
  //   console.log("yWall", this.props.yWall);
  //   console.log("widthWall", this.props.widthWall);
  //   console.log("heightWall", this.props.heightWall);
  //   console.log("x", this.state.top);
  //   console.log("y", this.state.left);

  //   // check if any corner of the image is out of bounds
  //   const isOutOfBounds =
  //     // top left coordinates of img
  //     this.state.left < this.props.xWall ||
  //     this.state.top < this.props.yWall ||
  //     // top right coordinates of img
  //     this.state.left + this.state.width > this.props.xWall + this.props.widthWall ||
  //     // bottom left coordinates of img
  //     this.state.top + this.state.height > this.props.yWall + this.props.heightWall;

  //   // if out of bounds, pop back to og position
  //   if (isOutOfBounds) {
  //     this.initPos();
  //   } else {
  //     // use the Draggable lastX and lastY prop
  //     this.setState((prevState) => ({
  //       top: data.lastY,
  //       left: data.lastX,
  //     }));
  //   }
  // };

  handleStop = (event, data) => {
    // console.log("x", this.state.top);
    // console.log("y", this.state.left);
    console.log("sumW", this.props.sumWidths);
    console.log("maxHeightPrev", this.props.maxHeightPrev);
    console.log("maxHeights", this.props.maxHeights);

    console.log("********", data.x, data.y);

    // if its out of bounds, pop back to og position
    if (
      false
      // data.x < 0
      // data.x > this.props.widthWall
      // data.y < this.props.yWall
    //   Math.abs(data.y) > (this.props.yWall + this.props.heightWall)
    ) {
      this.setState((prevState) => ({
        top: 0,
        left: 0,
      }));
      // this.initPos()
    } else {
      // use the Draggable lastX and lastY prop
      this.setState((prevState) => ({
        top: data.lastY,
        left: data.lastX,
      }));
    }
  };


  handleShuffle = () => {
    const tops = [-200, -225, -250, -275, -300]
    const lefts = [-50, -45, -40, -35, -30, -25, -20, -15, -10, -5, 5, 10,
                    15, 20, 25, 30, 35, 40, 45, 50]
                    
    if (this.state.top !== 0 && this.state.left !== 0) {
      this.setState((prevState) => ({
        // randomly calculate an x and y value that are within their respective bounds
        // top: -1 * (Math.random() * this.props.heightWall + this.props.yWall),
        // left: (Math.random() * (this.props.widthWall - this.state.width)),
        top: tops[Math.floor(Math.random() * tops.length)],
        left: lefts[Math.floor(Math.random() * tops.length)]
      }));
    }
    this.props.setShuffle(false);
  };

  handleClearAll = () => {
    console.log("clear clicked")
    // if its on the wall 
    if (this.state.top !== 0 && this.state.left !== 0) {
      this.setState((prevState) => ({
        // randomly calculate an x and y value that are within their respective bounds
        top: 0,
        left: 0
      }));
    }
    this.props.setClearAll(false);
  }

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
          {console.log(this.props.clearAll)}
          {this.props.clearAll && this.handleClearAll()}
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