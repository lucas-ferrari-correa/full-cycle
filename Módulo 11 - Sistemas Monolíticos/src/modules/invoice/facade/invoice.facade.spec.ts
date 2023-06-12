import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/product.model";
import { InvoiceModel } from "../repository/invoice.model";
import InvoiceFacadeFactory from "../factory/invoice.factory";

describe("InvoiceFacade test", () => {
  let sequelize: Sequelize;
  
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    });

    await sequelize.addModels([ProductModel, InvoiceModel]);
    await sequelize.sync();
  })

  afterEach(async () => {
    await sequelize.close();
  });

  it("should generate an invoice", async () => {
    const invoiceFacade = InvoiceFacadeFactory.create();

    const input = {
      name: "Invoice 1",
      document: "1234567",
      street: "Rua",
      number: "123",
      complement: "Complemento",
      city: "Cidade",
      state: "Estado",
      zipCode: "123456",
      items: [
        {
          id: "1",
          name: "Produto 1",
          price: 100
        },
        {
          id: "2",
          name: "Produto 2",
          price: 200
        }
      ]
    };

    await invoiceFacade.generateInvoice(input);

    const invoice = (await InvoiceModel.findOne({ where: { id: "1" } })).dataValues;
    expect(invoice).toBeDefined();
  });

  it("should find an invoice", async () => {
    const invoiceFacade = InvoiceFacadeFactory.create()

    const input = {
      id: "1",
      name: "Invoice 1",
      document: "1234567",
      street: "Rua",
      number: "123",
      complement: "Complemento",
      city: "Cidade",
      state: "Estado",
      zipCode: "123456",
      items: [
        {
          id: "1",
          name: "Produto 1",
          price: 100
        },
        {
          id: "2",
          name: "Produto 2",
          price: 200
        }
      ]
    };

    await invoiceFacade.generateInvoice(input);

    const result = await invoiceFacade.findInvoice({
      id: "1",
    });

    expect(result.id).toBe(input.id);
  })
})