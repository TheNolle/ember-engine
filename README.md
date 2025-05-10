# 🔥 Ember Engine

> A fully modular TypeScript-powered game engine supporting 2D + 3D graphics, NPCs, physics, AI, multiplayer, and DSL-based game definitions — all with ultra-detailed error handling and debug mode.

## 🚀 Features

- ✅ Declarative game scenes via idiomatic DSL
- 🎮 2D-first, extendable to 3D
- 👾 NPCs with customizable AI & FSM
- 🌀 Gravity, collisions, and rigid body physics
- 🎭 Scene, menu, object, and text systems
- 🧪 Debug overlay and dev console
- 👥 Local multiplayer support
- 🧱 Modular, OOP, DRY code architecture
- 📚 Fully documented with JSDoc

## 📦 Usage (WIP)
```ts
import { defineGame } from 'ember-engine'

defineGame({
  scenes: {
    Main: scene => {
      scene.addPlayer('nolly')
      scene.addNPC({ name: 'Guard', ai: 'patrol' })
    }
  }
})
```

## 📚 Documentation

> Check the full API & concepts in [/docs](./docs)

## 🛠️ Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md)

## 🪪 License

[NFE-OSL v1.0](https://cafe.thenolle.com/nfe-osl/) — open-source but ethical.
