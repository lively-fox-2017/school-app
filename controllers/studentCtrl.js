const model = require('../models');
class StudentCtrl {
  static getIndex(req, res, param) {
    model.Student.findAll({
        order: [
          ['first_name', 'ASC']
        ]
      })
      .then(students => {
        res.render('show_list_students', {
          title: 'Show All Students',
          students: students,
          page: 'students-nav',
          err: (param.hasOwnProperty('err')) ? param.err : null,
          data: (param.hasOwnProperty('data')) ? param.data : null,
          repopulate: (param.hasOwnProperty('repopulate')) ? param.repopulate : null,
          before: (param.hasOwnProperty('before')) ? param.before : null,
        });
      })
      .catch(reason => {
        console.log(reason);
      })
  }

  static getAdd(req, res, param) {
    res.render('add_student', {
      title: 'Add Student',
      page: 'students-nav',
      err: (param.hasOwnProperty('err')) ? param.err : null,
      repopulate: (param.hasOwnProperty('repopulate')) ? param.repopulate : null,
    })
  }

  static postStudent(req, res) {
    model.Student.create(req.body)
      .then((inserted) => {
        res.redirect('/students');
      })
      .catch(reason => {
        this.getAdd(req, res, {
          err: reason.errors[0],
          repopulate: req.body,
        });
      })
  }

  static getEdit(req, res, param) {
    model.Student.findOne({
        where: {
          id: req.params.studentId
        }
      })
      .then(student => {
        student.id = req.params.studentId;
        res.render('edit_student', {
          data: student,
          title: 'Show All Students',
          page: 'students-nav',
          err: (param.hasOwnProperty('err')) ? param.err : null,
          repopulate: (param.hasOwnProperty('repopulate')) ? param.repopulate : null,
        })
      })
      .catch(reason => {
        console.log(reason);
      })
  }

  static updateStudent(req, res) {
    Promise.all([
        model.Student.update(req.body, {
          where: {
            id: req.params.studentId
          }
        }),
        model.Student.findOne({
          where: {
            id: req.params.studentId
          }
        })
      ])
      .then(values => {
        res.redirect('/students');
      })
      .catch(reason => {
        this.getEdit(req, res, {
          data: values[1],
          err: reason.errors[0],
          repopulate: req.body
        });
      })
  }

  static deleteStudent(req, res) {
    model.Student.destroy({
        where: {
          id: req.params.studentId
        }
      })
      .then(() => {
        this.getIndex(req, res, {});
      })
      .catch(reason => {
        console.log(reason);
      })
  }

  static getAddSubject(req, res, param) {
    Promise.all([
        model.Student.findOne({
          where: {
            id: req.params.studentId
          },
          include: ['Subjects']
        }),
        model.Subject.findAll(),
      ])
      .then(values => {
        let result = values[1].filter(subject => {
          let exist = false;
          values[0].Subjects.forEach(element => {
            if (element.id === subject.id)
              exist = true;
          });
          return !exist;
        });
        console.log('here!: ', result);
        res.render('add_student_subject', {
          data: values[0],
          subjects: result,
          title: 'Show All Students',
          page: 'students-nav',
          err: (param.hasOwnProperty('err')) ? param.err : null,
        })
      })
      .catch(reason => {
        console.log(reason);
      });
  }

  static addSubject(req, res, param) {
    Promise.all([
        model.StudentSubject.create({
          studentId: req.params.studentId,
          subjectId: req.body.subject,
        }),
        model.Student.findOne({
          where: {
            id: req.params.studentId
          },
          include: ['Subjects']
        }),
        model.Subject.findAll(),
      ])
      .then(values => {
        res.redirect('/students');
      })
      .catch(reason => {
        let result = values[2].filter(subject => {
          let exist = false;
          values[1].Subjects.forEach(element => {
            if (element.id === subject.id)
              exist = true;
          });
          if (!exist)
            return subject
        });
        this.getAddSubject(req, res, {
          data: values[1],
          subjects: result,
          err: reason.errors[0],
          repopulate: req.body
        });
      })
  }
}

module.exports = StudentCtrl;
