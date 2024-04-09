export class Wall {
  constructor(coordinates, size, border, decorItems, constants) {
    this.coordinates = coordinates; // x, y
    this.size = size; // width, height
    this.border = border; // borderColor, borderWidth
    this.decorItems = decorItems;
    this.constants = constants; // PADDING, MAX_WIDTH
  }
}
