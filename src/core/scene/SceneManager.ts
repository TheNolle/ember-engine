import { Scene } from './Scene'

export class SceneManager {
	private current?: Scene

	set(scene: Scene) {
		if (this.current) this.current.dispose()
		this.current = scene
		this.current.init()
	}

	update(dt: number) {
		this.current?.update(dt)
	}

	render(ctx: CanvasRenderingContext2D) {
		this.current?.render(ctx)
	}
}
