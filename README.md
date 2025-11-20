### 🐶 `pet`
- Información básica de las mascotas: nombre, especie, raza, tamaño, edad
- Relación con su dueño (ownerId) y validaciones
- Comandos RMQ: crear, actualizar, eliminar, listar por dueño, validar, y `delete_pet` usado para compensación de sagas.
- Postgres + RabbitMQ (`pet_queue`).

#### Arranque rápido
```bash
npm install
npm run start:dev
```

#### CI sugerido
- `npm ci`
- `npm test`
