export class PhysicsComponent {
	vx = 0
	vy = 0

	gravity = 980
	friction = 0.9

	maxVX = 600
	maxVY = 1000

	constructor(opts: Partial<Pick<PhysicsComponent, 'gravity' | 'friction' | 'maxVX' | 'maxVY'>> = {}) {
		Object.assign(this, opts)
	}

	apply(dt: number, obj: { x: number; y: number }) {
		this.vy += this.gravity * dt

		// clamp velocities
		this.vx = Math.max(-this.maxVX, Math.min(this.vx, this.maxVX))
		this.vy = Math.max(-this.maxVY, Math.min(this.vy, this.maxVY))

		obj.x += this.vx * dt
		obj.y += this.vy * dt

		this.vx *= this.friction
		this.vy *= this.friction
	}
}
