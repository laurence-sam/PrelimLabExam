// js/main.js
import { students } from "./students.js";
import {
  searchStudents,
  filterStudentsByBlock,
  filterStudentsByStatus,
  calculateClassAverage,
  countPassingStudents,
  getTopStudent
} from "./gradeUtils.js";
import { displayStudents, displaySummary, displayMessage } from "./display.js";

// UI Elements — EXACT IDs
 const searchInput = document.getElementById("searchInput");
 const blockFilter = document.getElementById("blockFilter");
 const statusFilter = document.getElementById("statusFilter");
 const applyBtn = document.getElementById("applyBtn");
 const resetBtn = document.getElementById("resetBtn");

 // Apply all filters & search
 function getFilteredStudents() {
   let results = [...students];
   results = searchStudents(results, searchInput.value.trim());
   results = filterStudentsByBlock(results, blockFilter.value);
   results = filterStudentsByStatus(results, statusFilter.value);
   return results;
 }

 // Refresh full display
 function refreshDisplay() {
   const list = getFilteredStudents();
   displayStudents(list);
   displaySummary(list);
   if (list.length === 0) displayMessage("No students found");
   else displayMessage("");
 }

 // Reset to defaults
 function resetAll() {
   searchInput.value = "";
   blockFilter.value = "All";
   statusFilter.value = "All";
   displayMessage("");
   refreshDisplay();
 }

 // Register events
 applyBtn.addEventListener("click", refreshDisplay);
 resetBtn.addEventListener("click", resetAll);
 searchInput.addEventListener("input", refreshDisplay);
 blockFilter.addEventListener("change", refreshDisplay);
 statusFilter.addEventListener("change", refreshDisplay);

 // Initial load
 document.addEventListener("DOMContentLoaded", refreshDisplay);