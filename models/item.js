module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Item",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      objeto: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      categoria: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      local: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      data: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notEmpty: true,
          isDate: true
        }
      },
      situacao: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isIn: [
            ["Encontrado", "Perdido", "Em andamento", "Devolvido"]
          ]
        }
      },
      imagem: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    {
      tableName: "items",
      timestamps: true
    }
  );
};
