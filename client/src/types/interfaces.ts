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
