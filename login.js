document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    // قائمة المستخدمين
    const users = [
        { username: 'admin', password: 'admin123', role: 'admin' },
        { username: 'teacher', password: 'teacher123', role: 'teacher' }
    ];
    
    const user = users.find(u => 
        u.username === username && 
        u.password === password
    );
    
    if (user) {
        // تخزين معلومات المستخدم
        localStorage.setItem('currentUser', JSON.stringify({
            username: user.username,
            role: user.role
        }));
        
        // التوجيه إلى لوحة التحكم
        window.location.href = 'dashboard.html';
    } else {
        alert('اسم المستخدم أو كلمة المرور غير صحيحة');
        // تفريغ حقل كلمة المرور
        document.getElementById('password').value = '';
    }
});
