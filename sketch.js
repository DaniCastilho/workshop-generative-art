const canvasSketch = require('canvas-sketch');
const {lerp} = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palletes = require('nice-color-palettes');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  const collorCount = random.rangeFloor(1, 5
    );
  const pallete = random.pick(palletes).slice(0,collorCount);
  const createGrid = () => {
    const points = [];
    const count = 30;
    for(let x = 0; x < count; x++){
      for(let y = 0; y < count; y++){
        const u = x / (count -1);
        const v = y / (count -1);
        points.push({
          color: random.pick(pallete),
          radius: Math.abs(0.01 +random.gaussian() * 0.01),
          position: [u, v]
        });
      }
    }
    return points;  
  };

  random.setSeed(512)
  const points =  createGrid().filter(() => random.value() > 0.5);
  const margin = 400;

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    points.forEach(data => {
      const {radius, position, color} = data;
      const [u, v] = position;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      context.arc(x, y, radius *  width, 0, Math.PI * 2, false);
      context.fillStyle = color;
      context.fill();
    })
  };
};

canvasSketch(sketch, settings);
