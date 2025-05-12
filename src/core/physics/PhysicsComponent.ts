export class PhysicsComponent {
	// current speed
	vx = 0
	vy = 0

	// physics forces
	gravity = 980 // px/s²
	friction = 0.9 // 0 = none, 1 = full stop

	constructor(opts: Partial<Pick<PhysicsComponent, 'gravity' | 'friction'>> = {}) {
		if (opts.gravity !== undefined) this.gravity = opts.gravity
		if (opts.friction !== undefined) this.friction = opts.friction
	}

	apply(dt: number, obj: { x: number; y: number }): void {
		this.vy += this.gravity * dt

		obj.x += this.vx * dt
		obj.y += this.vy * dt

		this.vx *= this.friction
		this.vy *= this.friction
	}
}
