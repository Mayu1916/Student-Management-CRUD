const students = [
  { ID: 1, name: 'Alice', age: 21, grade: 'A', degree: 'Btech', email: 'alice@example.com' },
  { ID: 2, name: 'Bob', age: 22, grade: 'B', degree: 'MBA', email: 'bob@example.com' },
  { ID: 3, name: 'Charlie', age: 20, grade: 'C', degree: 'Arts', email: 'charlie@example.com' }
];

function renderStudents(filteredStudents) {
  const studentList = document.querySelector('#student-list tbody');
  studentList.innerHTML = '';

  const studentsToRender = filteredStudents || students;

  studentsToRender.forEach((student) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.ID}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.grade}</td>
      <td>${student.degree}</td>
      <td>${student.email}</td>
      <td>
        <button class="edit-button" data-id="${student.ID}">Edit</button>
        <button class="delete-button" data-id="${student.ID}">Delete</button>
      </td>
    `;

    studentList.appendChild(row);
  });
}

function addStudent(student) {
  students.push(student);
  renderStudents();
}

function deleteStudent(id) {
  const index = students.findIndex((student) => student.ID === id);
  if (index !== -1) {
    students.splice(index, 1);
    renderStudents();
  }
}

function findStudentByID(id) {
  return students.find((student) => student.ID === parseInt(id));
}

function updateStudent(id, updatedStudent) {
  const index = students.findIndex((student) => student.ID === parseInt(id));
  if (index !== -1) {
    students[index] = { ...updatedStudent, ID: parseInt(id) };
    renderStudents();
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  const id = document.getElementById('id-input').value.trim();
  const name = document.getElementById('name-input').value.trim();
  const age = parseInt(document.getElementById('age-input').value.trim(), 10);
  const grade = document.getElementById('grade-input').value.trim();
  const degree = document.getElementById('degree-input').value.trim();
  const email = document.getElementById('email-input').value.trim();

  const student = { ID: parseInt(id), name, age, grade, degree, email };

  const submitButton = document.querySelector('#student-form button[type="submit"]');
  if (submitButton.innerText === 'Add Student') {
    addStudent(student);
  } else if (submitButton.innerText === 'Edit Student') {
    updateStudent(id, student);
    submitButton.innerText = 'Add Student';
  }

  event.target.reset();
}

function handleEditButtonClick(event) {
  const id = event.target.dataset.id;
  const student = findStudentByID(id);

  if (student) {
    document.getElementById('id-input').value = student.ID;
    document.getElementById('name-input').value = student.name;
    document.getElementById('age-input').value = student.age;
    document.getElementById('grade-input').value = student.grade;
    document.getElementById('degree-input').value = student.degree;
    document.getElementById('email-input').value = student.email;

    const submitButton = document.querySelector('#student-form button[type="submit"]');
    submitButton.innerText = 'Edit Student';
    submitButton.dataset.id = id;
  }
}

function handleDeleteButtonClick(event) {
  const id = event.target.dataset.id;
  deleteStudent(parseInt(id));
}

function handleSearchButtonClick() {
  const searchValue = document.getElementById('search-input').value.toLowerCase();

  const filteredStudents = students.filter((student) => {
    const { name, email, degree } = student;
    return (
      name.toLowerCase().includes(searchValue) ||
      email.toLowerCase().includes(searchValue) ||
      degree.toLowerCase().includes(searchValue)
    );
  });

  renderStudents(filteredStudents);
}

// Add event listeners
document.getElementById('student-form').addEventListener('submit', handleFormSubmit);
document.getElementById('student-list').addEventListener('click', (event) => {
  if (event.target.classList.contains('edit-button')) {
    handleEditButtonClick(event);
  } else if (event.target.classList.contains('delete-button')) {
    handleDeleteButtonClick(event);
  }
});
document.getElementById('search-button').addEventListener('click', handleSearchButtonClick);

// Initial rendering of students
renderStudents();
