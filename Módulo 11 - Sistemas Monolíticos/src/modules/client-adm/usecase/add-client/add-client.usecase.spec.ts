import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn()
  }
};

describe("Add Client Usecase unit test", () => {
  it("should add a client", async () => {
    const repository = MockRepository();
    const usecase = new AddClientUseCase(repository);

    const input = {
      id: "1",
      name: "Client 1",
      email: "test@example.com",
      document: "0000",
      street: "Rua",
      number: "123",
      complement: "complement",
      city: "Cidade",
      zipCode: "1111",
    };

    const result = await usecase.execute(input);

    expect(repository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toEqual(input.name);
    expect(result.email).toEqual(input.email);
    expect(result.document).toBe(input.document);
    expect(result.street).toBe(input.street);
    expect(result.number).toBe(input.number);
    expect(result.complement).toBe(input.complement);
    expect(result.city).toBe(input.city);
    expect(result.zipCode).toBe(input.zipCode);
  })
})