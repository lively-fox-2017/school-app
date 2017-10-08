const model = require('../models');

class TeacherCtrl {
  static getIndex(req, res, param) {
    Promise.all([
        model.Teacher.findAll({
          include: ['Subject'],
          order: [
            ['first_name', 'ASC']
          ],
        }),
        model.Subject.findAll(),
      ])
      .then(values => {
        res.render('show_list_teachers', {
          title: 'Show All Teachers',
          teachers: values[0],
          listSubjects: values[1],
          page: 'teachers-nav',
          err: param.hasOwnProperty('err') ? param.err : null,
          data: param.hasOwnProperty('data') ? param.data : null,
          repopulate: param.hasOwnProperty('repopulate') ? param.repopulate : null,
        });
      })
      .catch(reason => {
        console.log(reason);
      });
  }

  static postTeacher(req, res) {
    model.Teacher.create(req.body)
      .then((inserted) => {
        this.getIndex(req, res, {
          data: inserted,
        });
      })
      .catch(reason => {
        this.getIndex(req, res, {
          err: reason.errors[0],
          repopulate: req.body,
        });
      })
  }

  static getEdit(req, res, param) {
    Promise.all([
        model.Teacher.findOne({
          where: {
            id: req.params.teacherId
          },
          include: ['Subject'],
        }),
        model.Subject.findAll(),
      ])
      .then(values => {
        values[0].id = req.params.teacherId;
        res.render('edit_teacher', {
          data: values[0],
          title: 'Edit Teacher ' + values[0].getFullName(),
          listSubjects: values[1],
          page: 'teachers-nav',
          err: (param.hasOwnProperty('err')) ? param.err : null,
          repopulate: (param.hasOwnProperty('repopulate')) ? param.repopulate : null,
        })
      })
      .catch(reason => {
        console.log(reason);
      })
  }

  static updateTeacher(req, res) {
    Promise.all([
        model.Teacher.update(req.body, {
          where: {
            id: req.params.teacherId
          }
        }),
        model.Teacher.findOne({
          where: {
            id: req.params.teacherId
          }
        })
      ])
      .then(values => {
        res.redirect('/teachers');
      })
      .catch(reason => {
        console.log('subject: ', req.body.subjectId);
        this.getEdit(req, res, {
          err: reason.errors[0],
          repopulate: req.body
        });
      })
  }

  static deleteTeacher(req, res) {
    model.Teacher.destroy({
        where: {
          id: req.params.teacherId
        }
      })
      .then(() => {
        this.getIndex(req, res, {});
      })
      .catch(reason => {
        console.log(reason);
      })
  }
}

module.exports = TeacherCtrl;
