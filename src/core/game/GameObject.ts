import { nanoid } from 'nanoid'
import { PhysicsComponent } from '@core/physics/PhysicsComponent'
import { ColliderComponent } from './components/ColliderComponent'

export abstract class GameObject {
	id: string
	x: number
	y: number
	width: number
	height: number
	tags: Set<string> = new Set()
	physics?: PhysicsComponent
	collider?: ColliderComponent
	isGrounded = false

	constructor({ id, x = 0, y = 0, width = 32, height = 32 }: { id?: string, x?: number, y?: number, width?: number, height?: number } = {}) {
		this.id = id ?? nanoid()
		this.x = x
		this.y = y
		this.width = width
		this.height = height
	}

	private updateHook?: (dt: number) => void

	onUpdate(cb: (dt: number) => void) {
		this.updateHook = cb
		return this
	}

	runUpdate(dt: number) {
		this.updateHook?.(dt)
	}

	addTag(tag: string) {
		this.tags.add(tag)
	}

	hasTag(tag: string) {
		return this.tags.has(tag)
	}

	removeTag(tag: string) {
		this.tags.delete(tag)
	}

	addCollider() {
		this.collider = new ColliderComponent()
		return this
	}
}
