import { ObjectBuilder } from './ObjectBuilder'
import { Drawable } from '@core/renderer/Drawable'

type AnimationOptions =
	| { type: 'bobbing'; amplitude?: number; speed?: number }
	| { type: 'rotate'; speed?: number; scaleRange?: [number, number] }
	| { type: 'pulse'; speed?: number; range?: [number, number] }
	| { type: 'rainbow'; speed?: number }

type CustomAnimationFn = (self: CollectibleBuilder, dt: number, elapsed: number) => void

export class CollectibleBuilder extends ObjectBuilder implements Drawable {
	private onCollectCallback?: (collector: ObjectBuilder) => void
	private collected = false
	private originalColor = 'white'
	private respawnDelay = 0
	private respawnLimit: number | null = null
	private timesCollected = 0

	private customAnimationFn?: CustomAnimationFn
	private animation?: AnimationOptions
	private animationBaseY = 0
	private elapsedTime = 0
	private renderScale = 1
	private renderColor = 'white'

	constructor() {
		super()
		this.tag('collectible')
		this.withCollider()
		this.animationBaseY = this.y
		this.setupCollision()
	}

	private setupCollision() {
		this.onCollide('player', (other) => {
			if (this.collected) return
			this.collected = true
			this.timesCollected++

			this.hide()
			this.removeTag('collectible')
			this.collider = undefined

			this.onCollectCallback?.(other as ObjectBuilder)

			if (this.respawnDelay > 0) {
				if (this.respawnLimit === null || this.timesCollected < this.respawnLimit) {
					setTimeout(() => this.reset(), this.respawnDelay)
				}
			}
		})
	}

	onCollect(callback: (collector: ObjectBuilder) => void): this {
		this.onCollectCallback = callback
		return this
	}

	respawnable(opts: { time: number; limit?: number }): this {
		this.respawnDelay = opts.time
		this.respawnLimit = opts.limit ?? null
		return this
	}

	animate(options: AnimationOptions): this {
		this.animation = options
		this.animationBaseY = this.y
		return this
	}

	withAnimation(fn: CustomAnimationFn): this {
		this.customAnimationFn = fn
		return this
	}

	override update(dt: number): void {
		super.update(dt)

		if (this.collected) return
		this.elapsedTime += dt

		switch (this.animation?.type) {
			case 'bobbing': {
				const amp = this.animation.amplitude ?? 5
				const speed = this.animation.speed ?? 2
				this.y = this.animationBaseY + Math.sin(this.elapsedTime * speed * Math.PI * 2) * amp
				break
			}
			case 'rotate': {
				const speed = this.animation.speed ?? 2
				const [min, max] = this.animation.scaleRange ?? [0.5, 1]
				this.renderScale = min + (Math.abs(Math.sin(this.elapsedTime * speed * Math.PI * 2)) * (max - min))
				break
			}
			case 'pulse': {
				const speed = this.animation.speed ?? 2
				const [min, max] = this.animation.range ?? [0.8, 1.2]
				this.renderScale = min + (Math.sin(this.elapsedTime * speed * Math.PI * 2) * 0.5 + 0.5) * (max - min)
				break
			}
			case 'rainbow': {
				const speed = this.animation.speed ?? 1
				const hue = (this.elapsedTime * speed * 100) % 360
				this.renderColor = `hsl(${hue}, 100%, 50%)`
				break
			}
		}

		this.customAnimationFn?.(this, dt, this.elapsedTime)
	}

	reset(): this {
		this.collected = false
		this.show()
		this.tag('collectible')
		this.withCollider()
		this.setupCollision()
		this.color(this.originalColor)

		this.elapsedTime = 0
		this.y = this.animationBaseY
		this.renderScale = 1
		this.renderColor = this.originalColor

		return this
	}

	hide(): this {
		this.setVisible(false)
		return this
	}

	show(): this {
		this.setVisible(true)
		return this
	}

	override color(color: string) {
		this.originalColor = color
		return super.color(color)
	}

	override getColor(): string {
		return this.originalColor
	}

	override draw(ctx: CanvasRenderingContext2D): void {
		if (!this.getVisible()) return
		ctx.fillStyle = this.animation?.type === 'rainbow' ? this.renderColor : this.originalColor

		const centerX = this.x + this.width / 2
		const centerY = this.y + this.height / 2
		const radius = (Math.min(this.width, this.height) / 2) * (this.renderScale ?? 1)

		ctx.beginPath()
		ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
		ctx.fill()
	}
}
