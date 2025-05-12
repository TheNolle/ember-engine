import { Canvas2DRenderer } from '@core/renderer/Canvas2DRenderer'
import { GameLoop } from '@core/runtime/GameLoop'
import { Rect } from '@core/renderer/shapes/Rect'
import { Circle } from '@core/renderer/shapes/Circle'
import { Line } from '@core/renderer/shapes/Line'
import { Text } from '@core/renderer/Text'

const canvas = document.querySelector('canvas')!
const renderer = new Canvas2DRenderer()
renderer.init(canvas)

const loop = new GameLoop()

const objects = [
	new Rect(50, 50, 100, 100, 'red'),
	new Circle(200, 150, 50, 'blue'),
	new Line(300, 100, 400, 200, 'green', 3),
	new Text(500, 100, 'Hello Ember!', {
		color: 'white',
		font: '20px monospace',
		align: 'left'
	})
]

objects.forEach((o, i) => renderer.add(o, i + 1))

loop.start(
	(dt) => {
	},
	(dt) => {
		renderer.clear()
		renderer.render()
	}
)
