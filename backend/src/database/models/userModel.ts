import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "users",
  modelName: "User",
  timestamps: true,
})
class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare userName: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;
  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  })
  declare verified: boolean;
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare otp: number;
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  declare otpGenerateTime: number;
}

export default User;
