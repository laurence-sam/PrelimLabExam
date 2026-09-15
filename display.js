// js/display.js
import { calculateFinalGrade, getAcademicStatus, getPerformanceRemark } from "./gradeUtils.js";

// Render all students
export function displayStudents(studentsArr) {
  const container = document.getElementById("studentList");
  if (studentsArr.length === 0) {
    container.innerHTML = "<p>No students found</p>";
    return;
  }

  container.innerHTML = "";
  studentsArr.forEach(student => {
    const grade = calculateFinalGrade(student);
    const status = getAcademicStatus(grade);
    const remark = getPerformanceRemark(grade);

    const card = document.createElement("article");
    card.className = "student-card";
    card.innerHTML = `
      <h3>${student.name}</h3>
      <p><strong>ID:</strong> ${student.id}</p>
      <p><strong>Block:</strong> ${student.block}</p>
      <p><strong>Quiz:</strong> ${student.quiz}</p>
      <p><strong>Lab:</strong> ${student.lab}</p>
      <p><strong>Exam:</strong> ${student.exam}</p>
      <p><strong>Final Grade:</strong> ${grade.toFixed(2)}</p>
      <p><strong>Status:</strong> ${status}</p>
      <p><strong>Remark:</strong> ${remark}</p>
    `;
    container.appendChild(card);
  });
}

// Update summary area
export function displaySummary(studentsArr) {
  const avgEl = document.getElementById("classAverage");
  const passingEl = document.getElementById("passingCount");
  const displayedEl = document.getElementById("displayedCount");
  const topNameEl = document.getElementById("topStudent");

  const total = studentsArr.length;
  const avg = studentsArr.length
    ? studentsArr.reduce((sum, s) => sum + calculateFinalGrade(s), 0) / studentsArr.length
    : 0;
  const passing = studentsArr.filter(s => calculateFinalGrade(s) >= 75).length;
  const top = studentsArr.length
    ? studentsArr.reduce((a, b) => calculateFinalGrade(a) > calculateFinalGrade(b) ? a : b)
    : null;

  avgEl.textContent = avg.toFixed(2);
  passingEl.textContent = passing;
  displayedEl.textContent = total;
  topNameEl.textContent = top ? `${top.name} (${calculateFinalGrade(top).toFixed(2)})` : "—";
}

// Show message
export function displayMessage(message) {
  document.getElementById("messageArea").textContent = message;
}