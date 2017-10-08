const express = require('express');
const router = express.Router();
const SubjectCtrl = require('../controllers/subjectCtrl');

router.get('/', (req, res) => {
  SubjectCtrl.getIndex(req, res, {});
});

router.get('/:subjectId/enrolledstudents', (req, res) => {
  SubjectCtrl.getEnrolledStudents(req, res, {});
});

router.get('/:subjectId/:studentId/givescore', (req, res) => {
  SubjectCtrl.giveScore(req, res, {});
});

router.post('/:subjectId/:studentId/givescore', (req, res) => {
  SubjectCtrl.submitScore(req, res, {});
});

router.get('/add/', (req, res) => {
  SubjectCtrl.getAdd(req, res, {});
});

router.post('/add/', (req, res) => {
  SubjectCtrl.postSubject(req, res);
});

module.exports = router;
