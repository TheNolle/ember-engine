import { InputManager } from '@core/input/InputManager'
import { Scene } from '@core/scene/Scene'
import { Canvas2DRenderer } from '@core/renderer/Canvas2DRenderer'
import { Rect } from '@core/renderer/shapes/Rect'
import { Player } from '../objects/Player'

export class TestScene extends Scene {
	private renderer = new Canvas2DRenderer()
	private input = new InputManager()
	private player = new Player()
	private playerShape = new Rect(this.player.x, this.player.y, this.player.width, this.player.height, 'cyan')

	init(): void {
		const canvas = document.querySelector('canvas')!
		this.renderer.init(canvas)
		this.renderer.add(this.playerShape)
	}

	update(dt: number): void {
		this.input.update()

		if (this.input.isDown('ArrowRight')) this.player.x += dt * 100
		if (this.input.isDown('ArrowLeft')) this.player.x -= dt * 100
		if (this.input.isDown('ArrowUp')) this.player.y -= dt * 100
		if (this.input.isDown('ArrowDown')) this.player.y += dt * 100

		this.playerShape.x = this.player.x
		this.playerShape.y = this.player.y
	}

	render(): void {
		this.renderer.clear()
		this.renderer.render()
	}

	dispose(): void {
		this.input.dispose()
	}
}
