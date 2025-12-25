// // Automatically execute logout when page loads
// window.addEventListener('DOMContentLoaded', async () => {
//     const logoutMessage = document.getElementById('logoutMessage');
//     const logoutError = document.getElementById('logoutError');

//     try {
//         // Call logout.php to destroy server-side session
//         const response = await fetch('logout.php', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//             }
//         });

//         const data = await response.json();

//         if (data.success) {
//             // Clear local storage
//             localStorage.removeItem('dolphinCrmSession');
            
//             // Show success message
//             logoutMessage.textContent = 'You have been successfully logged out.';
//             logoutMessage.style.display = 'block';
            
//             // Redirect to login page after 2 seconds
//             setTimeout(() => {
//                 window.location.href = 'login_page.php';
//             }, 2000);
//         } else {
//             throw new Error(data.message || 'Logout failed');
//         }
//     } catch (error) {
//         console.error('Logout error:', error);
        
//         // Even if server logout fails, clear local storage
//         localStorage.removeItem('dolphinCrmSession');
        
//         // Show error but still redirect
//         logoutError.textContent = 'Logout completed with errors. Redirecting...';
//         logoutError.style.display = 'block';
        
//         setTimeout(() => {
//             window.location.href = 'login_page.php';
//         }, 2000);
//     }
// });

// Automatically execute logout when page loads
window.addEventListener('DOMContentLoaded', async () => {
    const logoutMessage = document.getElementById('logoutMessage');
    const logoutError = document.getElementById('logoutError');

    console.log('Logout page loaded, starting logout process...'); // Debug log

    try {
        // Call logout.php to destroy server-side session
        const response = await fetch('logout.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });

        console.log('Logout response received'); // Debug log
        const data = await response.json();
        console.log('Logout data:', data); // Debug log

        if (data.success) {
            // Clear local storage
            localStorage.removeItem('dolphinCrmSession');
            
            // Show success message
            logoutMessage.textContent = 'You have been successfully logged out.';
            logoutMessage.style.display = 'block';
            
            console.log('Logout successful, redirecting in 2 seconds...'); // Debug log
            
            // Redirect to login page after 2 seconds
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            throw new Error(data.message || 'Logout failed');
        }
    } catch (error) {
        console.error('Logout error:', error);
        
        // Even if server logout fails, clear local storage
        localStorage.removeItem('dolphinCrmSession');
        
        // Show error but still redirect
        logoutError.textContent = 'Logout completed with errors. Redirecting...';
        logoutError.style.display = 'block';
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    }
});