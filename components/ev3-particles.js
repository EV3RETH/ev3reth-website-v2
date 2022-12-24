import canvasSketch from 'canvas-sketch';
import random from 'canvas-sketch-util/random';
import math from 'canvas-sketch-util/math';
import interpolate from 'color-interpolate';

const settings = {
  dimensions: [2048, 1024],
  animate: true,
  fps: 12,
  playbackRate: "fixed"
};

const seed = random.getRandomSeed()
console.log("🚀 ~ file: ev3-particles.js:36 ~ seed", seed)
random.setSeed(seed)

const particles = [];
const largeNum = 9999
const cursor = { x: largeNum, y: largeNum }
const frequency = 0.002;
const amplitude = 0.35;

let elCanvas;
let imgA, imgB, bgImg, mx, my;

const cols = 80;
const rows = 40;
const numCells = cols * rows
const particleStart = 6
const particleRadius = 16

const hPad = 0.7
const wPad = hPad

const sketch = ({ width, height, canvas, context }) => {
  let x, y, particle, radius;

  // grid
  const gw = Math.ceil(width * wPad)
  const gh = Math.ceil(height * hPad)
  //cell
  const cw = gw / cols;
  const ch = gh / rows;
  //margin
  mx = (width - gw) * 0.5;
  my = (height - gh) * 0.5;

  elCanvas = canvas;
  canvas.addEventListener('pointerdown', onMouseDown)


  //Images
  const bgCanvas = document.createElement('canvas')
  const bgContext = bgCanvas.getContext('2d')
  bgCanvas.width = width;
  bgCanvas.height = height;
  bgContext.globalAlpha = 0.5
  bgContext.drawImage(bgImg, 0, 0, width / 2, height)
  bgContext.drawImage(bgImg, width / 2, 0, width / 2, height)

  const imgAWidth = Math.ceil(imgA.width * wPad)
  const imgAHeight = Math.ceil(imgA.height * hPad)
  const imgACanvas = document.createElement('canvas')
  const imgAContext = imgACanvas.getContext('2d')
  imgACanvas.width = imgAWidth
  imgACanvas.height = imgAHeight
  imgAContext.drawImage(imgA, 0, 0, imgAWidth, imgAHeight)
  const imgAData = imgAContext.getImageData(0, 0, imgAWidth, imgAHeight).data

  const imgBWidth = Math.ceil(imgB.width * wPad)
  const imgBHeight = Math.ceil(imgB.height * hPad)
  const imgBCanvas = document.createElement('canvas')
  const imgBContext = imgBCanvas.getContext('2d')
  imgBCanvas.width = imgBWidth
  imgBCanvas.height = imgBHeight
  imgBContext.drawImage(imgB, 0, 0, imgBWidth, imgBHeight)
  const imgBData = imgBContext.getImageData(0, 0, imgBWidth, imgBHeight).data

  //Particles
  for (let i = 0; i < numCells; i++) {
    let ix, iy, idx, r,g,b,a;
    x = (i % cols) * cw;
    y = Math.floor(i / cols) * ch;

    ix = Math.floor((x / width) * imgA.width) 
    iy = Math.floor((y / height) * imgA.height) 
    idx = (iy * imgAWidth + ix) * 4;

    r = imgAData[idx]
    g = imgAData[idx + 1]
    b = imgAData[idx + 2]
    a = imgAData[idx + 3]
    const colA = `rgba(${ r }, ${ g }, ${ b }, ${ a})`
    radius = math.mapRange(r, 0, 255, particleStart, particleRadius)

    // const offset = i / (numCells);
    // const newRadius = radius - offset
    // radius = newRadius > 0 ? newRadius : radius  

    ix = Math.floor((x / width) * imgB.width)
    iy = Math.floor((y / height) * imgB.height)
    idx = (iy * (imgBWidth) + ix) * 4;

    r = imgBData[idx]
    g = imgBData[idx + 1]
    b = imgBData[idx + 2]
    a = imgBData[idx + 3]
    const colB = `rgba(${ r }, ${ g }, ${ b }, ${a})`

    // const colB = "#" + random.pick(Object.values(myColors.Gainsboro))

    const colMap = interpolate([colA, colB])

    particle = new Particle({ x, y, radius, colMap })
    particles.push(particle)
  }

  
  return ({ context, width, height, frame,  }) => {
    context.globalCompositeOperation = "source-over"
    context.fillStyle = '#222121';
    context.fillRect(0, 0, width, height);


    context.save()
    context.translate(mx, my)
    context.translate(cw / 2, ch / 2)
    particles.sort((a, b) => a.scale - b.scale)
    particles.forEach((particle, index) => {
      const change = frame
      const n = random.noise2D(particle.ix + change, particle.iy + change, frequency, amplitude);

      particle.update(n)
      particle.draw(context, index)
    })
    context.restore()
    
    context.globalCompositeOperation = "multiply"
    context.drawImage(bgCanvas, 0, 0)
  };
};

const onMouseDown = (e) => {
  window.addEventListener('pointermove', onMouseMove);
  window.addEventListener('pointerup', onMouseUp)
  onMouseMove(e)
}
const onMouseMove = (e) => {
  const x = (e.offsetX / elCanvas.offsetWidth) * elCanvas.width - mx;
  const y = (e.offsetY / elCanvas.offsetHeight) * elCanvas.height - my;
  
  cursor.x = x
  cursor.y = y
}
const onMouseUp = () => {
  window.removeEventListener('pointermove', onMouseMove);
  window.removeEventListener('pointerup', onMouseUp)
  
  cursor.x = largeNum;
  cursor.y = largeNum;
}

const loadImage = async (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img)
    img.onerror = () => reject();
    img.src = url;
  })
}
const drawComplex = ({ context, radius = 100, sides = 3, color }) => {
  const slice = Math.PI * 2 / sides;
  context.beginPath();
  context.moveTo(0, -radius);

  for (let i = 1; i < sides; i++) {
    const theta = i * slice - Math.PI * 0.5;
    let px = Math.cos(theta) * radius
    let py = Math.sin(theta) * radius

    if (i % 2 !== 0) {
      const offset = -0.6
      px *= offset
      py *= offset
    }
    
    context.lineTo(px, py)

  }
  context.closePath()
}
const drawPolygon = ({ context, radius = 100, sides = 3, color }) => {

  const slice = Math.PI * 2 / sides;
  context.beginPath();
  context.moveTo(0, -radius);

  for (let i = 1; i < sides; i++) {
    const theta = i * slice - Math.PI * 0.5;
    let px = Math.cos(theta) * radius
    let py = Math.sin(theta) * radius

    const n = random.noise2D(px, py, 0.5, 20 );

    px += n;
    py += n;

    context.lineTo(px, py)
  }
  context.closePath()
}

const drawCircle = ({ context, radius }) => {
  context.beginPath()
  context.arc(0, 0, radius, 0, Math.PI * 2)
  context.closePath()
} 

const drawPetal = ({ context, radius = 100, sides = 4, color }) => {
  let lastX, lastY;

  const slice = Math.PI * 2 / sides;
  const points = [{ x: 0, y: -radius }]

  for (let i = 1; i < sides; i++) {
    const theta = i * slice - Math.PI * 0.5;
    let px = Math.cos(theta) * radius
    let py = Math.sin(theta) * radius
    const n = random.noise2D(px, py, 1, 10);
    px += n;
    py += n;
    points.push({ x: px, y: py })
  }
  context.beginPath();
  const start = points[0]
  context.moveTo(start.x, start.y);

  for (let c = 0; c < points.length - 1; c++) {
    const curr = points[c];
    const next = points[c + 1];
    const midx = curr.x + (next.x - curr.x) * 0.5;
    const midy = curr.y + (next.y - curr.y) * 0.5;

    context.quadraticCurveTo(curr.x, curr.y, midx, midy)

    lastX = midx
    lastY = midy
  }
  const last = points[points.length - 1]
  const midx = last.x + (start.x - last.x) * 0.5;
  const midy = last.y + (start.y - last.y) * 0.5;

  context.quadraticCurveTo(last.x, last.y, midx, midy)
  context.closePath()
}

export const start = async (canvas) => {
  imgA = await loadImage("images/ev3-plain.png")
  imgB = await loadImage("images/bg-particles.png")
  bgImg = await loadImage("images/white-paper-texture.jpg")
  const settingsCanvas = {
    ...settings,
    canvas
  }
  canvasSketch(sketch, settingsCanvas);
}
// start()

class Particle {
  constructor({ x, y, radius = 10, colMap }) {
    //position
    this.x = x;
    this.y = y;

    //acceleration
    this.ax = 0;
    this.ay = 0;

    //velocity
    this.vx = 0;
    this.vy = 0;

    //initial position
    this.ix = x;
    this.iy = y;

    this.radius = radius;
    this.scale = 1;
    this.colMap = colMap
    this.color = colMap(0)

    this.initSides = random.range(3, 4);
    this.sides = this.initSides
    this.initRotation = 45
    this.rotation = this.initRotation

    this.minDist = random.range(100, 200);
    this.pushFactor = random.range(0.01, 0.02);
    this.pullFactor = random.range(0.0022, 0.0066);
    this.dampFactor = random.range(0.9, 0.95);
  }

  update(noise) {
    let dx, dy, dd, distDelta;
    let idxColor;

    //pull force
    dx = this.ix - this.x;
    dy = this.iy - this.y
    dd = Math.sqrt(dx * dx + dy * dy)

    this.ax = dx * this.pullFactor;
    this.ay = dy * this.pullFactor;

    this.scale = math.mapRange(dd, 0, 200, 1, 3)

    this.color = this.colMap(math.mapRange(dd, 0, 200, 0, 1, true))
    this.rotation = math.mapRange(dd, 0, 200, this.initRotation, this.initRotation + 270)
    
    
    //push force
    dx = this.x - cursor.x;
    dy = this.y - cursor.y;
    dd = Math.sqrt(dx * dx + dy * dy)
    
    
    distDelta = this.minDist - dd;

    if (dd < this.minDist) {
      this.ax += (dx / dd) * distDelta * this.pushFactor;
      this.ay += (dy / dd) * distDelta * this.pushFactor;
    }

    this.vx += this.ax;
    this.vy += this.ay;

    this.vx *= this.dampFactor;
    this.vy *= this.dampFactor;

    this.x += this.vx;
    this.y += this.vy;

    this.x += noise;
    this.y += noise / 2;
  }

  draw(context, index) {
    context.save();

    context.translate(this.x, this.y);
    context.rotate(math.degToRad(this.rotation))
    context.fillStyle = this.color

    const scaledRadius = this.radius * this.scale
    if (this.radius > (particleStart + particleRadius) / 2 || this.scale > 2.5) {
      context.shadowColor = "black"
      context.shadowOffsetX = -scaledRadius * 0.1;
      context.shadowOffsetY = scaledRadius * 0.1;
    }
  
    const option = {
      context,
      radius: scaledRadius,
      sides: this.sides,
      color: this.color
    }

    // drawRoundedPolygon(option)
    drawPetal(option)
    // drawComplex(option)
    // drawPolygon(option)
    // drawCircle(option)

    context.fill()
    context.restore()
  }
}
