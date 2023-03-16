import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("1", "Produto 1", 10);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test find product use case", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
    const useCase = new FindProductUseCase(productRepository);

    const input = {
      id: "1"
    }

    const output = {
      id: "1",
      name: "Produto 1",
      price: 10
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  });

  it("should not find a product", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found")
    });

    const useCase = new FindProductUseCase(productRepository);

    const input = {
      id: "1"
    }

    expect(() => {
      return useCase.execute(input)
    }).rejects.toThrow("Product not found")
  })
})