const express = require('express');
const router = express.Router();
const TeacherCtrl = require('../controllers/teacherCtrl');

router.get('/', (req, res) => {
  TeacherCtrl.getIndex(req, res, {});
});

router.post('/', (req, res) => {
  TeacherCtrl.postTeacher(req, res);
});

router.get('/edit/:teacherId', (req, res) => {
  TeacherCtrl.getEdit(req, res, {});
});

router.post('/edit/:teacherId', (req, res) => {
  TeacherCtrl.updateTeacher(req, res);
});

router.get('/delete/:teacherId', (req, res) => {
  TeacherCtrl.deleteTeacher(req, res);
});

module.exports = router;
