# SDS - Control del Ciclo de Vida de <u>JWT</u>
Implementación del Patrón Refresh Token para Revocación Efectiva.


## 📖 Descripción
Este módulo implementa una estrategia de control del ciclo de vida de tokens JWT utilizando el patrón **Refresh Token**, con el objetivo de permitir la **revocación efectiva** de sesiones y mejorar la seguridad de autenticación en sistemas distribuidos.

## 🧠 Arquitectura
El sistema sigue el patrón **Token + Refresh Token**, donde:
1. El usuario obtiene un `access_token` y un `refresh_token`.
2. El `access_token` tiene una vida útil corta.
3. El `refresh_token` se usa para solicitar nuevos tokens y puede ser revocado por el servidor.

## 🧩 Tecnologías
- NestJS
- PostgreSQL
- Docker

## 👨‍💻 Autores:
- Nieto Federico - 79542
- Revol Lisandro - 66456
- Martos Leonel Agustín – 94297