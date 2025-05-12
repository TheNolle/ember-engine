import { GameObject } from '../GameObject'
import { aabb } from '@core/physics/collisions'

type CollisionCallback = (other: GameObject) => void

export class ColliderComponent {
	private callbacks: Map<string, CollisionCallback> = new Map()

	on(tag: string, callback: CollisionCallback) {
		this.callbacks.set(tag, callback)
	}

	check(self: GameObject, others: GameObject[]) {
		for (const other of others) {
			if (self === other) continue
			if (!aabb(self, other)) continue

			for (const tag of other.tags) {
				if (this.callbacks.has(tag)) {
					this.callbacks.get(tag)!(other)
				}
			}
		}
	}
}
