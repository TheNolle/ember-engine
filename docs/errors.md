# 🚨 Error System

Errors in Ember Engine are not generic. They are explicit, contextual, and educational.

## Goals

- Identify *what* broke, *where* it happened, and *why*
- Offer suggestions like "Did you forget to call `init()`?"
- Link to relevant documentation
- Show related objects (in-game) when debug mode is on

## Structure

```ts
new EmberEngineError('MissingComponent', {
  object: 'Player',
  expected: 'RigidBody',
  suggestion: 'Use player.addComponent(new RigidBody())'
})
```
