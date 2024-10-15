import Student from '../models/Student';
import Photo from '../models/Photo';

class StudentController {
  async index(req, res) {
    const students = await Student.findAll({
      attributes: ["id", "name", "surname", "email", "age", "weight", "height"],
      order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
      include: {
        model: Photo,
        attributes: ['url', 'filename']
      }
    });
    res.json(students);
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if(!id) {
        return res.status(400).json({
          errors: ['Faltando ID']
        });
      }

      const student = await Student.findByPk(id, {
        attributes: ["id", "name", "surname", "email", "age", "weight", "height"],
        order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
        include: {
          model: Photo,
          attributes: ['url','filename']
        }
      });

      if(!student) {
        return res.status(400).json({
          errors: ['Aluno não existe.']
        });
      }

      return res.json(student);
    } catch (e) {
      return res.status(400).json({
        errors: e.errros.map(err => err.message)
      });
    }
  }

  async store(req, res) {
    try {
      const student = await Student.create(req.body);

      return res.json(student);
    } catch (e) {
      return res.status(400).json({
        errors: e.errros.map(err => err.message)
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if(!id) {
        return res.status(400).json({
          errors: ['Faltando ID']
        });
      }

      const student = await Student.findByPk(id);

      if(!student) {
        return res.status(400).json({
          errors: ['Aluno não existe.']
        });
      }

      const newStudent = await student.update(req.body);

      return res.json(newStudent);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errros.map(err => err.message)
      });
    }

  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if(!id) {
        return res.status(400).json({
          errors: ['Faltando ID']
        });
      }

      const student = await Student.findByPk(id);

      if(!student) {
        return res.status(400).json({
          errors: ['Aluno não existe.']
        });
      }

      await student.destroy();
      return res.json({
        wipedOut: true
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errros.map(err => err.message)
      });
    }

  }
}

export default new StudentController();
