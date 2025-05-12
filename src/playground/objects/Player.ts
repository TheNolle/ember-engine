import { GameObject } from '@core/game/GameObject'
import { PhysicsComponent } from '@core/physics/PhysicsComponent'

export class Player extends GameObject {
	physics = new PhysicsComponent({
		gravity: 600,
		friction: 0.9,
		maxVX: 500,
		maxVY: 1000
	})
	isGrounded = false

	constructor() {
		super({ width: 48, height: 48 })
		this.addTag('player')
	}
}
