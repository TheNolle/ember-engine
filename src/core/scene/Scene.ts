export abstract class Scene {
	abstract init(): void
	abstract update(dt: number): void
	abstract render(ctx: CanvasRenderingContext2D): void
	abstract dispose(): void
}
