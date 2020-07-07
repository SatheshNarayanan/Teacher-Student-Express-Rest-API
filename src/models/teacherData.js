const teachers = [
  {
    id: 1,
    firstName: "First",
    lastName: "Teacher",
    age: 26,
    email: "FirstTeacher@gmail.com",
    class: 5,
    students: [
      {
        id: 1,
        firstName: "first",
        lastName: "student",
        age: 13,
        gender: "male"
      },
      {
        id: 2,
        firstName: "second",
        lastName: "student",
        age: 13,
        gender: "female"
      }
    ]
  },
  {
    id: 2,
    firstName: "Second",
    lastName: "Teacher",
    age: 29,
    email: "SecondTeacher@gmail.com",
    class: 5,
    students: [
      {
        id: 3,
        firstName: "third",
        lastName: "student",
        age: 13,
        gender: "male"
      },
      {
        id: 4,
        firstName: "fourth",
        lastName: "student",
        age: 13,
        gender: "female"
      }
    ]
  },
  {
    id: 3,
    firstName: "Third",
    lastName: "Teacher",
    age: 32,
    email: "ThirdTeacher@gmail.com",
    class: 5,
    students: [
      {
        id: 5,
        firstName: "fifth",
        lastName: "student",
        age: 13,
        gender: "male"
      },
      {
        id: 6,
        firstName: "sixth",
        lastName: "student",
        age: 13,
        gender: "female"
      }
    ]
  }
];

module.exports = teachers;
