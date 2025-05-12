import { ObjectBuilder } from '../builders/ObjectBuilder'
import { DSLContext } from '../DSLContext'
import { SceneManager } from '@core/scene/SceneManager'

const manager = new SceneManager()

export function createSceneSwitcher(targetScene: string): ObjectBuilder {
	const box = new ObjectBuilder()
		.size(48, 48)
		.color('purple')
		.tag('switcher')
		.withCollider()
		.onCollide('player', () => {
			const scene = DSLContext.getScene(targetScene)
			if (scene) manager.set(scene)
		})
	return box
}

export const GlobalSceneManager = manager
