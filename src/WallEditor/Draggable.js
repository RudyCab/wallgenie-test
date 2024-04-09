import Draggable from 'react-draggable';
import React, { useState, useRef, useEffect } from 'react';
import { FaRandom } from 'react-icons/fa';




class Drag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: 0,
      left: 0,
      height: '15vh',
      width: '10vh', 
      mouseStart: {x:0, y:0},
      dragging: false
    }
  }

  handleStop = (e, data) => {
    console.log("Mouse up event occurred!");
    if (e.clientX < 10 || e.clientY < 100 || e.clientY > 300) {
      console.log("inside if")
      this.setState(prevState => ({
        top: 0,
        left: 0,
      }))
    } else { // use the Draggable lastX and lastY prop
      this.setState(prevState => ({
        top: data.lastY,
        left: data.lastX
      }))
    }
    console.log(e.clientX)
    console.log(e.clientY)
  };

  handleShuffle = () => {
    if (this.state.top !== 0 && this.state.left != 0) {
      this.setState(prevState => ({
        // top: Math.random() * (300 - 100) + 100,
        // left: Math.random() * (300 - 10) + 10
        top: this.state.top + (Math.random() * (100 - 20) + 20) * (Math.random() * (1 + 1) - 1), 
        left: this.state.left + (Math.random() * (100 - 20) + 20) * (Math.random() * (1 + 1) - 1)
      }))
  }
    this.props.setShuffle(false)
  }

  

  handleMouseMove = (e) => {
    console.log("hi")
    this.setState(prevState => ({
      dragging: true,
      mouseStart: {x:e.offsetX, y: e.offsetY}
    }), () => {
      console.log("move")
      console.log("dragging " + this.state.dragging)
      if (this.state.dragging === true) {
        const pixelDifference = Math.max(this.state.mouseStart.x - e.offsetX, this.state.mouseStart.y - e.offsetY);
        console.log(pixelDifference)
        this.setState(prevState => ({
          height: this.state.height + pixelDifference,
          width: this.state.width + pixelDifference,
          mouseStart: {x:e.offsetX, y: e.offsetY}
        }))
    }
    })
  }

  handleMouseUp = (e) => {
    console.log("up")
    this.setState(prevState => ({
      dragging: false
    }))
  }
 
  render() {

  // function Drag(props) {
    return (
      <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={null}
        position={{x:this.state.left, y:this.state.top}}
        scale={1}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}>
        <div         
        >
  {console.log("top is" + this.state.top)}
  {console.log("left is" + this.state.left)}
  {console.log(this.props.shuffle)}
  {this.props.shuffle && this.handleShuffle()}
        <div>
          {/* <button style={{height: '10px', width:80, fontSize:'8px'}} onClick={() => {
            this.setState(prevState => ({
              top: 0,
              left: 0
            }))
          }}>remove</button> */}
          <img src={this.props.img} className="handle" style={{height: this.state.height, width: this.state.width}} />
          {/* <div className="handle" style={{backgroundImage: require("" + this.props.img), backgroundSize:'contain', width:100, height:100}}></div> */}
          
          </div>
          {/* <button onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp} style={{height: '10px', width:80, fontSize:'8px'}}>Resize</button> */}
          
        </div>
      </Draggable>
    );
  }
}

export default Drag;
