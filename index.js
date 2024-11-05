document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const studentsTableBody = document.querySelector('#studentsTable tbody');
    
    loadStudents();  
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addStudent();
    });

    function addStudent() {
       
        const studentName = document.getElementById('studentName').value;
        const studentID = document.getElementById('studentID').value;
        const emailID = document.getElementById('emailID').value;
        const contactNo = document.getElementById('contactNo').value;

      
        if (studentName === '' || studentID === '' || emailID === '' || contactNo === '') {
            alert('All fields are required');
            return;
        }

     
        let students = JSON.parse(localStorage.getItem('students')) || [];
        const newStudent = { studentName, studentID, emailID, contactNo };
        students.push(newStudent);
        localStorage.setItem('students', JSON.stringify(students));

        // Add the student to the display
        displayStudent(newStudent);

        // Clear form fields after submission
        registrationForm.reset();
    }

    function loadStudents() {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        students.forEach(displayStudent);
    }

    function displayStudent(student) {
        const row = document.createElement('tr');

      
        row.innerHTML = `
            <td>${student.studentName}</td>
            <td>${student.studentID}</td>
            <td>${student.emailID}</td>
            <td>${student.contactNo}</td>
            <td><button class="delete-btn">Delete</button></td>
        `;

       
        row.querySelector('.delete-btn').addEventListener('click', () => {
            deleteStudent(student);
            row.remove();
        });

       
        studentsTableBody.appendChild(row);
    }

    function deleteStudent(student) {
        let students = JSON.parse(localStorage.getItem('students')) || [];

        
        students = students.filter(st => st.studentID !== student.studentID);

        localStorage.setItem('students', JSON.stringify(students));
    }
});
