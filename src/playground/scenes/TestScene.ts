import { Scene } from '@core/scene/Scene'
import { Canvas2DRenderer } from '@core/renderer/Canvas2DRenderer'
import { Rect } from '@core/renderer/shapes/Rect'
import { Player } from '../objects/Player'

export class TestScene extends Scene {
	private renderer = new Canvas2DRenderer()
	private player = new Player()
	private playerShape = new Rect(this.player.x, this.player.y, this.player.width, this.player.height, 'cyan')

	init(): void {
		const canvas = document.querySelector('canvas')!
		this.renderer.init(canvas)
		this.renderer.add(this.playerShape)
	}

	update(dt: number): void {
		this.player.x += dt * 60
		this.playerShape.x = this.player.x
	}

	render(): void {
		this.renderer.clear()
		this.renderer.render()
	}

	dispose(): void {
	}
}
