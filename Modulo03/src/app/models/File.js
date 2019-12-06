import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3030/files/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    // RETORNA O MODEL QUE FOI INICIALIZADO //
    return this;
  }
}
export default File;
