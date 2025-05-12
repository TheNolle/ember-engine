import { GameObject } from '@core/game/GameObject'
import { PhysicsComponent } from '@core/physics/PhysicsComponent'
import { Drawable } from '@core/renderer/Drawable'

export class ObjectBuilder extends GameObject implements Drawable {
	private _color = 'white'

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

	withCollider(): this {
		this.addCollider()
		return this
	}

	onCollide(tag: string, callback: (other: GameObject) => void): this {
		if (!this.collider) this.addCollider()
		this.collider!.on(tag, callback)
		return this
	}

	color(color: string) {
		this._color = color
		return this
	}

	draw(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = this._color
		ctx.fillRect(this.x, this.y, this.width, this.height)
	}
}
