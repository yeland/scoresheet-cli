let getNumber = require('cli-interact').getNumber;
let question = require('cli-interact').question;
let getStudent = require('./getStudent');
let printScoreSheet = require('./printScoreSheet');
let Student = require('./student');

function showMainScreen() {
  return `1. 添加学生
2. 生成成绩单
3. 退出
请输入你的选择（1～3）：`
}

function main() {
  let students = [];
  console.log(showMainScreen());
  let command = getNumber();
  while (1) {
    switch (command) {
      case 1:
        let studentInfo = question('请输入学生信息（格式：姓名, 学号, 学科: 成绩, ...），按回车提交：');
        while (getStudent(studentInfo) === -1) {
          studentInfo = question('请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）：')
        }
        let student = getStudent(studentInfo);
        students.push(student);
        question(`学生${student.name}的成绩被添加`);
        break;
      case 2:
        let studentsId = question('请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：');
        while (printScoreSheet(students, studentsId) === -1) {
          studentsId = question('请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：')
        }
        question(printScoreSheet(students, studentsId));
        break;
      case 3:
        return 0;
      default:
        break;
    }
    command = getNumber(showMainScreen());
  }
}

module.exports = main;
