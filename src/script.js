
const apiURL = 'http://localhost:3000/users';

async function addUser() {
    const id = document.getElementById('id').value.trim();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (!id || !name || !email) {
        alert("Please fill all fields: ID, Name, Email.");
        return;
    }

    const response = await fetch(apiURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: parseInt(id), name, email })
    });

    const result = await response.json();
    alert('User added: ' + JSON.stringify(result));


    // Clear input fields
    document.getElementById('id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
}

async function getUsers() {
    const response = await fetch(apiURL);
    const users = await response.json();

    if (users.length === 0) {
        document.getElementById('users').innerHTML = 'No users found.';
        return;
    }

    let html = `
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
  `;

    users.forEach(user => {
        html += `
      <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
      </tr>
    `;
    });

    html += `
      </tbody>
    </table>
  `;

    document.getElementById('users').innerHTML = html;
}

async function deleteUser() {
    const input = document.getElementById('deleteInput').value.trim();

    if (!input) {
        alert("Please enter a User ID or Name to delete.");
        return;
    }

    const response = await fetch(`${apiURL}/${input}`, {
        method: 'DELETE'
    });

    const result = await response.json();
    alert(result.message || result.error || "User deleted.");

    // Clear delete input field
    document.getElementById('deleteInput').value = '';
}