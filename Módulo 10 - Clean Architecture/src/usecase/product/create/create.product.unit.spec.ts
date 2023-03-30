import { InputCreateProductDto } from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";
const input: InputCreateProductDto = {
  type: "a",
  name: "Product",
  price: 10
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price
    })
  });


  it('should thrown an error when type is missing or not exists', async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const newInput = { ...input };
    newInput.type = 'c';

    await expect(productCreateUseCase.execute(newInput)).rejects.toThrow(
      "Product type not supported"
    );

    newInput.type = null;

    await expect(productCreateUseCase.execute(newInput)).rejects.toThrow(
      "Product type not supported"
    );
  })

  it('should thrown an error when name is missing', async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const newInput = { ...input };
    newInput.name = "";

    await expect(productCreateUseCase.execute(newInput)).rejects.toThrow(
      "Name is required"
    );
  })

  it('should thrown an error when price is missing or less than 0', async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const newInput = { ...input };
    newInput.price = -1;

    await expect(productCreateUseCase.execute(newInput)).rejects.toThrow(
      "Price must be greater or equal than zero"
    );

    newInput.price = null;

    await expect(productCreateUseCase.execute(newInput)).rejects.toThrow(
      "Price must be greater or equal than zero"
    );
  })
})