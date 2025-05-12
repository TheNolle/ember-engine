import { Drawable } from '@core/renderer/Drawable'

export class DebugOverlay extends Drawable {
	private fps = 0
	private frameCount = 0
	private lastTime = performance.now()

	private fpsLine = ''
	private infoLine = ''

	update(dt: number, players: Array<{ x: number; y: number; vx: number; vy: number; isGrounded: boolean }>) {
		const now = performance.now()
		this.frameCount++
		if (now - this.lastTime >= 1000) {
			this.fps = this.frameCount
			this.frameCount = 0
			this.lastTime = now
		}

		this.fpsLine = `🖥️ FPS: ${this.fps}`
		this.infoLine = players.map((p, i) => `P${i + 1}: (${p.x.toFixed(1)}, ${p.y.toFixed(1)}) | V(${p.vx.toFixed(1)}, ${p.vy.toFixed(1)}) | G:${p.isGrounded}`).join('  |  ')
		this.infoLine += ` | Players: ${players.length}`
	}


	draw(ctx: CanvasRenderingContext2D): void {
		ctx.font = '14px monospace'
		ctx.fillStyle = 'lime'
		ctx.textAlign = 'left'
		ctx.fillText(this.fpsLine, 10, 20)
		ctx.fillText(this.infoLine, 10, 40)
	}
}
