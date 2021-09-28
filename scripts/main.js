import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var studentTBody = document.getElementById('student');
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilterByCredits = document.getElementById("button-filterByCredits");
var inputSearchBox = document.getElementById("search-box");
var inputMin = document.getElementById("input-minCredits");
var inputMax = document.getElementById("input-maxCredits");
var totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return appliFilterByCredits(); };
renderCoursesInTable(dataCourses);
renderStudentsInTable(dataStudent);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentsInTable(student) {
    console.log('Desplegando estudiante');
    var trElement = document.createElement("tr");
    trElement.innerHTML = "<td>" + student.codigo + "</td>\n                           <td>" + student.cedula + "</td>\n                           <td>" + student.edad + "</td>\n                           <td>" + student.direccion + "</td>\n                           <td>" + student.telefono + "</td>";
    studentTBody.appendChild(trElement);
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function appliFilterByCredits() {
    var min = inputMin.value;
    var max = inputMax.value;
    clearCoursesInTable();
    var minN = 0;
    var maxN = 10;
    minN = (min == null) ? 0 : parseInt(min, 10);
    maxN = (max == null) ? 10 : parseInt(max, 10);
    var coursesFiltered = searchCourseByCredits(minN, maxN, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCourseByCredits(min, max, courses) {
    return courses.filter(function (c) { return c.credits >= min && c.credits <= max; });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
