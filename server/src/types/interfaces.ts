export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  roleId: number;
}

export interface IRole {
  id?: number;
  name: string;
}
export interface IProduct {
  id?: number;
  name: string;
  price: number;
  isDeleted: boolean;
  description: string;
  productViewed: number;
  createdDate: Date;
  updatedDate: Date;
  deletedDate: Date;
}
