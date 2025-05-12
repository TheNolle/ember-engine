type Action = string

export class InputManager {
	private keysDown: Set<string> = new Set()
	private keysPressed: Set<string> = new Set()
	private keysReleased: Set<string> = new Set()

	private bindings: Map<Action, string> = new Map()

	constructor() {
		window.addEventListener('keydown', this.onKeyDown)
		window.addEventListener('keyup', this.onKeyUp)
	}

	bind(action: Action, key: string): void {
		this.bindings.set(action, key)
	}

	unbind(action: Action): void {
		this.bindings.delete(action)
	}

	getKey(action: Action): string | undefined {
		return this.bindings.get(action)
	}

	isDown(action: Action): boolean {
		const key = this.getKey(action)
		return !!key && this.keysDown.has(key)
	}

	isPressed(action: Action): boolean {
		const key = this.getKey(action)
		return !!key && this.keysPressed.has(key)
	}

	isReleased(action: Action): boolean {
		const key = this.getKey(action)
		return !!key && this.keysReleased.has(key)
	}

	update(): void {
		this.keysPressed.clear()
		this.keysReleased.clear()
	}

	dispose(): void {
		window.removeEventListener('keydown', this.onKeyDown)
		window.removeEventListener('keyup', this.onKeyUp)
	}

	private onKeyDown = (e: KeyboardEvent) => {
		if (!this.keysDown.has(e.key)) {
			this.keysPressed.add(e.key)
		}
		this.keysDown.add(e.key)
	}

	private onKeyUp = (e: KeyboardEvent) => {
		this.keysDown.delete(e.key)
		this.keysReleased.add(e.key)
	}
}
