import { aabb } from '@core/physics/collisions'
import { GameObject } from '@core/game/GameObject'
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

	private floor = new class extends GameObject {
		constructor() {
			super({ id: 'floor', x: 0, y: 600, width: 1280, height: 40 })
			this.addTag('solid')
		}
	}
	private floorShape = new Rect(this.floor.x, this.floor.y, this.floor.width, this.floor.height, 'gray')

	init(): void {
		const canvas = document.querySelector('canvas')!
		this.renderer.init(canvas)

		this.renderer.add(this.floorShape, 0)
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
		if (this.input.isDown('up') && this.player.isGrounded) {
			this.player.physics.vy = -400
		}

		this.player.physics.apply(dt, this.player)

		// Ground collision
		if (aabb(this.player, this.floor)) {
			this.player.y = this.floor.y - this.player.height
			this.player.physics.vy = 0
			this.player.isGrounded = true
		} else {
			this.player.isGrounded = false
		}

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
