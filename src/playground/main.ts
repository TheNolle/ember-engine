import { Canvas2DRenderer } from '@core/renderer/Canvas2DRenderer'

const canvas = document.querySelector('canvas')!
const renderer = new Canvas2DRenderer()

renderer.init(canvas)

function loop() {
	renderer.clear()
	renderer.render()
	requestAnimationFrame(loop)
}

loop()
