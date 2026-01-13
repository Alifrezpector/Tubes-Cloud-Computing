## Author
Nama: **Fiqri Lathifah Anwar**  
NIM: **1101223302**  
Mata Kuliah: **Tugas Besar Microservices**

# Sistem Registrasi Workshop (Microservices)

Aplikasi backend berbasis microservices untuk sistem registrasi workshop menggunakan Node.js, Express, MySQL, JWT, dan Docker.  
Aplikasi ini menerapkan role-based access control (Admin & User) dan berjalan dalam container Docker terpisah.
## Arsitektur Sistem

Aplikasi terdiri dari 3 service utama:

### 1. Auth Service
- Mengelola:
  - Register
  - Login
  - JWT Token
  - Role pengguna (admin / user)
- Database terpisah (`auth-db`)

### 2. Workshop Service
- Mengelola data workshop
- CRUD workshop
- Proteksi endpoint berbasis role
- Database terpisah (`project-db`)

### 3. Docker & Network
- Setiap service berjalan di container terpisah
- Komunikasi antar service menggunakan Docker Network
- Database credentials disimpan di environment variable

## Role & Hak Akses

### Admin
- Login
- Create workshop
- Read semua workshop
- Update workshop
- Delete workshop

### User
- Login
- Read workshop
- Update workshop milik sendiri
- Tidak bisa create & delete workshop

## Teknologi yang Digunakan

- Node.js
- Express.js
- MySQL
- JWT (JSON Web Token)
- Docker & Docker Compose
- Postman (Testing API)

## Database

### Auth Database (`auth-db`)
Tabel `users`:
- id
- username
- password (hashed)
- role

### Project Database (`project-db`)
Tabel `workshops`:
- id
- title
- quota
- owner_id

---

## Endpoint API

### Auth Service (Port 3001)

| Method | Endpoint | Deskripsi |
|------|--------|---------|
| POST | `/register` | Registrasi user |
| POST | `/login` | Login dan generate JWT |

#### Contoh Register
```json
{
  "username": "admin",
  "password": "admin123",
  "role": "admin"
}
{
  "title": "Backend Microservices",
  "quota": 35
}

## Authorization: Bearer <TOKEN>
| Status Code | Deskripsi             |
| ----------- | --------------------- |
| 400         | Bad Request           |
| 401         | Unauthorized          |
| 403         | Forbidden             |
| 404         | Data tidak ditemukan  |
| 500         | Internal Server Error |


| Method | Endpoint         | Role        |
| ------ | ---------------- | ----------- |
| GET    | `/workshops`     | Admin, User |
| POST   | `/workshops`     | Admin       |
| PUT    | `/workshops/:id` | Admin       |
| DELETE | `/workshops/:id` | Admin       |

1. Clone Repository
git clone <https://github.com/Alifrezpector/Tubes-Cloud-Computing.git>
cd tubes-workshop

2. Jalankan Docker 
docker compose up -d

3. Cek Container
docker ps

4.Testing API

Gunakan Postman:
Login → ambil token
Masukkan token ke Authorization (Bearer Token)

***Deployment**

Aplikasi dijalankan menggunakan Docker Compose dan siap untuk:
Azure App Service
Azure Container Apps
Azure Kubernetes Service (AKS)

**Dokumentasi & Demo**

Seluruh endpoint telah diuji menggunakan Postman
Role admin dan user berjalan sesuai spesifikasi
CRUD workshop berhasil dengan proteksi JWT