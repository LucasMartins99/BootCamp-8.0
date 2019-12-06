import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    // ANTES DE GRAVA NO BANCO IRÀ EXECUTAR ESTE TRECHO //
    this.addHook('beforeSave', async user => {
      if (user.password) {
        // CRIPTOGRAFA A SENHA //
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    // RETORNA O MODEL QUE FOI INICIALIZADO //
    return this;
  }

  // RELACIONA O AVATAR ID NA TABELA USERS //
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}
export default User;
