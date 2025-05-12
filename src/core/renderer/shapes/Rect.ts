import { Drawable } from '../Drawable'

export class Rect extends Drawable {
	width: number
	height: number
	color: string

	constructor(x: number, y: number, width: number, height: number, color = 'white') {
		super(x, y)
		this.width = width
		this.height = height
		this.color = color
	}

	draw(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = this.color
		ctx.fillRect(this.x, this.y, this.width, this.height)
	}
}
