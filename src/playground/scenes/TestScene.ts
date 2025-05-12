import { aabb } from '@core/physics/collisions'
import { GameObject } from '@core/game/GameObject'
import { InputManager } from '@core/input/InputManager'
import { Scene } from '@core/scene/Scene'
import { Canvas2DRenderer } from '@core/renderer/Canvas2DRenderer'
import { Rect } from '@core/renderer/shapes/Rect'
import { DebugOverlay } from '@core/debug/DebugOverlay'
import { Player } from '../objects/Player'

export class TestScene extends Scene {
	private renderer = new Canvas2DRenderer()
	private input = new InputManager()

	private player = new Player()
	private playerShape = new Rect(this.player.x, this.player.y, this.player.width, this.player.height, 'cyan')

	private floor = new class extends GameObject {
		constructor() {
			super({ id: 'floor', x: 0, y: 800, width: 1920, height: 40 })
			this.addTag('solid')
		}
	}
	private floorShape = new Rect(this.floor.x, this.floor.y, this.floor.width, this.floor.height, 'gray')

	private debug = new DebugOverlay()
	private debugMode = true

	init(): void {
		const canvas = document.querySelector('canvas')!
		this.renderer.init(canvas)

		this.resizeCanvas(canvas)
		window.addEventListener('resize', () => this.resizeCanvas(canvas))

		this.renderer.add(this.floorShape, 0)
		this.renderer.add(this.playerShape)
		if (this.debugMode) this.renderer.add(this.debug, 999)

		this.input.bind('left', 'ArrowLeft')
		this.input.bind('right', 'ArrowRight')
		this.input.bind('up', 'ArrowUp')
	}

	private resizeCanvas(canvas: HTMLCanvasElement) {
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight
	}

	update(dt: number): void {
		if (this.debugMode) {
			this.debug.update(dt, {
				x: this.player.x,
				y: this.player.y,
				vx: this.player.physics.vx,
				vy: this.player.physics.vy,
				isGrounded: this.player.isGrounded
			})
		}

		const speed = 400
		if (this.input.isDown('right')) this.player.physics.vx += speed * dt
		if (this.input.isDown('left')) this.player.physics.vx -= speed * dt
		if (this.input.isPressed('up') && this.player.isGrounded) {
			this.player.physics.vy = -400
		}

		this.player.physics.apply(dt, this.player)

		if (aabb(this.player, this.floor)) {
			this.player.y = this.floor.y - this.player.height
			this.player.physics.vy = 0
			this.player.isGrounded = true
		} else {
			this.player.isGrounded = false
		}

		this.playerShape.x = this.player.x
		this.playerShape.y = this.player.y

		this.input.update()
	}

	render(): void {
		this.renderer.clear()

		this.renderer.resetLayers()
		this.renderer.add(this.floorShape, 0)
		this.renderer.add(this.playerShape, 1)
		if (this.debugMode) this.renderer.add(this.debug, 999)

		this.renderer.render()
	}

	dispose(): void {
		this.input.dispose()
	}
}
