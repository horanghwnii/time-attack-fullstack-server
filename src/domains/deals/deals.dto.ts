export type CreateProductDto = {
  name: string;
  description: string;
  imgSrc: string;
  price: number;
  address: string;
};

export type UpdateProductDto = {
  name: string;
  description: string;
  price: number;
  address: string;
};
