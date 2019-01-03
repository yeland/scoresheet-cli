let Student = require("../lib/student");
let getStudent = require("../lib/getStudent");

describe('getStudent()', () => {

    it('should display student message', () => {
        const str = "张三，111，语文：100，数学：100，英语：100，编程：100";
        const student = getStudent(str);
        let message = new Student("张三", 111, [{ course: "语文", score: 100 }, { course: "数学", score: 100 },
        { course: "英语", score: 100 }, { course: "编程", score: 100 }]);
        expect(student).toEqual(message);
    });

    it('should display -1', () => {
        const str = "张三，111，语文, 100，数学：100";
        const student = getStudent(str);
        expect(student).toBe(-1);
    });
});