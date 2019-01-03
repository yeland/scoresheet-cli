let getStudent = require("../lib/getStudent");

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