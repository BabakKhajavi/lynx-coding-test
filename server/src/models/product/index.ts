import { DataTypes, Optional, Sequelize, Model } from 'sequelize';
import { IProduct, IUser } from '../../types';

export class Product extends Model<IProduct> {
  public id!: number;
  public name!: String;
  public price!: number;
  public description!: String;
  public isDeleted!: Boolean;
  public productViewed!: number;
  public updatedDate!: Date;
  public createdDate!: Date;
  public deletedDate!: Date;
  static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.INTEGER, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: true },
        isDeleted: { type: DataTypes.BOOLEAN, allowNull: false },
        productViewed: { type: DataTypes.INTEGER, allowNull: false },
        createdDate: { type: DataTypes.DATE, allowNull: false },
        updatedDate: { type: DataTypes.DATE, allowNull: false },
        deletedDate: { type: DataTypes.DATE, allowNull: true },
      },
      {
        sequelize,
        modelName: 'Product',
        tableName: 'products',
        timestamps: false,
      }
    );
  }
}
