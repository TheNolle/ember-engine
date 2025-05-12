import { SceneBuilder } from './builders/SceneBuilder'

export const DSLContext = {
	scenes: new Map<string, SceneBuilder>(),

	registerScene(name: string, scene: SceneBuilder) {
		this.scenes.set(name, scene)
	},

	getScene(name: string) {
		return this.scenes.get(name)
	}
}

export function defineGame({
	scenes
}: {
	scenes: Record<string, (scene: SceneBuilder) => void>
}) {
	for (const [name, logic] of Object.entries(scenes)) {
		const builder = new SceneBuilder(name)
		builder.define(logic)
		DSLContext.registerScene(name, builder)
	}
}
