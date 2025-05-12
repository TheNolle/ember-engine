export interface Renderer {
	/** Called once on init */
	init(canvas: HTMLCanvasElement): void

	/** Clears the screen before drawing */
	clear(): void

	/** Called every frame */
	render(): void
}
