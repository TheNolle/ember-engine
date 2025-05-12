import { ObjectBuilder } from './ObjectBuilder'
import { InputManager, Action } from '@core/input/InputManager'
import { Drawable } from '@core/renderer/Drawable'

export class PlayerBuilder extends ObjectBuilder implements Drawable {
	private input = new InputManager()
	private actionHandlers: Record<string, (dt: number) => void> = {}
	private bindings: Record<Action, string> = {}

	withControls(bindings: Record<Action, string>): PlayerBuilder {
		this.bindings = bindings
		for (const action in bindings) {
			this.input.bind(action, bindings[action])
		}
		return this
	}

	withAction(action: string, handler: (dt: number) => void): PlayerBuilder {
		this.actionHandlers[action] = handler
		return this
	}

	update(dt: number) {
		this.input.update()

		for (const action of Object.keys(this.actionHandlers)) {
			if (this.input.isDown(action) || this.input.isPressed(action)) {
				this.actionHandlers[action]?.(dt)
			}
		}

		if (this.physics) {
			this.physics.apply(dt, this)
		} else {
			this.x += 0
			this.y += 0
		}
	}

	draw(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = 'cyan'
		ctx.fillRect(this.x, this.y, this.width, this.height)
	}
}
