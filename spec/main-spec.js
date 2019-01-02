let sinon = require("sinon");
let main = require("../lib/main");
let getStudent = require("../lib/getStudent");
let Student = require("../lib/student");
let printScoreSheet = require("../lib/printScoreSheet");

describe('main()', () => {

    it('should display main menu once started', () => {
        sinon.spy(console, 'log');
        main();
        expect(console.log.args.join()).toBe(`1. 添加学生
2. 生成成绩单
3. 退出
请输入你的选择（1～3）：`);
    });
});

describe('getStudent()', () => {

    it('should display student message', () => {
        const str = "张三，111，语文：100，数学：100，英语：100，编程：100";
        const studentMessage = getStudent(str);
        let message = {
            name: "张三", id: 111, courses: [{ course: "语文", score: 100 }, { course: "数学", score: 100 },
            { course: "英语", score: 100 }, { course: "编程", score: 100 }]
        };
        expect(studentMessage).toEqual(message);
    });

    it('should display -1', () => {
        const str = "张三，111，语文, 100，数学：100";
        const studentMessage = getStudent(str);
        expect(studentMessage).toBe(-1);
    });
});

describe("Student", () => {

    it("should have a method computeSum and a method computeAverage", () => {
        const student = new Student("张三", 111, [{ course: "语文", score: 100 }, { course: "数学", score: 100 },
        { course: "英语", score: 100 }, { course: "编程", score: 100 }]);
        const sum = student.computeSum();
        const average = student.computeAverage();
        expect(sum).toEqual(400);
        expect(average).toEqual(100);
    });
});

describe('printScoreSheet()', () => {

    it('should display score sheet', () => {
        const student1 = new Student("张三", 111, [{ course: "语文", score: 100 }, { course: "数学", score: 100 },
        { course: "英语", score: 100 }, { course: "编程", score: 100 }]);
        const student2 = new Student("李四", 112, [{ course: "数学", score: 85 }, { course: "语文", score: 80 },
        { course: "英语", score: 80 }, { course: "编程", score: 85 }]);
        const student3 = new Student("王五", 113, [{ course: "语文", score: 90 }, { course: "数学", score: 95 },
        { course: "编程", score: 95 }, { course: "英语", score: 90 }]);
        const students = [student1, student2, student3];
        const ids = "111, 112"
        const sheet = printScoreSheet(students, ids);
        expect(sheet).toEqual(`成绩单
姓名|语文|数学|英语|编程|平均分|总分 
========================
张三|100|100|100|100|100|400
李四|80|85|80|85|82.5|330
========================
全班总分平均数：366.67
全班总分中位数：370`);
    });

    it('should display -1', () => {
        const student1 = new Student("张三", 111, [{ course: "语文", score: 100 }, { course: "数学", score: 100 }]);
        const student2 = new Student("李四", 112, [{ course: "语文", score: 80 }, { course: "数学", score: 85 }]);
        const student3 = new Student("王五", 113, [{ course: "语文", score: 90 }, { course: "数学", score: 95 }]);
        const students = [student1, student2, student3];
        const ids = "111:112"
        const sheet = printScoreSheet(students, ids);
        expect(sheet).toEqual(-1);
    });
});

