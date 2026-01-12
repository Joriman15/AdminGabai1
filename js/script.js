// script.js

const users = [
    { name: 'John Smith', email: 'john@example.com', role: 'super-admin', status: 'active' },
    { name: 'Jane Doe', email: 'jane@example.com', role: 'admin', status: 'active' },
    { name: 'Mike Johnson', email: 'mike@example.com', role: 'moderator', status: 'active' }
];

let editingIndex = -1;

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));
    
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(n => n.classList.remove('active'));
    
    document.getElementById(pageId).classList.add('active');
    event.target.closest('.nav-item').classList.add('active');
    
    const titles = {
        'monitoring': 'System Monitoring',
        'users': 'User Management',
        'logs': 'Log Review'
    };
    document.getElementById('page-title').textContent = titles[pageId];
}

function openAddUserModal() {
    editingIndex = -1;
    document.getElementById('modal-title').textContent = 'Add New User';
    document.getElementById('user-form').reset();
    document.getElementById('user-modal').classList.add('active');
}

function editUser(index) {
    editingIndex = index;
    const user = users[index];
    document.getElementById('modal-title').textContent = 'Edit User';
    document.getElementById('user-name').value = user.name;
    document.getElementById('user-email').value = user.email;
    document.getElementById('user-role').value = user.role;
    document.getElementById('user-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('user-modal').classList.remove('active');
}

function deleteUser(index) {
    if (confirm('Are you sure you want to remove this user?')) {
        users.splice(index, 1);
        renderUsers();
    }
}

function renderUsers() {
    const tbody = document.getElementById('users-table');
    tbody.innerHTML = users.map((user, index) => {
        const roleClass = {
            'super-admin': 'danger',
            'admin': 'info',
            'moderator': 'warning',
            'viewer': 'success'
        }[user.role];
        
        const roleText = {
            'super-admin': 'Super Admin',
            'admin': 'Admin',
            'moderator': 'Moderator',
            'viewer': 'Viewer'
        }[user.role];

        return `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td><span class="badge badge-${roleClass}">${roleText}</span></td>
                <td><span class="badge badge-success">Active</span></td>
                <td>
                    <div class="action-btns">
                        <button class="btn btn-secondary" onclick="editUser(${index})">Edit</button>
                        <button class="btn btn-danger" onclick="deleteUser(${index})">Remove</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

document.getElementById('user-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const userData = {
        name: document.getElementById('user-name').value,
        email: document.getElementById('user-email').value,
        role: document.getElementById('user-role').value,
        status: 'active'
    };

    if (editingIndex >= 0) {
        users[editingIndex] = userData;
    } else {
        users.push(userData);
    }

    renderUsers();
    closeModal();
});

function refreshLogs() {
    alert('Logs refreshed!');
}

// Close modal when clicking outside
document.getElementById('user-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});