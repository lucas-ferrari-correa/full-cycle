import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import productEntity from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductGateway {
  async findAll(): Promise<productEntity[]> {
    const products = await ProductModel.findAll();

    return products.map((p) => {
      const product = p.dataValues;
      
      return new Product({
        id: new Id(product.id),
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice
      });
    })
  }

  async find(id: string): Promise<productEntity> {
    const p = await ProductModel.findOne({
      where: {
        id: id,
      }
    })

    const product = p.dataValues;

    return new Product({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice
    });
  }
}