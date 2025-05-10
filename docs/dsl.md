# 📝 DSL Guide

Ember Engine is designed around an idiomatic game DSL — structured declaratively using TypeScript functions.

## Example

```ts
defineGame({
  scenes: {
    Main: scene => {
      scene.addText('Hello!').center()
      scene.addPlayer('Hero')
    }
  }
})
```

## Supported Nodes

- `addText()`, `addImage()`, `addNPC()`, `addPlayer()`
- `onClick()`, `onCollide()`, `onEnterZone()`
- Scene chaining: `scene.next('GameOver')`

## Philosophy
- Every DSL call is type-safe and auto-completable
- Every scene is a sandboxed, declarative graph
