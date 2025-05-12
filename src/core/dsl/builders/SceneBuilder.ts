import { Scene } from '@core/scene/Scene'
import { Canvas2DRenderer } from '@core/renderer/Canvas2DRenderer'
import { InputManager } from '@core/input/InputManager'
import { Drawable } from '@core/renderer/Drawable'
import { Viewport } from '@core/renderer/Viewport'
import { DebugOverlay } from '@core/debug/DebugOverlay'

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
		this.viewport.update()

		for (const d of this.drawables) {
			if (typeof (d as any).update === 'function') {
				; (d as any).update(dt)
			}
		}
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
