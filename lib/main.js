let getNumber = require('cli-interact').getNumber;
let question = require('cli-interact').question;
let getStudent = require('./getStudent');
let printScoreSheet = require('./printScoreSheet');

const mainScreen = `1. 添加学生
2. 生成成绩单
3. 退出
请输入你的选择（1～3）：`
const inputStudent = '请输入学生信息（格式：姓名, 学号, 学科: 成绩, ...），按回车提交：';
const inputCorrectStudent = '请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）：';
const inputStudentId = '请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：';
const inputCorrectId = '请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：';

function main() {
  let students = [];
  console.log(mainScreen);
  let command = getNumber();
  while (1) {
    switch (command) {
      case 1:
        let studentInfo = question(inputStudent).trim();
        while (getStudent(studentInfo) === -1) {
          studentInfo = question(inputCorrectStudent).trim();
        }
        let student = getStudent(studentInfo);
        students.push(student);
        question(`学生${student.name}的成绩被添加`);
        break;
      case 2:
        let studentsId = question(inputStudentId).trim();
        while (printScoreSheet(students, studentsId) === -1) {
          studentsId = question(inputCorrectId).trim();
        }
        question(printScoreSheet(students, studentsId));
        break;
      case 3:
        return 0;
      default:
        break;
    }
    command = getNumber(mainScreen);
  }
}

module.exports = main;
