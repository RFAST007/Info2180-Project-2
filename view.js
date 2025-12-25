// Check if user is admin and display users from database
let isAdmin = false;

document.addEventListener('DOMContentLoaded', function() {
    checkAdminStatus();


    // Function to show messages
    function showMessage(message, type) {
        let messageDiv = document.getElementById('message');
        if (!messageDiv) {
            messageDiv = document.createElement('div');
            messageDiv.id = 'message';
            messageDiv.className = 'message';
            document.body.appendChild(messageDiv);
        }
        messageDiv.textContent = message;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }   


    // Navigation menu interactions
    const sideItems = document.querySelectorAll('.side-item');
    sideItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            sideItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Handle logout separately
            if (this.querySelector('.fa-sign-out-alt')) {
                showMessage('You have been logged out successfully', 'success');
                setTimeout(() => {
                    window.location.href = 'logout.html'; //this would redirect to logout page
                }, 1000);
            }


            if (this.querySelector('.fa-address-book')) {
                showMessage('Loading contact form...', 'success');
                setTimeout(() => {
                    window.location.href = '#'; //this would redirect to add user page
                }, 300);
            }

            if (this.querySelector('.fa-users')) {
                showMessage('Loading user list...', 'success');
                setTimeout(() => {
                    window.location.href = 'view-User.html'; //this would redirect to user list page
                }, 300);
            }

            if (this.querySelector('.fa-home')) {
                showMessage('Loading home page...', 'success');
                setTimeout(() => {
                    window.location.href = '#'; //this would redirect to home page
                }, 300);
            }
        });
    });
});

function checkAdminStatus() {
    // Use fetch to check admin status from the server
    fetch('check_admin.php', {
        method: 'GET',
        credentials: 'include' // send cookies for session
    })
    .then(response => response.json())
    .then(data => {
        if (data.loggedIn && data.isAdmin) {
            isAdmin = true;
            showUsersTable();
        } else {
            isAdmin = false;
            showAdminCheck();
        }
    })
    .catch(error => {
        console.error('Error checking admin status:', error);
        showAdminCheck();
    });
}

function showAdminCheck() {
    // Show message or UI for non-admins
    const adminCheck = document.getElementById('adminCheck');
    const usersTableArea = document.getElementById('usersTableArea');
    if (adminCheck) adminCheck.style.display = 'block';
    if (usersTableArea) usersTableArea.style.display = 'none';
}

function showUsersTable() {
    const adminCheck = document.getElementById('adminCheck');
    const usersTableArea = document.getElementById('usersTableArea');
    if (adminCheck) adminCheck.style.display = 'none';
    if (usersTableArea) usersTableArea.style.display = 'block';
    loadUsersData();
}

function loadUsersData() {
    // Fetch users from the database
    fetch('get_users.php', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success && Array.isArray(data.users)) {
            const users = data.users.map(user => {
                const role = user.role ? user.role : 'Member';
                return {
                    id: user.id,
                    fullName: `${user.firstname} ${user.lastname}`,
                    firstName: user.firstname,
                    lastName: user.lastname,
                    email: user.email,
                    role: role.charAt(0).toUpperCase() + role.slice(1),
                    created: user.created_at,
                    initials: (user.firstname?.[0] || '') + (user.lastname?.[0] || '')
                };
            });
            renderUsersTable(users);
        } else {
            renderUsersTable([]);
        }
    })
    .catch(error => {
        console.error('Error loading users:', error);
        renderUsersTable([]);
    });
}

function renderUsersTable(users) {
    const tableBody = document.getElementById('usersTableBody');
    const userCount = document.getElementById('userCount');
    if (userCount) {
        userCount.textContent = `${users.length} user${users.length !== 1 ? 's' : ''}`;
    }
    if (!tableBody) return;
    if (users.length === 0) {
        tableBody.innerHTML = `
            <div class="no-users">
                <h3>No Users Found</h3>
                <p>No users have been added to the system yet.</p>
            </div>
        `;
        return;
    }
    let html = '';
    users.forEach(user => {
        const avatarColor = user.role === 'Admin' ? '#e74c3c' : '#3498db';
        html += `
            <div class="table-row">
                <div class="col-name">
                    <div class="user-avatar-small" style="background-color: ${avatarColor}">
                        ${user.initials}
                    </div>
                    <div>
                        <strong>${user.fullName}</strong>
                    </div>
                </div>
                <div class="col-email">${user.email}</div>
                <div class="col-role">
                    <span class="role-badge ${user.role.toLowerCase() === 'admin' ? 'role-admin' : 'role-member'}">
                        ${user.role}
                    </span>
                </div>
                <div class="col-created">${formatDate(user.created)}</div>
            </div>
        `;
    });
    tableBody.innerHTML = html;
}




function formatDate(dateString) {
    // If dateString is missing or invalid, use current date
    let date;
    if (!dateString || isNaN(Date.parse(dateString))) {
        date = new Date();
    } else {
        date = new Date(dateString);
    }
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function loginAsAdmin() {
    // Basic admin login: prompt for password
    const password = prompt('Enter admin password:');
    // For demo, use a hardcoded password
    if (password === 'admin123') {
        isAdmin = true;
        showUsersTable();
        alert('Logged in as administrator');
    } else {
        alert('Incorrect password. Access denied.');
    }
}
