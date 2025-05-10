# 🧠 Core Concepts

## 1. Game Object System
- Every in-game entity extends `GameObject`
- Supports position, rendering, physics, input, etc.
- Composable with mixins and components

## 2. Scene Lifecycle
- `init()`, `update(dt)`, `render(ctx)`, `dispose()`
- Custom scenes extend base `Scene`

## 3. Modular Subsystems
- `Renderer`, `Input`, `Physics`, `Audio`, `Debug`, etc.
- Cleanly isolated and injectable

## 4. DSL Philosophy
- You should be able to define an entire game in one declarative structure
- Devs only write game logic; engine handles all wiring
