function getStudent(str) {
  const isPass = formatTest(str);
  if (isPass) {
    return formatStudent(str);
  }
  return -1;
}

function formatTest(str) {
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
  return { name: studentInfo[0], id: parseInt(studentInfo[1]), courses: result };
}

function formatCourses(studentInfo) {
  const studentCourses = studentInfo.slice(2);
  return studentCourses.map(ele => {
    const courses = ele.split("：");
    return { course: courses[0], score: parseInt(courses[1]) };
  })
}

module.exports = getStudent;