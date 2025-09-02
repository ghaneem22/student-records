// التحقق من تسجيل الدخول
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    // عرض اسم المستخدم
    document.getElementById('userDisplay').textContent = `مرحباً ${user.username}`;
}

// تسجيل الخروج
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
});

// تحديث الإحصائيات
function updateStats() {
    // إجمالي الطلاب
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    document.getElementById('totalStudents').textContent = students.length;

    // حساب نسبة الحضور
    const attendance = JSON.parse(localStorage.getItem('attendance') || '[]');
    const today = new Date().toISOString().split('T')[0];
    const todayAttendance = attendance.filter(a => a.date === today);
    const presentCount = todayAttendance.filter(a => a.status === 'present').length;
    const attendanceRate = todayAttendance.length ? 
        Math.round((presentCount / todayAttendance.length) * 100) : 0;
    document.getElementById('attendanceRate').textContent = `${attendanceRate}%`;

    // حساب متوسط الدرجات
    const grades = students.map(s => (Number(s.term1) + Number(s.term2) + Number(s.final)) / 3);
    const averageGrade = grades.length ? 
        Math.round(grades.reduce((a, b) => a + b) / grades.length) : 0;
    document.getElementById('averageGrade').textContent = averageGrade;
}

// عرض التقارير
function showReports() {
    // يمكن إضافة المزيد من التقارير هنا
    alert('سيتم إضافة التقارير قريباً');
}

// تنفيذ عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    updateStats();
});
