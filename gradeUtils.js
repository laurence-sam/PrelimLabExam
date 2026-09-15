// js/gradeUtils.js
import { students } from "./students.js";

// Weighted grade: Quiz=25%, Lab=35%, Exam=40%
export function calculateFinalGrade(student) {
  return (student.quiz * 0.25) + (student.lab * 0.35) + (student.exam * 0.40);
}

// Academic Status
export function getAcademicStatus(grade) {
  if (grade >= 90) return "Excellent";
  if (grade >= 75) return "Passed";
  if (grade >= 70) return "Needs Improvement";
  return "Failed";
}

// Performance Remark (switch-based)
export function getPerformanceRemark(grade) {
  switch (true) {
    case grade >= 90: return "Outstanding";
    case grade >= 85: return "Very Good";
    case grade >= 80: return "Good";
    case grade >= 75: return "Satisfactory";
    default: return "Unsatisfactory";
  }
}

// Search (case-insensitive)
export function searchStudents(studentsArr, query) {
  if (!query) return [...studentsArr];
  const q = query.toLowerCase();
  return studentsArr.filter(s => s.name.toLowerCase().includes(q));
}

// Filter by Block
export function filterStudentsByBlock(studentsArr, block) {
  if (block === "All") return [...studentsArr];
  return studentsArr.filter(s => s.block === block);
}

// Filter by Status
export function filterStudentsByStatus(studentsArr, status) {
  if (status === "All") return [...studentsArr];
  return studentsArr.filter(s => getAcademicStatus(calculateFinalGrade(s)) === status);
}

// Class Average
export function calculateClassAverage(studentsArr) {
  if (studentsArr.length === 0) return 0;
  const total = studentsArr.reduce((sum, s) => sum + calculateFinalGrade(s), 0);
  return total / studentsArr.length;
}

// Count Passing (≥75)
export function countPassingStudents(studentsArr) {
  return studentsArr.filter(s => calculateFinalGrade(s) >= 75).length;
}

// Top Student
export function getTopStudent(studentsArr) {
  if (studentsArr.length === 0) return null;
  return studentsArr.reduce((top, curr) =>
    calculateFinalGrade(curr) > calculateFinalGrade(top) ? curr : top
  );
}