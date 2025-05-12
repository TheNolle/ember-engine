import { GameObject } from '@core/game/GameObject'
import { PhysicsComponent } from '@core/physics/PhysicsComponent'

export class ObjectBuilder extends GameObject {
	constructor() {
		super()
	}

	at(x: number, y: number) {
		this.x = x
		this.y = y
		return this
	}

	size(width: number, height: number) {
		this.width = width
		this.height = height
		return this
	}

	tag(tag: string) {
		this.addTag(tag)
		return this
	}

	withPhysics(opts: Partial<PhysicsComponent> = {}) {
		this.physics = new PhysicsComponent(opts)
		return this
	}
}
