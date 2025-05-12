import { defineGame, DSLContext } from '@core/dsl'
import { GameLoop } from '@core/runtime/GameLoop'
import { SceneManager } from '@core/scene/SceneManager'
import { PlayerBuilder } from '@core/dsl/builders/PlayerBuilder'

defineGame({
	scenes: {
		Main: scene => {
			scene.enableDebug()
			const player1: PlayerBuilder = new PlayerBuilder()
				.at(110, 90)
				.size(48, 48)
				.tag('player1')
				.withControls({ left: 'a', right: 'd', jump: 'w', fall: 's' })
				.withAction('jump', _ => movePlayer(player1, 'up'))
				.withAction('fall', _ => movePlayer(player1, 'down'))
				.withAction('left', dt => movePlayer(player1, 'left', dt))
				.withAction('right', dt => movePlayer(player1, 'right', dt))

			const player2: PlayerBuilder = new PlayerBuilder()
				.at(200, 110)
				.size(48, 48)
				.tag('player2')
				.withPhysics()
				.withControls({ left: 'ArrowLeft', right: 'ArrowRight', jump: 'ArrowUp', fall: 'ArrowDown' })
				.withAction('jump', _ => movePlayer(player2, 'up'))
				.withAction('fall', _ => movePlayer(player2, 'down'))
				.withAction('left', dt => movePlayer(player2, 'left', dt))
				.withAction('right', dt => movePlayer(player2, 'right', dt))

			scene.spawn(player1)
			scene.spawn(player2)

			scene.follow(player1).setZoom(1.5)
		}
	}
})

const movePlayer = (player: PlayerBuilder, direction: 'up' | 'down' | 'left' | 'right', dt?: number) => {
	switch (direction) {
		case 'up': return player.physics ? player.physics.vy = -400 : player.y -= 400 * (dt ?? 0.016)
		case 'down': return player.physics ? player.physics.vy = 400 : player.y += 400 * (dt ?? 0.016)
		case 'left': return player.physics ? player.physics.vx -= 800 * dt! : player.x -= 800 * (dt ?? 0.016)
		case 'right': return player.physics ? player.physics.vx += 800 * dt! : player.x += 800 * (dt ?? 0.016)
	}
}

const manager = new SceneManager()
manager.set(DSLContext.getScene('Main')!)

const loop = new GameLoop()
loop.start(dt => manager.update(dt), dt => {
	const canvas = document.querySelector('canvas')!
	const ctx = canvas.getContext('2d')!
	manager.render(ctx)
})
