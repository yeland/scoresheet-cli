function printScoreSheet(students, idStr) {
  if (formatId(idStr) == -1) {
    return -1;
  }
  let ids = formatId(idStr);
  let classData = computeClass(students);
  let printStudents = students.filter(student => ids.includes(student.id));
  return generateSheet(printStudents, classData);
}

function formatId(idStr) {
  let ids = idStr.split(', ');
  let isPass = ids.every(element => {
    let single = element.split("");
    return single.every(ele => ele.charCodeAt(0) > 47 && ele.charCodeAt(0) < 58);
  });
  if (isPass) {
    return ids.map(id => parseInt(id));
  }
  return -1;
}

function computeClass(students) {
  let sums = students.map(student => student.computeSum());
  let classSum = sums.reduce((preEle, ele) => preEle + ele);
  let classAverage = Math.round(classSum / sums.length * 100) / 100;
  let classMedian = Math.round(computeMedian(sums) * 100) / 100;
  return [classAverage, classMedian];
}

function computeMedian(collection) {
  collection.sort((val1, val2) => val1 - val2);
  if (collection.length % 2 == 0) {
    return (collection[collection.length / 2 - 1] + collection[collection.length / 2]) / 2;
  }
  return collection[Math.floor(collection.length / 2)];
}

function generateSheet(printStudents, classData) {
  const courseSingle = generateCourse(printStudents);
  return `成绩单
姓名|${courseSingle.join("|")}|平均分|总分 
========================
${generateStudent(printStudents, courseSingle)}
========================
全班总分平均数：${classData[0]}
全班总分中位数：${classData[1]}`;
}
function generateCourse(printStudents) {
  let studentsCourses = printStudents.map(student => student.courses.map(ele => ele.course));
  let courseCollection = studentsCourses.reduce((array1, array2) => array1.concat(array2), []);
  return courseCollection.filter((element, index, self) => self.indexOf(element) === index);
}
function generateStudent(printStudents, courseSingle) {
  let stringStudent = printStudents.map(student =>
    `${student.name}|${generateScore(student, courseSingle)}|${student.computeAverage()}|${student.computeSum()}`)
  return stringStudent.join('\n');
}
function generateScore(student, courseSingle) {
  let coursesName = student.courses.map(ele => ele.course);
  let score = student.courses.map(ele => ele.score);
  let scoreSeq = courseSingle.map(ele => {
    let index = coursesName.indexOf(ele);
    if (index != -1) {
      return score[index];
    }
    return 0;
  })
  return scoreSeq.join('|');
}

module.exports = printScoreSheet;