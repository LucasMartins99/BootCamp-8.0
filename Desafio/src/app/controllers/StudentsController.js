import * as Yup from "yup";
import Students from "../models/Students";
import { userInfo } from "os";

class StudentsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      idade: Yup.number().required(),
      peso: Yup.string().required(),
      altura: Yup.string().required()
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }
    const studentsExist = await Students.findOne({
      where: { email: req.body.email }
    });
    if (studentsExist) {
      return res.status(400).json({ error: "Students already exist" });
    }
    const {
      id,
      name,
      email,
      idade,
      peso,
      altura,
      provider
    } = await Students.create(req.body);
    return res.json({
      id,
      name,
      email,
      idade,
      peso,
      altura,
      provider
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string()
        .email()
        .required(),
      idade: Yup.number(),
      peso: Yup.string(),
      altura: Yup.string()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    // BUSCA NO BANCO O USUARIO COM O ID Q FOI AUTENTICADO//
    const students = await Students.findOne({
      where: { email: req.body.email }
    });
    if (!students) {
      return res.status(400).json({ error: "Student not exist" });
    }
    // VERIFICA SE O USUARIO QUER MUDAR O EMAIL SE SIM VERIFICA SE O EMAIL JA ESTA CADASTRADO//
    if (req.body.email !== students.email) {
      const studentsExist = await Students.findOne({
        where: { email: req.body.email }
      });
      if (studentsExist) {
        return res.status(400).json({ error: "Students already exist" });
      }
    }
    // DA O UPDATE NO USUARIO COM AS INFORMAÇÕES DO BODY //
    const {
      id,
      name,
      email,
      idade,
      peso,
      altura,
      provider
    } = await students.update(req.body);
    return res.json({
      id,
      name,
      email,
      idade,
      peso,
      altura,
      provider
    });
  }
  async index(req, res) {
    const { page = 1 } = req.query;
    const users = await Students.findAll({
      attributes: ["id", "email", "idade", "altura", "name"],
      limit: 20,
      offset: (page - 1) * 20
    });
    return res.json(users);
  }
}
export default new StudentsController();
