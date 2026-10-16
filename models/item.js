// module.exports = (sequelize, DataTypes) => {
//   return sequelize.define(
//     "Publicacao",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//       },
//       titulo: {
//         type: DataTypes.STRING(120),
//         allowNull: false,
//         validate: {
//           notEmpty: true,
//           len: [3, 120]
//         }
//       },
//       conteudo: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//         validate: {
//           notEmpty: true
//         }
//       },
//       autor: {
//         type: DataTypes.STRING(80),
//         allowNull: false,
//         defaultValue: "Estudante"
//       },
//       categoria: {
//         type: DataTypes.STRING(40),
//         allowNull: false,
//         defaultValue: "Geral"
//       }
//     },
//     {
//       tableName: "publicacoes",
//       timestamps: true
//     }
//   );
// };


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
