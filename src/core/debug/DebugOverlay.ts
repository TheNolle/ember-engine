import { Drawable } from '@core/renderer/Drawable'

export class DebugOverlay extends Drawable {
	private fps = 0
	private frameCount = 0
	private lastTime = performance.now()

	private fpsLine = ''
	private infoLines: string[] = []

	update(dt: number, players: Array<{ x: number; y: number; vx: number; vy: number; isGrounded: boolean }>) {
		const now = performance.now()
		this.frameCount++
		if (now - this.lastTime >= 1000) {
			this.fps = this.frameCount
			this.frameCount = 0
			this.lastTime = now
		}

		this.fpsLine = `🖥️ FPS: ${this.fps}`
		this.infoLines = [
			`Players: ${players.length}`,
			...players.map((player, index) => {
				return `Player ${index + 1}:\n` +
					`  Position: (${player.x.toFixed(1)}, ${player.y.toFixed(1)})` +
					`  Velocity: (${player?.vx?.toFixed(1) ?? '0.0'}, ${player?.vy?.toFixed(1) ?? '0.0'})` +
					`  Grounded: ${player.isGrounded ? 'Yes' : 'No'}` +
					`  Has Physics: ${!player.vx && !player.vy ? 'No' : 'Yes'}`
			})
		]
	}


	draw(ctx: CanvasRenderingContext2D): void {
		ctx.font = '14px monospace'
		ctx.fillStyle = 'lime'
		ctx.textAlign = 'left'
		ctx.fillText(this.fpsLine, 10, 20)
		this.infoLines.forEach(line => ctx.fillText(line, 10, 40 + this.infoLines.indexOf(line) * 20))
	}
}
