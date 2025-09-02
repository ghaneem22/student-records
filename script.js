const STORAGE_KEY = 'classRecord';

let students = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const form = document.getElementById('studentForm');
const tableBody = document.querySelector('#studentsTable tbody');
const countSpan = document.getElementById('count');
const searchBox = document.getElementById('searchBox');
const toggleThemeBtn = document.getElementById('toggleTheme');
const exportBtn = document.getElementById('exportBtn');
const importFile = document.getElementById('importFile');
const cancelEditBtn = document.getElementById('cancelEdit');

render();

/* ------------ الوظائف الرئيسية ------------ */
function render(filtered = students) {
  tableBody.innerHTML = '';
  countSpan.textContent = filtered.length;
  filtered.forEach(std => {
    const tr = document.createElement('tr');
    const avg = ((+std.term1 + +std.term2 + +std.final) / 3).toFixed(2);
    tr.innerHTML = `
      <td>${std.name}</td>
      <td>${std.grade}</td>
      <td>${std.term1}</td>
      <td>${std.term2}</td>
      <td>${std.final}</td>
      <td>${avg}</td>
      <td>
        <button onclick="editStudent('${std.id}')">✏️</button>
        <button onclick="deleteStudent('${std.id}')">🗑️</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

function resetForm() {
  form.reset();
  document.getElementById('studentId').value = '';
  cancelEditBtn.style.display = 'none';
}

/* ------------ الأحداث ------------ */
form.addEventListener('submit', e => {
  e.preventDefault();
  const id = document.getElementById('studentId').value || Date.now().toString();
  const name = document.getElementById('name').value.trim();
  const grade = document.getElementById('grade').value.trim();
  const term1 = document.getElementById('term1').value;
  const term2 = document.getElementById('term2').value;
  const final = document.getElementById('final').value;

  const studentIndex = students.findIndex(s => s.id === id);
  const studentObj = { id, name, grade, term1, term2, final };

  if (studentIndex >= 0) {
    students[studentIndex] = studentObj;
  } else {
    students.push(studentObj);
  }

  saveToStorage();
  render();
  resetForm();
});

searchBox.addEventListener('input', () => {
  const q = searchBox.value.toLowerCase();
  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(q) || s.grade.toLowerCase().includes(q)
  );
  render(filtered);
});

cancelEditBtn.addEventListener('click', resetForm);

/* ------------ التعديل والحذف ------------ */
window.editStudent = id => {
  const st = students.find(s => s.id === id);
  if (!st) return;
  document.getElementById('studentId').value = st.id;
  document.getElementById('name').value = st.name;
  document.getElementById('grade').value = st.grade;
  document.getElementById('term1').value = st.term1;
  document.getElementById('term2').value = st.term2;
  document.getElementById('final').value = st.final;
  cancelEditBtn.style.display = 'inline-block';
  form.scrollIntoView({ behavior: 'smooth' });
};

window.deleteStudent = id => {
  if (confirm('هل أنت متأكد من حذف الطالب؟')) {
    students = students.filter(s => s.id !== id);
    saveToStorage();
    render();
  }
};

/* ------------ التصدير والاستيراد ------------ */
exportBtn.addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(students, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'class_record.json';
  a.click();
  URL.revokeObjectURL(url);
});

importFile.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      if (Array.isArray(imported)) {
        students = imported;
        saveToStorage();
        render();
        alert('تم الاستيراد بنجاح');
      } else {
        throw new Error('صيغة غير صالحة');
      }
    } catch {
      alert('فشل الاستيراد، تأكد من صحة الملف.');
    }
  };
  reader.readAsText(file);
});

/* ------------ وضع ليلي/نهاري ------------ */
toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggleThemeBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

/* تفعيل الوضع المحفوظ */
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  toggleThemeBtn.textContent = '☀️';
}