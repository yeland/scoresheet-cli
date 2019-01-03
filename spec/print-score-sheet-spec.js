let Student = require("../lib/student");
let printScoreSheet = require("../lib/printScoreSheet");

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