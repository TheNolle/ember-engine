import { defineGame, DSLContext, CollectibleBuilder, createSceneSwitcher, GlobalSceneManager } from '@core/dsl'
import { GameLoop } from '@core/runtime/GameLoop'
import { PlayerBuilder } from '@core/dsl/builders/PlayerBuilder'

const player = new PlayerBuilder()
	.size(48, 48)
	.tag('player')
	.withCollider()
	.withControls({ left: 'a', right: 'd', up: 'w', down: 's' })
	.withAction('up', _ => movePlayer(player, 'up'))
	.withAction('down', _ => movePlayer(player, 'down'))
	.withAction('left', dt => movePlayer(player, 'left', dt))
	.withAction('right', dt => movePlayer(player, 'right', dt))

defineGame({
	scenes: {
		Main: scene => {
			scene.enableDebug()
			scene.spawnPoint(100, 90)
			scene.addOnce(player)
			scene.follow(player).setZoom(1)

			if (!scene.getAll('coin').length) {
				const coin = new CollectibleBuilder()
					.at(300, 300)
					.size(24, 24)
					.tag('coin')
					.color('gold')
					.onCollect(p => console.log(`${p.id} collected!`))
					.respawnable({ time: 2000 })
				scene.spawn(coin)
			} else {
				(scene.getAll('coin')[0] as CollectibleBuilder).reset()
			}

			const switchBox = createSceneSwitcher('Other').at(500, 352)
			scene.spawn(switchBox)

			scene.spawnGround(0, 400, 1200, 40)
		},

		Other: scene => {
			scene.enableDebug()
			scene.spawnPoint(120, 90)
			scene.addOnce(player)
			scene.follow(player).setZoom(1)

			const switchBox = createSceneSwitcher('Main').at(400, 352)
			scene.spawn(switchBox)

			scene.spawnGround(0, 400, 1200, 40)
		}
	}
})

function movePlayer(player: PlayerBuilder, direction: 'up' | 'down' | 'left' | 'right', dt?: number) {
	switch (direction) {
		case 'up': return player.physics ? player.physics.vy = -400 : player.y -= 400 * (dt ?? 0.016)
		case 'down': return player.physics ? player.physics.vy = 400 : player.y += 400 * (dt ?? 0.016)
		case 'left': return player.physics ? player.physics.vx -= 800 * dt! : player.x -= 800 * (dt ?? 0.016)
		case 'right': return player.physics ? player.physics.vx += 800 * dt! : player.x += 800 * (dt ?? 0.016)
	}
}

GlobalSceneManager.set(DSLContext.getScene('Main')!)

const loop = new GameLoop()
loop.start(
	dt => GlobalSceneManager.update(dt),
	dt => {
		const canvas = document.querySelector('canvas')!
		const ctx = canvas.getContext('2d')!
		GlobalSceneManager.render(ctx)
	}
)
