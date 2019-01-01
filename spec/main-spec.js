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

describe("Student", () => {
    it("should have field name and id", () => {
        const student = new Student("张三", 111, [{ course: "语文", score: 100 }, { course: "数学", score: 100 }]);
        expect(student.name).toEqual("张三");
        expect(student.id).toEqual(111);
        expect(student.courses).toEqual([{ course: "语文", score: 100 }, { course: "数学", score: 100 }]);
    });

    it("should have a method computeSum and a method computeAverage", () => {
        const student = new Student("张三", 111, [{ course: "语文", score: 100 }, { course: "数学", score: 100 }]);
        const sum = student.computeSum();
        const average = student.computeAverage();
        expect(sum).toEqual(200);
        expect(average).toEqual(100);
    });
});

describe('getStudent()', () => {

    it('should display student message', () => {
        const str = "张三，111，语文：100，数学：100";
        const studentMessage = getStudent(str);
        let message = { name: "张三", id: 111, courses: [{ course: "语文", score: 100 }, { course: "数学", score: 100 }] };
        expect(studentMessage).toEqual(message);
    });

    it('should display -1', () => {
        const str = "张三，111，语文, 100，数学：100";
        const studentMessage = getStudent(str);
        expect(studentMessage).toBe(-1);
    });
});

describe('printScoreSheet()', () => {

    it('should display score sheet', () => {
        const student1 = new Student("张三", 111, [{ course: "语文", score: 100 }, { course: "数学", score: 100 }]);
        const student2 = new Student("李四", 112, [{ course: "语文", score: 80 }, { course: "数学", score: 85 }]);
        const student3 = new Student("王五", 113, [{ course: "语文", score: 90 }, { course: "数学", score: 95 }]);
        const students = [student1, student2, student3];
        const ids = "111, 112"
        const sheet = printScoreSheet(students, ids);
        expect(sheet).toEqual(`成绩单
姓名|语文|数学|平均分|总分 
========================
张三|100|100|100|200
李四|80|85|82.5|165
========================
全班总分平均数：183.33
全班总分中位数：185`);
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

