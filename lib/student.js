class Student {
  constructor(name, id, courses) {
    this.name = name;
    this.id = id;
    this.courses = courses;
  }
  computeSum() {
    let scores = this.courses.map(course => course.score);
    return scores.reduce((preEle, ele) => preEle + ele);
  }
  computeAverage() {
    return this.computeSum() / Object.values(this.courses).length;
  }
}
module.exports = Student;