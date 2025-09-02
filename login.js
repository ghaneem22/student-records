// التحقق من تسجيل الدخول عند تحميل الصفحة
window.addEventListener('load', function() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        window.location.href = 'dashboard.html';
    }
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim().toLowerCase();
    const password = document.getElementById('password').value.trim();
    
    console.log('محاولة تسجيل الدخول:', { username }); // للتصحيح
    
    // قائمة المستخدمين
    const users = {
        'admin': { password: 'admin123', role: 'admin' },
        'teacher': { password: 'teacher123', role: 'teacher' }
    };
    
    if (users[username] && users[username].password === password) {
        console.log('تم العثور على المستخدم والتحقق من كلمة المرور'); // للتصحيح
        
        // تخزين معلومات المستخدم
        const userData = {
            username: username,
            role: users[username].role
        };
        
        localStorage.setItem('currentUser', JSON.stringify(userData));
        console.log('تم حفظ بيانات المستخدم:', userData); // للتصحيح
        
        // التوجيه إلى لوحة التحكم
        window.location.href = 'dashboard.html';
    } else {
        console.log('فشل تسجيل الدخول - بيانات غير صحيحة'); // للتصحيح
        alert('اسم المستخدم أو كلمة المرور غير صحيحة');
        document.getElementById('password').value = '';
    }
});
