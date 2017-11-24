# Serverless Stream Processing

- Run `serverless invoke --function send --path event.json` to send data to the Kinesis stream
- Each batch of N (defaults to 1) messages sent to the stream triggers the `receive` function.

## Setup

### Prerequisites

- Node.js & NPM
- Yarn
- [The Serverless Framework](https://serverless.com/framework/)

### Install dependencies

```
yarn
```

### Running Tests

```
yarn test
```

### Get Test coverage

```
yarn test:coverage
```

### Lint

```
yarn eslint
```

### Running locally
```
serverless offline start
```

### Deploy

```
serverless deploy
```
