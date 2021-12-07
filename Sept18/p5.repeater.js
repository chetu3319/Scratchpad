export function rotationSymmetry(order = 2, anchorX, anchorY, drawFunc) {
  push();
  translate(anchorX, anchorY);
  let originalAngleMode = _angleMode;
  let angle = (2 * PI) / order;
  this.index = 0;
  angleMode(RADIANS);
  for (let i = 0; i < order; i++) {
    push();
    rotate(angle * i);
    drawFunc({ index: this.index });
    this.index += 1;
    pop();
  }
  angleMode(originalAngleMode);
  pop();
}

export function glide(
  glidePixelsHorizontal,
  glidePixelsVerticle,
  drawFunction
) {
  this.index = 0;
  let cols = int(width / glidePixelsHorizontal);
  let rows = int(height / glidePixelsVerticle);
  let motifWidth = width / cols;
  let motifHeight = height / rows;
  push();
  // translate(glidePixelsHorizontal / 2, glidePixelsVerticle / 2);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      push();
      translate(i * glidePixelsVerticle, j * glidePixelsHorizontal);

      drawFunction({
        index: this.index,
        width: motifWidth,
        height: motifHeight,
      });
      this.index += 1;
      pop();
    }
  }
  pop();
}
export function reflectionSymmetry(
  anchorX,
  anchorY,
  rotateBy,
  spacing,
  drawFunction
) {
  push();
  this.index = 0;
  translate(anchorX + spacing / 2, anchorY);
  rotate(rotateBy);
  drawFunction({ index: 0 });
  rotate(-rotateBy);
  translate(-spacing, 0);
  scale(-1, 1);
  rotate(rotateBy);
  drawFunction({ index: 1 });
  rotate(-rotateBy);
  pop();
}
