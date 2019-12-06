import Sequelize from "sequelize";
import User from "../app/models/User";
import Students from "../app/models/Students";
import Plan from "../app/models/Plan";
import databaseConfig from "../config/database";
import Matricula from "../app/models/Matricula";
import Checkin from "../app/models/Checkin";

const models = [User, Students, Plan, Matricula,Checkin];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }
}
export default new Database();
