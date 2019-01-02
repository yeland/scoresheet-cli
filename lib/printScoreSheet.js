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
  const ids = idStr.split(', ');
  const isPass = ids.every(element => {
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
  let classMedia = Math.round(computeMedian(sums) * 100) / 100;
  return [classAverage, classMedia];
}

function computeMedian(collection) {
  collection.sort((val1, val2) => val1 - val2);
  if (collection.length % 2 == 0) {
    return (collection[collection.length / 2 - 1] + collection[collection.length / 2]) / 2;
  }
  return collection[Math.floor(collection.length / 2)];
}

function generateSheet(printStudents, classData) {
  return `成绩单
姓名|语文|数学|英语|编程|平均分|总分 
========================
${generateStudent(printStudents)}
========================
全班总分平均数：${classData[0]}
全班总分中位数：${classData[1]}`;
}

function generateStudent(printStudents) {
  let stringStudent = printStudents.map(student =>
    `${student.name}|${generateScore(student)}|${student.computeAverage()}|${student.computeSum()}`)
  return stringStudent.join('\n');
}
function generateScore(student) {
  let scoreSeq = [0, 0, 0, 0];
  student.courses.forEach(element => {
    if (element.course === "语文") {
      scoreSeq[0] = element.score;
    }
    if (element.course === "数学") {
      scoreSeq[1] = element.score;
    }
    if (element.course === "英语") {
      scoreSeq[2] = element.score;
    }
    if (element.course === "编程") {
      scoreSeq[3] = element.score;
    }
  })
  return scoreSeq.join('|');
}

module.exports = printScoreSheet;