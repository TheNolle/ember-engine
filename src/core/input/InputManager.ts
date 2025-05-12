export class InputManager {
	private keysDown: Set<string> = new Set()
	private keysPressed: Set<string> = new Set()
	private keysReleased: Set<string> = new Set()

	constructor() {
		window.addEventListener('keydown', this.onKeyDown)
		window.addEventListener('keyup', this.onKeyUp)
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

	update(): void {
		this.keysPressed.clear()
		this.keysReleased.clear()
	}

	isDown(key: string): boolean {
		return this.keysDown.has(key)
	}

	isPressed(key: string): boolean {
		return this.keysPressed.has(key)
	}

	isReleased(key: string): boolean {
		return this.keysReleased.has(key)
	}

	dispose(): void {
		window.removeEventListener('keydown', this.onKeyDown)
		window.removeEventListener('keyup', this.onKeyUp)
	}
}
