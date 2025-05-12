import { Renderer } from './Renderer'
import { Viewport } from './Viewport'
import { Drawable } from './Drawable'

export class Canvas2DRenderer implements Renderer {
	private ctx!: CanvasRenderingContext2D
	private canvas!: HTMLCanvasElement
	private viewport = new Viewport()
	private layers: Map<number, Drawable[]> = new Map()

	init(canvas: HTMLCanvasElement): void {
		const ctx = canvas.getContext('2d')
		if (!ctx) throw new Error('Canvas2DRenderer: Failed to get 2D context')
		this.canvas = canvas
		this.ctx = ctx
	}

	clear(): void {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
	}

	resetLayers(): void {
		this.layers.clear()
	}

	getViewport(): Viewport {
		return this.viewport
	}

	add(drawable: Drawable, z = 0): void {
		if (!this.layers.has(z)) this.layers.set(z, [])
		this.layers.get(z)!.push(drawable)
	}

	render(): void {
		this.ctx.save()
		this.ctx.scale(this.viewport.zoom, this.viewport.zoom)
		this.ctx.translate(-this.viewport.x, -this.viewport.y)

		const zSorted = [...this.layers.entries()].sort(([a], [b]) => a - b)
		for (const [, drawables] of zSorted) {
			for (const drawable of drawables) {
				drawable.draw(this.ctx)
			}
		}

		this.ctx.restore()
	}
}
