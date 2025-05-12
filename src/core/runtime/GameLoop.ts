type LoopCallback = (dt: number) => void

export class GameLoop {
	private lastTime = 0
	private running = false
	private updateFn?: LoopCallback
	private renderFn?: LoopCallback

	start(update: LoopCallback, render: LoopCallback) {
		this.updateFn = update
		this.renderFn = render
		this.running = true
		this.lastTime = performance.now()
		requestAnimationFrame(this.loop)
	}

	stop() {
		this.running = false
	}

	private loop = (time: number) => {
		if (!this.running) return

		const dt = (time - this.lastTime) / 1000
		this.lastTime = time

		this.updateFn?.(dt)
		this.renderFn?.(dt)

		requestAnimationFrame(this.loop)
	}
}
