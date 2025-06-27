# IT Info Website

## 🛠 Technologies

- **Frontend**: React, React Router, Axios  
- **Backend**: Express.js, Sequelize, MySQL2  
- **Database**: MySQL 8  
- **Containerization**: Docker + Docker Compose  
- **Database GUI**: phpMyAdmin

---

## 📁 Project Structure

```
info-website/
├── backend/           # Express + Sequelize API
├── frontend/          # React App
├── db/
│   └── init.sql       # SQL file for DB initialization
├── .env               # Environment variables (you create this manually)
├── docker-compose.yml
├── README.md
```

---

## How to Run the Project 

### 1. Clone the Repository

```bash
git clone https://github.com/Maurice010/info-website.git
cd info-website
```

---

### 2. Create the `.env` File

Create a `.env` file in the project root and paste this:

```env
DB_HOST=mysql
DB_USER=admin
DB_PASSWORD=admin123
DB_NAME=infodb
```

---

### 3. Start the Containers

```bash
docker compose up --build
```