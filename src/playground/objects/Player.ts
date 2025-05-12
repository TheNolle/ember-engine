import { GameObject } from '@core/game/GameObject'

export class Player extends GameObject {
	constructor() {
		super({ width: 48, height: 48 })
		this.addTag('player')
	}
}
