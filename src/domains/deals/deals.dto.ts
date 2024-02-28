export type CreateProductDto = {
  name: string;
  description: string;
  imgSrc: string;
  price: number;
};

export type UpdateProductDto = {
  name: string;
  description: string;
  price: number;
};
