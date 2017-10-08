const model = require('../models');
class SubjectCtrl {
  static getIndex(req, res, param) {
    model.Subject.findAll({
        include: ['Teachers']
      })
      .then(subjects => {
        res.render('show_list_subjects', {
          title: 'Show All Subjrcts',
          subjects: subjects,
          page: 'subjects-nav',
          err: param.hasOwnProperty('err') ? param.err : null,
          data: param.hasOwnProperty('data') ? param.data : null,
          repopulate: param.hasOwnProperty('repopulate') ? param.repopulate : null,
        });
      })
      .catch(reason => {
        console.log(reason);
      })
  }

  static getEnrolledStudents(req, res, param) {
    model.Subject.findOne({
        where: {
          id: req.params.subjectId
        },
        include: ['Students'],
        order: [
          ['Students', 'first_name', 'ASC']
        ]
      })
      .then(value => {
        res.render('show_enrolled_students', {
          title: 'Enrolled Students',
          page: 'subjects-nav',
          subject: value,
          err: param.hasOwnProperty('err') ? param.err : null,
        });
      });
  }

  static postSubjects(req, res) {
    model.Subjects.create(req.body)
      .then((inserted) => {
        this.getIndex(req, res, null, inserted);
      })
      .catch(reason => {
        this.getIndex(req, res, reason.errors[0], null, req.body);
      })
  }

  static giveScore(req, res, param) {
    Promise.all([
        model.Student.findOne({
          where: {
            id: req.params.studentId
          }
        }),
        model.Subject.findOne({
          where: {
            id: req.params.subjectId
          }
        })
      ])
      .then(values => {
        res.render('add_score', {
          title: 'Scoring Student',
          page: 'subjects-nav',
          student: values[0],
          subject: values[1],
          err: param.hasOwnProperty('err') ? param.err : null,
          repopulate: param.hasOwnProperty('repopulate') ? param.repopulate : null,
        });
      })
  }

  static submitScore(req, res, param) {
    model.StudentSubject.update(req.body, {
        where: {
          studentId: req.params.studentId,
          subjectId: req.params.subjectId,
        }
      })
      .then(value => {
        res.redirect('/subjects/' + req.params.subjectId + '/enrolledstudents');
      })
      .catch(reason => {
        this.giveScore(req, res, {
          err: reason.errors[0],
          repopulate: req.body,
        })
      })
  }

  static getAdd(req, res, param) {
    res.render('add_subject', {
      title: 'Add subject',
      page: 'subjects-nav',
      err: (param.hasOwnProperty('err')) ? param.err : null,
      repopulate: (param.hasOwnProperty('repopulate')) ? param.repopulate : null,
    })
  }

  static postSubject(req, res) {
    model.Subject.create(req.body)
      .then((inserted) => {
        res.redirect('/subjects');
      })
      .catch(reason => {
        this.getAdd(req, res, {
          err: reason.errors[0],
          repopulate: req.body,
        });
      })
  }
}

module.exports = SubjectCtrl;
