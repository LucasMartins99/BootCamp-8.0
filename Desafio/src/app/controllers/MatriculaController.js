import * as Yup from "yup";
import { parseIso, addMonths, format } from "date-fns";
import Plan from "../models/Plan";
import Matricula from "../models/Matricula";

class MatriculaController {
  async store(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required()
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const planos = await Plan.findByPk(req.body.plan_id);

    const price = planos.price * planos.duration;
    const end_date = addMonths(new Date(req.body.start_date), planos.duration);

    const matricula = await Matricula.create({
      id: req.body.id,
      student_id: req.body.student_id,
      plan_id: req.body.plan_id,
      start_date: req.body.start_date,
      end_date: end_date,
      price: price
    });
    return res.json(matricula);
  }
  async index(req, res) {
    const { page = 1 } = req.query;
    const matricula = await Matricula.findAll({
      attributes: [
        "id",
        "student_id",
        "plan_id",
        "start_date",
        "end_date",
        "price"
      ],
      limit: 20,
      offset: (page - 1) * 20
    });
    return res.json(matricula);
  }
  async delete(req, res) {
    const matricula = await Matricula.findByPk(req.params.id);
    if (!matricula) {
      return res.status(400).json({ erro: "Matricula not exist" });
    }
    await Matricula.destroy({ where: { id: req.params.id } });
    const matricula2 = await Matricula.findAll();
    return res.json(matricula2);
  }
}
export default new MatriculaController();
