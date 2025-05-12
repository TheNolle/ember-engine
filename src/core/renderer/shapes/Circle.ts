import { Drawable } from '../Drawable'

export class Circle extends Drawable {
	radius: number
	color: string

	constructor(x: number, y: number, radius: number, color = 'white') {
		super(x, y)
		this.radius = radius
		this.color = color
	}

	draw(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = this.color
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
		ctx.fill()
	}
}
