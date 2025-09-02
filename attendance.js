// التحقق من تسجيل الدخول
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        window.location.href = 'login.html';
    }
}

// تحميل قائمة الصفوف من السجل الدراسي
function loadClasses() {
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const classes = [...new Set(students.map(s => s.grade))];
    const select = document.getElementById('classSelect');
    select.innerHTML = '<option value="">اختر الصف...</option>';
    classes.forEach(className => {
        const option = document.createElement('option');
        option.value = className;
        option.textContent = className;
        select.appendChild(option);
    });
}

// تحميل قائمة الطلاب للصف المحدد
function loadStudents() {
    const selectedClass = document.getElementById('classSelect').value;
    const date = document.getElementById('attendanceDate').value;
    
    if (!selectedClass || !date) {
        alert('الرجاء اختيار الصف والتاريخ');
        return;
    }

    const students = JSON.parse(localStorage.getItem('students') || '[]')
        .filter(s => s.grade === selectedClass);
    
    const tbody = document.querySelector('#attendanceTable tbody');
    tbody.innerHTML = '';

    students.forEach(student => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${student.name}</td>
            <td>
                <select class="attendance-status" data-student="${student.id}">
                    <option value="present">حاضر</option>
                    <option value="absent">غائب</option>
                    <option value="late">متأخر</option>
                </select>
            </td>
            <td>
                <input type="text" class="attendance-note" data-student="${student.id}">
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// حفظ سجل الحضور
function saveAttendance() {
    const date = document.getElementById('attendanceDate').value;
    const selectedClass = document.getElementById('classSelect').value;
    
    if (!date || !selectedClass) {
        alert('الرجاء اختيار التاريخ والصف');
        return;
    }

    const attendance = [];
    const statuses = document.querySelectorAll('.attendance-status');
    const notes = document.querySelectorAll('.attendance-note');

    statuses.forEach((select, index) => {
        attendance.push({
            studentId: select.dataset.student,
            date: date,
            status: select.value,
            note: notes[index].value
        });
    });

    // حفظ سجل الحضور في localStorage
    const existingRecords = JSON.parse(localStorage.getItem('attendance') || '[]');
    const newRecords = existingRecords.filter(r => r.date !== date);
    localStorage.setItem('attendance', JSON.stringify([...newRecords, ...attendance]));

    alert('تم حفظ سجل الحضور بنجاح');
}

// تنفيذ عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadClasses();
    
    // تعيين تاريخ اليوم كقيمة افتراضية
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('attendanceDate').value = today;
});
