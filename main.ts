import { Course } from './course.js';
import { Student } from './student.js';

import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentTBody: HTMLElement = document.getElementById('student')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByCredits : HTMLElement = document.getElementById("button-filterByCredits")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const inputMin: HTMLInputElement = <HTMLInputElement> document.getElementById("input-minCredits")!;
const inputMax: HTMLInputElement = <HTMLInputElement> document.getElementById("input-maxCredits")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredits.onclick = () => appliFilterByCredits();

renderCoursesInTable(dataCourses);
renderStudentsInTable(dataStudent);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function renderStudentsInTable(student: Student): void {
  console.log('Desplegando estudiante');

    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${student.codigo}</td>
                           <td>${student.cedula}</td>
                           <td>${student.edad}</td>
                           <td>${student.direccion}</td>
                           <td>${student.telefono}</td>`;
  studentTBody.appendChild(trElement);
}
 
function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function appliFilterByCredits()
{
  let min = inputMin.value;
  let max = inputMax.value;
  clearCoursesInTable();
  let minN = 0;
  let maxN = 10;
  minN = (min == null)? 0 : parseInt(min, 10);
  maxN = (max == null)? 10 : parseInt(max, 10);
  let coursesFiltered: Course[] = searchCourseByCredits(minN, maxN, dataCourses);
  renderCoursesInTable(coursesFiltered);

}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function searchCourseByCredits(min: number, max: number, courses: Course[]) {
  return courses.filter(c => c.credits >= min && c.credits <= max);
}

function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
    }
  }
}