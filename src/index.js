import p5 from 'p5'
import UI from '@velvetkevorkian/sketch-ui'
import './index.css'
import '@velvetkevorkian/sketch-ui/src/ui.css'

let variables = {
  color1: {
    value: '#ff8040',
    label: 'Color 1'
  },
  color2: {
    value: '#ff00ff',
    label: 'Color 2'
  },
  alpha: {value: 25},
  backgroundColor: {
    value: '#0f0f0f',
    label: 'Background Color'
  },
  blendMode: {
    value: ['ADD', 'BLEND'],
    label: 'Blend Mode',
    callback: (val, p) => {p.blendMode(p[val])}
  },
  loop: {
    value: true,
    callback: (val, p) => {
      val == true ? p.loop() : p.noLoop()
    }
  },
  noiseStep: {value: 0.003, max: 0.01, step: 0.0001},
  clearScreen: {
    type: 'button',
    label: 'Clear',
    callback(p) { p.clear() }
  }
}

let sources = [Math.random(), Math.random(), Math.random(), Math.random()]
let coords

new p5(p => {
  let ui

  p.setup = () => {
    ui = new UI(variables, p).proxy
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.background(ui.backgroundColor)
    p.blendMode(p[ui.blendMode])
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
    p.background(ui.backgroundColor)
  }

  p.draw = () => {
    coords = sources.map(s => p.noise(s))
    p.stroke(p.rgba(ui.color1, ui.alpha))
    const xFactor = p.windowWidth // Math.min(p.windowWidth, p.windowHeight)
    const yFactor = p.windowHeight // xFactor
    p.line(coords[0] * xFactor, coords[1] * yFactor, coords[2] * xFactor, coords[3] * yFactor)
    p.line(coords[1] * xFactor, coords[0] * yFactor, coords[2] * xFactor, coords[3] * yFactor)

    p.stroke(p.rgba(ui.color2, ui.alpha))
    p.line(coords[0] * xFactor, coords[2] * yFactor, coords[1] * xFactor, coords[3] * yFactor)
    p.line(coords[2] * xFactor, coords[0] * yFactor, coords[3] * xFactor, coords[1] * yFactor)


    sources.forEach((s, i) => sources[i] = s + ui.noiseStep)
  }

  p.rgba = function(hex, alpha) {
    const col = p.color(hex)
    col.setAlpha(alpha)
    return col
  }

  p.clear = () => {
    p.blendMode(p.BLEND)
    p.background(ui.backgroundColor)
    p.blendMode(p[ui.blendMode])
  }
})
