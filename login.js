// دالة لتشفير كلمة المرور بشكل بسيط (للعرض فقط - لا تستخدم في الإنتاج)
function hashPassword(password) {
    return Array.from(password).reduce(
        (hash, char) => ((hash << 5) - hash) + char.charCodeAt(0), 0
    ).toString(36);
}

// تنظيف المدخلات
function sanitizeInput(input) {
    return input.replace(/[<>]/g, '');
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = sanitizeInput(document.getElementById('username').value);
    const password = document.getElementById('password').value;
    
    // قائمة المستخدمين (يمكن تخزينها في مكان آمن لاحقاً)
    const users = [
        { username: 'admin', password: hashPassword('admin123'), role: 'admin' },
        { username: 'teacher', password: hashPassword('teacher123'), role: 'teacher' }
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
