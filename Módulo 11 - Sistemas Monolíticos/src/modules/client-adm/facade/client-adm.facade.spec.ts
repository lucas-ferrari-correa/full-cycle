import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import ClientAdmFacade from "./client-adm.facade";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";

describe("ClientAdmFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    });

    await sequelize.addModels([ClientModel]);
    await sequelize.sync();
  })

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const repository = new ClientRepository();
    const addUseCase = new AddClientUseCase(repository);
    const facade = new ClientAdmFacade({
      addUsecase: addUseCase,
      findUsecase: undefined,
    });

    const input = {
      id: "1",
      name: "Client 1",
      email: "x@x.com",
      document: "0000",
      street: "Rua",
      number: "123",
      complement: "complement",
      city: "Cidade",
      zipCode: "1111",
    }

    await facade.add(input);

    const client = (await ClientModel.findOne({ where: { id: "1" } })).dataValues;

    expect(client).toBeDefined();
    expect(client.name).toBe(input.name);
    expect(client.email).toBe(input.email);
    expect(client.document).toBe(input.document);
    expect(client.street).toBe(input.street);
    expect(client.number).toBe(input.number);
    expect(client.complement).toBe(input.complement);
    expect(client.city).toBe(input.city);
    expect(client.zipCode).toBe(input.zipCode);
  });

  it("should find a client", async () => {
    const repository = new ClientRepository();
    const findUsecase = new FindClientUseCase(repository);
    const facade = new ClientAdmFacade({
      addUsecase: undefined,
      findUsecase: findUsecase,
    });

    const input = {
      id: "1",
      name: "Client 1",
      email: "x@x.com",
      document: "0000",
      street: "Rua",
      number: "123",
      complement: "complement",
      city: "Cidade",
      zipCode: "1111",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await ClientModel.create(input);

    const client = await facade.find({ id: "1" });

    expect(client).toBeDefined();
    expect(client.id).toBeDefined();
    expect(client.name).toBe(input.name);
    expect(client.email).toBe(input.email);
    expect(client.document).toBe(input.document);
    expect(client.street).toBe(input.street);
    expect(client.number).toBe(input.number);
    expect(client.complement).toBe(input.complement);
    expect(client.city).toBe(input.city);
    expect(client.zipCode).toBe(input.zipCode);
  })
})