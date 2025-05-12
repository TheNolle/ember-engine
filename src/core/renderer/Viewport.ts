export class Viewport {
	x = 0
	y = 0
	zoom = 1

	moveTo(x: number, y: number) {
		this.x = x
		this.y = y
	}

	translate(dx: number, dy: number) {
		this.x += dx
		this.y += dy
	}

	setZoom(zoom: number) {
		this.zoom = zoom
	}
}
