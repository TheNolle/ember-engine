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

		this.input.bind('left', 'ArrowLeft')
		this.input.bind('right', 'ArrowRight')
		this.input.bind('up', 'ArrowUp')
		this.input.bind('down', 'ArrowDown')
	}

	update(dt: number): void {
		this.input.update()

		const speed = 400
		if (this.input.isDown('right')) this.player.physics.vx += speed * dt
		if (this.input.isDown('left')) this.player.physics.vx -= speed * dt
		if (this.input.isDown('up')) this.player.physics.vy -= speed * dt
		if (this.input.isDown('down')) this.player.physics.vy += speed * dt

		this.player.physics.apply(dt, this.player)

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
