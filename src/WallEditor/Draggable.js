import Draggable from "react-draggable";
import React, { useState, useRef, useEffect } from "react";

class Drag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: 0,
      left: 0,
      height: "10vh",
      mouseStart: { x: 0, y: 0 },
      dragging: false,
    };
  }

  handleStop = (event, data) => {
    // if its out of bounds, pop back to og position
    if (Math.abs(data.x) < this.props.xWall || Math.abs(data.y) < this.props.yWall || Math.abs(data.y) > this.props.yWall + this.props.heightWall) {
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
        top: -1 * ((Math.random() * this.props.heightWall) + this.props.yWall),
        left: Math.random() * this.props.widthWall
      }));
    } 
    this.props.setShuffle(false);
  };

  resizeImg = (e) => {
    this.setState((prevState) => ({
      width: e.target.offsetWidth,
      height: e.target.offsetHeight
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
          <div style={{resize:'both', height: this.state.height, width: this.state.width, overflow:'auto'}}
                onResize={this.resizeImg}>
            {/* <button style={{height: '10px', width:80, fontSize:'8px'}} onClick={() => {
            this.setState(prevState => ({
              top: 0,
              left: 0
            }))
          }}>remove</button> */}
            <img
              src={this.props.img}
              className="handle"
              style={{ height: '100%', width: '100%', top: this.state.top, left: this.state.left }}
            />
          </div>
        </div>
      </Draggable>
    );
  }
}

export default Drag;
