import { Renderer } from './Renderer'

export class Canvas2DRenderer implements Renderer {
	private ctx!: CanvasRenderingContext2D
	private canvas!: HTMLCanvasElement

	init(canvas: HTMLCanvasElement): void {
		const ctx = canvas.getContext('2d')
		if (!ctx) throw new Error('Canvas2DRenderer: Failed to get 2D context')
		this.canvas = canvas
		this.ctx = ctx
	}

	clear(): void {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
	}

	render(): void {
		// Temporary debug fill
		this.ctx.fillStyle = 'black'
		this.ctx.fillRect(10, 10, 32, 32)
	}
}
