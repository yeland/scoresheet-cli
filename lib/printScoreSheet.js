function printScoreSheet(students, idStr) {
  if (!checkFormat(idStr)) {
    return -1;
  }
  let ids = formatId(idStr);
  let [classAverage, classMedian] = getAverageMedian(students);
  return generateSheet(students, ids, classAverage, classMedian);
}

function checkFormat(idStr) {
  let ids = idStr.split(', ');
  return ids.every(element => {
    let single = element.split("");
    return single.every(ele => ele.charCodeAt(0) > 47 && ele.charCodeAt(0) < 58);
  });
}

function formatId(idStr) {
  let ids = idStr.split(', ');
  return ids.map(id => parseInt(id));
}

function getAverageMedian(students) {
  let sums = students.map(student => student.computeSum());
  let classSum = sums.reduce((preEle, ele) => preEle + ele);
  let classAverage = Math.round(classSum / sums.length * 100) / 100;
  let classMedian = Math.round(computeMedian(sums) * 100) / 100;
  return [classAverage, classMedian];
}

function computeMedian(sums) {
  sums.sort((sum1, sum2) => sum1 - sum2);
  if (sums.length % 2 == 0) {
    return (sums[sums.length / 2 - 1] + sums[sums.length / 2]) / 2;
  }
  return sums[Math.floor(sums.length / 2)];
}

function generateSheet(students, ids, classAverage, classMedian) {
  let printStudents = students.filter(student => ids.includes(student.id));
  const courseSingle = generateCourse(printStudents);
  return `成绩单
姓名|${courseSingle.join("|")}|平均分|总分 
========================
${generateStudent(printStudents, courseSingle)}
========================
全班总分平均数：${classAverage}
全班总分中位数：${classMedian}`;
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