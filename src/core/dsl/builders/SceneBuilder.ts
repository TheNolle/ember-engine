import { Scene } from '@core/scene/Scene'
import { Canvas2DRenderer } from '@core/renderer/Canvas2DRenderer'
import { InputManager } from '@core/input/InputManager'
import { Drawable } from '@core/renderer/Drawable'
import { ObjectBuilder } from './ObjectBuilder'
import { Rect } from '@core/renderer/shapes/Rect'
import { DebugOverlay } from '@core/debug/DebugOverlay'
import { aabb } from '@core/physics/collisions'

export class SceneBuilder extends Scene {
	private drawables: Drawable[] = []
	private renderer = new Canvas2DRenderer()
	private input = new InputManager()
	private debugEnabled = false
	private viewport = this.renderer.getViewport()
	private debug = new DebugOverlay()
	private logic: ((scene: SceneBuilder) => void) | null = null

	constructor(public name: string) {
		super()
	}

	enableDebug() {
		this.debugEnabled = true
	}

	spawn(obj: Drawable) {
		this.drawables.push(obj)
	}

	define(logic: (scene: SceneBuilder) => void) {
		this.logic = logic
	}

	follow(target: { x: number; y: number }) {
		this.viewport.follow(target)
		return this
	}

	setZoom(zoom: number) {
		this.viewport.setZoom(zoom)
		return this
	}

	getAll(tag: string): ObjectBuilder[] {
		return this.drawables.filter(
			d => d instanceof ObjectBuilder && d.hasTag(tag)
		) as ObjectBuilder[]
	}

	spawnGround(x: number, y: number, width: number, height: number) {
		const ground = new ObjectBuilder()
			.at(x, y)
			.size(width, height)
			.tag('ground')
			.withCollider()

		const visual = new Rect(x, y, width, height, 'gray')

		this.spawn(ground)
		this.spawn(visual)
		return ground
	}

	init(): void {
		const canvas = document.querySelector('canvas')!
		this.renderer.init(canvas)
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight
		window.addEventListener('resize', () => {
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
		})

		if (this.logic) this.logic(this)
		this.drawables.forEach(d => this.renderer.add(d))
		if (this.debugEnabled) this.renderer.add(this.debug, 999)
	}

	update(dt: number): void {
		this.input.update()

		const objects = this.drawables.filter(d => d instanceof ObjectBuilder) as ObjectBuilder[]

		// 1. Run updates (controls, etc.)
		for (const obj of objects) {
			obj.update?.(dt)
		}

		// 2. Collisions
		for (const obj of objects) {
			obj.isGrounded = false
			if (!obj.physics) continue

			for (const other of objects) {
				if (obj === other || !other.hasTag('ground')) continue
				if (!aabb(obj, other)) continue

				// Vertical landing
				const willLand = obj.physics.vy >= 0 &&
					obj.y + obj.height <= other.y + 4 &&
					obj.y + obj.height + obj.physics.vy * dt >= other.y

				if (willLand) {
					obj.y = other.y - obj.height
					obj.physics.vy = 0
					obj.isGrounded = true
					continue
				}

				// Horizontal left
				if (obj.physics.vx > 0 && obj.x + obj.width > other.x && obj.x < other.x) {
					obj.x = other.x - obj.width
					obj.physics.vx = 0
				}

				// Horizontal right
				if (obj.physics.vx < 0 && obj.x < other.x + other.width && obj.x + obj.width > other.x + other.width) {
					obj.x = other.x + other.width
					obj.physics.vx = 0
				}
			}
		}

		// 3. Handle custom collision callbacks
		for (const obj of objects) {
			if (obj.collider) obj.collider.check(obj, objects)
		}

		// 4. Update debug info
		if (this.debugEnabled) {
			this.debug.update(dt, objects
				.filter(obj => obj.hasTag('player'))
				.map(p => ({
					x: p.x, y: p.y,
					vx: p.physics?.vx ?? 0,
					vy: p.physics?.vy ?? 0,
					isGrounded: p.isGrounded
				}))
			)
		}

		// 5. Update camera
		this.viewport.update()
	}

	render(ctx: CanvasRenderingContext2D): void {
		this.renderer.clear()
		this.renderer.resetLayers()
		this.drawables.forEach(d => this.renderer.add(d))
		if (this.debugEnabled) this.renderer.add(this.debug, 999)
		this.renderer.render()
	}

	dispose(): void {
		this.input.dispose()
	}
}
