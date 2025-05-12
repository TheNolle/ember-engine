export abstract class Drawable {
	x = 0
	y = 0

	constructor(x = 0, y = 0) {
		this.x = x
		this.y = y
	}

	/** Called each render frame */
	abstract draw(ctx: CanvasRenderingContext2D): void
}
