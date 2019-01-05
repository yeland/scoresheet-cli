let Student = require("../lib/student");

function getStudent(str) {
  const isPass = checkFormat(str);
  if (isPass) {
    return formatStudent(str);
  }
  return -1;
}

function checkFormat(str) {
  const studentInfo = str.split('，');
  if (studentInfo.length <= 2) {
    return false;
  }
  for (let i = 2; i < studentInfo.length; ++i) {
    const courses = studentInfo[i].split('：');
    if (courses.length != 2) {
      return false;
    }
  }
  return true;
}

function formatStudent(str) {
  const studentInfo = str.split('，');
  const result = formatCourses(studentInfo);
  const student = new Student(studentInfo[0], parseInt(studentInfo[1]), result)
  return student;
}

function formatCourses(studentInfo) {
  const studentCourses = studentInfo.slice(2);
  return studentCourses.map(ele => {
    const courses = ele.split("：");
    return { course: courses[0], score: parseInt(courses[1]) };
  })
}

module.exports = getStudent;