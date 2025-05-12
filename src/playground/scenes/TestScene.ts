import { Scene } from '@core/scene/Scene'
import { Canvas2DRenderer } from '@core/renderer/Canvas2DRenderer'
import { Rect } from '@core/renderer/shapes/Rect'

export class TestScene extends Scene {
	private renderer = new Canvas2DRenderer()
	private objects = [new Rect(100, 100, 100, 100, 'lime')]

	init(): void {
		const canvas = document.querySelector('canvas')!
		this.renderer.init(canvas)
		this.objects.forEach(obj => this.renderer.add(obj))
	}

	update(dt: number): void {
		this.objects[0].x += dt * 100
	}

	render(): void {
		this.renderer.clear()
		this.renderer.render()
	}

	dispose(): void {
	}
}
