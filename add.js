document.addEventListener('DOMContentLoaded', function() {
            // Toggle password visibility
            const togglePassword = document.getElementById('togglePassword');
            const passwordInput = document.getElementById('password');
            
            togglePassword.addEventListener('click', function() {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                this.innerHTML = type === 'password' ? '<i class="far fa-eye"></i>' : '<i class="far fa-eye-slash"></i>';
            });
            
            // Form submission
            const userForm = document.getElementById('userForm');
            const messageDiv = document.getElementById('message');
            
            userForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const firstName = document.getElementById('firstName').value.trim();
                const lastName = document.getElementById('lastName').value.trim();
                const email = document.getElementById('email').value.trim();
                const password = document.getElementById('password').value;
                const role = document.querySelector('input[name="role"]:checked').value;
                const saveBtn = document.querySelector('.btn-save');
                
                // Simple validation
                if (!firstName || !lastName || !email || !password) {
                    showMessage('Please fill in all required fields', 'error');
                    return;
                }
                
                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    showMessage('Please enter a valid email address', 'error');
                    return;
                }
                
                // Password validation (at least 8 characters)
                if (password.length < 8) {
                    showMessage('Password must be at least 8 characters long', 'error');
                    return;
                }

                const formData = new FormData();
                formData.append('firstName', firstName);
                formData.append('lastName', lastName);
                formData.append('email', email);
                formData.append('password', password);
                formData.append('role', role);
                
                // Using Fetch API to send data to PHP
                fetch('add_user.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        showMessage(data.message, 'success');
                        // Reset form after a delay
                        setTimeout(() => {
                            userForm.reset();
                            // Reset the password visibility icon
                            passwordInput.setAttribute('type', 'password');
                            togglePassword.innerHTML = '<i class="far fa-eye"></i>';
                        }, 2000);
                        
                    } else {
                        showMessage(data.message, 'error');
                    }
                });
                /*.catch(error => {
                    showMessage('Error saving user: ' + error.message, 'error');
                })
                .finally(() => {
                    // Restore button
                    saveBtn.innerHTML = originalText;
                    saveBtn.disabled = false;
                });*/
                
                
                
             
                
                
            });
            
            // Function to show messages
            function showMessage(message, type) {
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
                            window.location.href = '#'; //this would redirect to logout page
                        }, 1000);
                    }


                    if (this.querySelector('.fa-address-book')) {
                        showMessage('Loading contact form...', 'success');
                        setTimeout(() => {
                            window.location.href = 'user-add.html'; //this would redirect to add user page
                        }, 300);
                    }

                    if (this.querySelector('.fa-users')) {
                        showMessage('Loading user list...', 'success');
                        setTimeout(() => {
                            window.location.href = '#'; //this would redirect to user list page
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