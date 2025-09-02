document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // قائمة المستخدمين (يمكن تخزينها في مكان آمن لاحقاً)
    const users = [
        { username: 'admin', password: 'admin123', role: 'admin' },
        { username: 'teacher', password: 'teacher123', role: 'teacher' }
    ];
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        // تخزين معلومات المستخدم
        localStorage.setItem('currentUser', JSON.stringify({
            username: user.username,
            role: user.role
        }));
        
        // التوجيه إلى الصفحة الرئيسية
        window.location.href = 'dashboard.html';
    } else {
        alert('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
});
