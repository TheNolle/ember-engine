import { Drawable } from '../Drawable'

export class Line extends Drawable {
	x2: number
	y2: number
	color: string
	width: number

	constructor(x1: number, y1: number, x2: number, y2: number, color = 'white', width = 1) {
		super(x1, y1)
		this.x2 = x2
		this.y2 = y2
		this.color = color
		this.width = width
	}

	draw(ctx: CanvasRenderingContext2D): void {
		ctx.strokeStyle = this.color
		ctx.lineWidth = this.width
		ctx.beginPath()
		ctx.moveTo(this.x, this.y)
		ctx.lineTo(this.x2, this.y2)
		ctx.stroke()
	}
}
