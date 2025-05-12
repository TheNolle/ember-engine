import { GameLoop } from '@core/runtime/GameLoop'
import { SceneManager } from '@core/scene/SceneManager'
import { TestScene } from './scenes/TestScene'

const loop = new GameLoop()
const manager = new SceneManager()
manager.set(new TestScene())

loop.start(
	dt => manager.update(dt),
	dt => {
		const canvas = document.querySelector('canvas')!
		const ctx = canvas.getContext('2d')!
		manager.render(ctx)
	}
)
