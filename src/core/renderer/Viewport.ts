export class Viewport {
	x = 0
	y = 0
	zoom = 1

	private followTarget?: { x: number; y: number }
	private followLag = 0.15

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

	follow(target: { x: number; y: number }, lag = 0.15) {
		this.followTarget = target
		this.followLag = lag
	}

	update() {
		if (!this.followTarget) return
		const centerX = this.followTarget.x - window.innerWidth / 2 / this.zoom
		const centerY = this.followTarget.y - window.innerHeight / 2 / this.zoom
		this.x += (centerX - this.x) * this.followLag
		this.y += (centerY - this.y) * this.followLag
	}
}
