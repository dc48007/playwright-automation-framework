# Callback Examples and Flow

This file shows the same operation implemented three ways: callback-style, Promise, and async/await.

**Code file:** [src/files/practisecallback.js](src/files/practisecallback.js#L1)

## Mermaid flow diagram

```mermaid
flowchart TD
  A[Caller starts] --> B[Call function with callback]
  B --> C[Function begins async work]
  C --> D[Async work completes]
  D --> E[Function invokes callback(result)]
  E --> F[Caller callback runs with result]
  F --> G[Caller continues processing]

  subgraph PromiseFlow [Promise / async-await]
    B2[Caller calls function returning Promise] --> C2[Function begins async work]
    C2 --> D2[Async work completes]
    D2 --> E2[Promise resolves/rejects]
    E2 --> F2[Caller handles with .then/.catch or await]
  end
```

## Quick explanation (layman)
- A callback is like giving someone your phone number and asking them to call when the job's done.
- A Promise is like a tracking number you can attach handlers to, and `async/await` lets you write that waiting in a natural way.

## How to view
- Open the file in VS Code; many Markdown previewers render Mermaid diagrams. Alternatively use an online Mermaid live editor.
