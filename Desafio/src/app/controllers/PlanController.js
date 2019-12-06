import * as Yup from "yup";
import Plan from "../models/Plan";


class PlanController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const plan = await Plan.findAll({
      attributes: ["id", "title", "duration", "price"],
      limit: 20,
      offset: (page - 1) * 20
    });
    return res.json(plan);
  }
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required()
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }
    const planExist = await Plan.findOne({
      where: { title: req.body.title }
    });
    if (planExist) {
      return res.status(400).json({ error: "Plan already exist" });
    }
    const { id, title, duration, price, provider } = await Plan.create(
      req.body
    );
    return res.json({
      id,
      title,
      duration,
      price,
      provider
    });
  }
  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required()
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }
    const plan = await Plan.findOne({
      where: { title: req.body.title }
    });
    if (!plan) {
      return res.status(400).json({ error: "Plan not exist" });
    }
    if (req.body.title !== plan.title) {
      const planExist = await Plan.findOne({
        where: { title: req.body.title }
      });
      if (planExist) {
        return res.status(400).json({ error: "Plan already exist" });
      }
    }
    const { title, duration, price, provider } = await plan.update(req.body);
    return res.json({
      title,
      duration,
      price,
      provider
    });
  }
  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: "Plan not exist" });
    }
    await Plan.destroy({ where: { id: req.params.id } });
    const plan2 = await Plan.findAll();
    return res.json(plan2);
  }
}
export default new PlanController();
