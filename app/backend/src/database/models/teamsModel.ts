import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
// import MatchesModel from './matchesModel';

import db from '.';

class TeamModel extends Model<InferAttributes<TeamModel>, InferCreationAttributes<TeamModel>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

TeamModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false },
  },
  {
    sequelize: db,
    modelName: 'teams',
    timestamps: false,
    underscored: true,
  },

);

// TeamModel.belongsTo(MatchesModel, {
//   foreignKey: 'homeTeamId',
//   as: 'homeTeam',
// });
// TeamModel.belongsTo(MatchesModel, {
//   foreignKey: 'awayTeamId',
//   as: 'awayTeam',
// });

export default TeamModel;
