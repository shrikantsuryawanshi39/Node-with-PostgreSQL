**Node.js + PostgreSQL** 

* **Express.js** for the backend server
* **PostgreSQL** for the database
* **HTML + JavaScript** for the frontend (basic UI interacting via fetch API)

---

```markdown
# Node.js + PostgreSQL + HTML/JS Frontend

This is a full-stack project using:

- ⚙️ **Node.js (Express)** for the backend
- 🐘 **PostgreSQL** as the database
- 🌐 **HTML + JavaScript** for the frontend

---

## 📁 Project Structure

```

node-postgres-ui/
├── server.js                # Express server setup
├── db.js                    # PostgreSQL database connection
├── public/
│   ├── index.html           # Frontend UI
│   └── script.js            # JavaScript logic (fetch API)
├── package.json             # Node dependencies
└── README.md

````

---

## ⚙️ Setup Instructions

### ✅ Prerequisites

- Node.js installed
- PostgreSQL installed and running
- pgAdmin (optional GUI)

---

### 🧑‍💻 Getting Started

1. **Install Dependencies**

```bash
npm install
````

2. **Configure PostgreSQL**

* Make sure PostgreSQL is running
* Create a database (e.g. `mydb`)
* Create a table (example):

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);
```

3. **Edit `db.js`**

Update your PostgreSQL credentials in `db.js`:

```js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'mydb',
  password: 'your_password',
  port: 5432,
});

module.exports = pool;
```

4. **Run the Server**

```bash
node server.js
```

Server runs on:

```
http://localhost:3000
```

---

## 🌐 Frontend

The `index.html` file provides a simple UI for:

* Viewing all users
* Adding a new user
* Deleting users by ID or name

Access it at:

```
http://localhost:3000
```

Make sure the backend is running before using the UI.

---

## 📡 API Endpoints

| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| GET    | `/users`            | Get all users       |
| POST   | `/users`            | Add a new user      |
| DELETE | `/users/:id`        | Delete user by ID   |
| DELETE | `/users/name/:name` | Delete user by name |

---

## 🛠 Technologies Used

* Express.js
* PostgreSQL
* pg (Node.js PostgreSQL client)
* HTML, JavaScript (Fetch API)

---

## 🙋‍♂️ Credits

Author: \[Your Name]

---

## 📌 Notes

* Data is stored permanently in PostgreSQL
* Frontend directly communicates with the backend using `fetch` API
* For PostgreSQL errors, ensure credentials and table structure are correct

```
