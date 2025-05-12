import { Drawable } from './Drawable'

export class Text extends Drawable {
	content: string
	color: string
	font: string
	align: CanvasTextAlign

	constructor(x: number, y: number, content: string, options: {
		color?: string
		font?: string
		align?: CanvasTextAlign
	} = {}) {
		super(x, y)
		this.content = content
		this.color = options.color ?? 'white'
		this.font = options.font ?? '16px sans-serif'
		this.align = options.align ?? 'left'
	}

	draw(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = this.color
		ctx.font = this.font
		ctx.textAlign = this.align
		ctx.fillText(this.content, this.x, this.y)
	}
}
