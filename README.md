# 📲 SMS Campaign Manager

Aplicación Full Stack para gestionar campañas de SMS, contactos y estadísticas, desarrollada con React, Node.js, Express y MySQL.

El proyecto permite crear campañas, administrar contactos, enviar campañas y visualizar métricas desde un dashboard, implementando autenticación con JWT y una arquitectura en capas.

---

## 🚀 Demo

🌐 Frontend:
https://TU-APP.vercel.app](https://sms-campaign-manager-nine.vercel.app/

⚙️ Backend API:
https://sms-campaign-manager-backend.onrender.com

---

## ✨ Funcionalidades

- 🔐 Autenticación mediante JWT.
- 👥 CRUD completo de contactos.
- 📢 CRUD completo de campañas.
- 🔗 Asociación de contactos a campañas.
- 📊 Dashboard con estadísticas.
- 📅 Registro de fecha de envío.
- 📄 Paginación de campañas.
- 🔍 Búsqueda por nombre.
- ✅ Validaciones en frontend y backend.
- 🎨 Interfaz moderna con Tailwind CSS.
- ⚠️ Confirmaciones y alertas con SweetAlert2.

---

## 🛠 Tecnologías utilizadas

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router
- SweetAlert2

### Backend

- Node.js
- Express
- Sequelize
- MySQL
- JWT
- bcryptjs
- dotenv

### Base de datos

- MySQL
- Sequelize ORM

### Deploy

- Vercel
- Render
- Aiven

---

## 📚 Conceptos aplicados

- Arquitectura MVC.
- Arquitectura Controller / Service / Model.
- REST API.
- Autenticación con JWT.
- Middleware de autenticación.
- Relaciones Many-to-Many.
- Sequelize ORM.
- CRUD completo.
- Validación de datos.
- Paginación.
- Búsqueda.
- Variables de entorno.
- Deploy Full Stack.

---

## 📂 Estructura del proyecto

```
sms-campaign-manager
│
├── backend
│   ├── controllers
│   ├── services
│   ├── models
│   ├── routes
│   ├── middlewares
│   ├── config
│   └── server.js
│
└── frontend
    ├── components
    ├── pages
    ├── services
    ├── assets
    └── App.jsx
```


## 🔐 Variables de entorno

Backend

```env
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=
JWT_SECRET=
```

Frontend

```env
VITE_API_URL=
```

---

## 🎯 Objetivo

Desarrollar una aplicación Full Stack moderna para demostrar conocimientos en desarrollo frontend y backend, autenticación con JWT, bases de datos relacionales, consumo de APIs REST y despliegue en la nube.

---

## 📖 Aprendizajes

Durante este proyecto se trabajó con:

- React.
- Express.
- Node.js.
- Sequelize.
- MySQL.
- JWT.
- Tailwind CSS.
- Relaciones Many-to-Many.
- Arquitectura en capas.
- Deploy con Render.
- Deploy con Vercel.
- Base de datos en Aiven.

---

## 🚀 Próximas mejoras

- Responsive para dispositivos móviles.
- Filtros avanzados.
- Historial de campañas.
- Roles de usuario (Administrador / Operador).
- Envío real de SMS mediante API externa.

---

## 👨‍💻 Autor

**Lautaro Van Hoorenbeeck**

🔗 LinkedIn:
https://www.linkedin.com/in/lautaro-van-hoorenbeeck/

💻 GitHub:
https://github.com/Lautarovh27
