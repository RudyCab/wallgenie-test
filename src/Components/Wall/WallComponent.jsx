const __getDegreeBetween = (originX, originY, targetX, targetY) => {
  let dx = originX - targetX;
  let dy = originY - targetY;

  let theta = Math.atan2(dy, -dx);
  theta *= 180 / Math.PI; // convert theta from radians to degrees

  console.log(theta);
  return theta;
};

const WallComponent = ({ wall, wallColor }) => {
  // extract values
  const { constants, coordinates, size, border } = wall;
  const { PADDING } = constants;
  const { x, y } = coordinates;
  const { width, height } = size;
  const { borderColor, borderWidth } = border;

  const renderLine = (left, top, angle) => {
    return {
      position: "fixed",
      left: left,
      top: top,
      width: `${borderWidth}px`,
      height: height,
      backgroundImage: `linear-gradient(to bottom, transparent 30%, ${borderColor} 45%)`, // apply gradient
      transform: `rotate(${angle}deg)`,
    };
  };

  const rectStyle = {
    position: "fixed",
    left: x,
    top: y,
    width: width,
    height: height,
    border: `${borderWidth}px solid ${borderColor}`,
    backgroundColor: wallColor,
  };

  return (
    <div className="wall-component">
      {/* top-left */}
      <div style={renderLine(x, y - height / 2, -45)} />
      {/* bottom-left */}
      <div style={renderLine(x, y + height / 2, -135)} />
      {/* bottom-right */}
      <div style={renderLine(width + PADDING - 2, y + height / 2, 135)} />
      {/* top-right */}
      <div style={renderLine(width + PADDING - 2, y - height / 2, 45)} />

      <SidePanel wall={wall} wallColor={wallColor} side={"left"} />
      <SidePanel wall={wall} wallColor={wallColor} side={"right"} />

      {/* main wall rect */}
      <div style={rectStyle} />
    </div>
  );
};

const SidePanel = ({ wall, wallColor, side }) => {
  // extract values
  const { constants, coordinates, size } = wall;
  const { PADDING } = constants;
  const { x, y } = coordinates;
  const { width, height } = size;

  const darkenedWallColor = darkenColor(wallColor, 25);

  const ARBITRARY_LARGE_VAL = 100;
  let myPadding = PADDING > ARBITRARY_LARGE_VAL ? 35 : PADDING; // clips side panels if viewing on laptop

  const left = side === "left" ? x - myPadding : x + width; // x-coordinate for rect and triangle subcomponents
  const gradientDirection = side === "left" ? "right" : "left";

  const rectStyle = {
    position: "fixed",
    left: left,
    top: y - 1, // extra padding
    width: myPadding,
    height: height + 2, // extra padding
    backgroundColor: darkenedWallColor,
  };

  const topTriangleStyle = {
    position: "fixed",
    left: left,
    top: y - myPadding,
    width: myPadding,
    height: myPadding,
    backgroundImage: `linear-gradient(to top ${gradientDirection}, ${darkenedWallColor} 50%, transparent 50%)`,
  };

  const bottomTriangleStyle = {
    position: "fixed",
    left: left,
    top: y + height,
    width: myPadding,
    height: myPadding,
    backgroundImage: `linear-gradient(to bottom ${gradientDirection}, ${darkenedWallColor} 50%, transparent 50%)`,
  };

  return (
    <>
      <div style={topTriangleStyle} />
      <div style={rectStyle} />
      <div style={bottomTriangleStyle} />
    </>
  );
};

function darkenColor(hex, amount) {
  hex = hex.replace("#", "");

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Darken each RGB component
  const darkenedR = Math.max(0, r - amount);
  const darkenedG = Math.max(0, g - amount);
  const darkenedB = Math.max(0, b - amount);

  // Convert darkened RGB back to hex
  const darkenedHex = `#${darkenedR.toString(16).padStart(2, "0")}${darkenedG
    .toString(16)
    .padStart(2, "0")}${darkenedB.toString(16).padStart(2, "0")}`;
  return darkenedHex;
}

export default WallComponent;
