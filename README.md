# Client - Simple Chat Application

This is the client-side application for the Simple Chat Application. It provides a responsive and interactive user interface for real-time messaging, built using **Vue 3**, **Pinia**, and **Socket.IO Client**.

---

## Features

- **Real-Time Messaging:** Powered by Socket.IO.
- **Responsive Design:** Optimized for both mobile and desktop.
- **Modern UI:** Built with PrimeVue.

---

## Requirements

- **Node.js:** v20.12.2
- **pnpm:** v9.12.2

---

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

---

## Installation

### Step 1: Clone the Repository

````bash
git clone https://github.com/mehdisolhan/vue-realtime-chat-app.git
cd vue-realtime-chat-app/client
````

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Compile and Minify for Production

```sh
pnpm build
```

```sh
pnpm lint
```

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

### Lint with [ESLint](https://eslint.org/)


# Server - Simple Chat Application

This is the server-side application for the Simple Chat Application. It manages real-time communication using **Express.js** and **Socket.IO**, with a limit of two users per chat room.

---

## Features

- **Socket.IO Backend:** Real-time communication.
- **User Limit Enforcement:** Only two users allowed per room.
- **Scalable and Lightweight:** Designed for simplicity.

---

## Requirements

- **Node.js:** v20.12.2
- **pnpm:** v9.12.2

---

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/mehdisolhan/vue-realtime-chat-app.git
cd vue-realtime-chat-app/server
```

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm start
```
