import { Canvas2DRenderer } from '@core/renderer/Canvas2DRenderer'
import { Rect } from '@core/renderer/shapes/Rect'
import { Circle } from '@core/renderer/shapes/Circle'
import { Line } from '@core/renderer/shapes/Line'
import { Text } from '@core/renderer/Text'

const canvas = document.querySelector('canvas')!
const renderer = new Canvas2DRenderer()
renderer.init(canvas)

// Add objects to different layers (lower number = further back)
renderer.add(new Rect(50, 50, 100, 100, 'red'), 1)
renderer.add(new Circle(200, 150, 50, 'blue'), 2)
renderer.add(new Line(300, 100, 400, 200, 'green', 3), 3)
renderer.add(new Text(500, 100, 'Hello Ember!', {
	color: 'white',
	font: '20px monospace',
	align: 'left'
}), 4)

function loop() {
	renderer.clear()
	renderer.render()
	requestAnimationFrame(loop)
}

loop()
