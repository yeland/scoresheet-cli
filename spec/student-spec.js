let Student = require("../lib/student");

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
