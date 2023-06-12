import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import Product from "../domain/product.entity";
import Address from "../../@shared/domain/value-object/address.value-object";
import InvoiceRepository from "./invoice.repository";
import ProductModel from "./product.model";

describe("InvoiceRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    });

    await sequelize.addModels([InvoiceModel, ProductModel]);
    await sequelize.sync();
  })

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create an invoice", async () => {
    await ProductModel.create({
      id: "1",
      name: "Produto 1",
      price: 100
    })

    await ProductModel.create({
      id: "2",
      name: "Produto 2",
      price: 200
    })

    const invoiceProps = {
      id: new Id("1"),
      name: "Invoice 1",
      document: "1234567",
      address: new Address({
        street: "Rua",
        number: "123",
        complement: "Complemento",
        city: "Cidade",
        state: "Estado",
        zipCode: "123456",
      }),
      items: [
        new Product({
          id: new Id("1"),
          name: "Produto 1",
          price: 100
        }),
        new Product({
          id: new Id("2"),
          name: "Produto 2",
          price: 200
        })
      ]
    }

    const invoice = new Invoice(invoiceProps);
    const invoiceRepository = new InvoiceRepository();

    await invoiceRepository.add(invoice);

    const invoiceDb = (await InvoiceModel.findOne({
      where: {
        id: invoiceProps.id.id
      }
    })).dataValues;

    expect(invoiceProps.id.id).toEqual(invoiceDb.id);
    expect(invoiceProps.name).toEqual(invoiceDb.name);
    expect(invoiceProps.document).toEqual(invoiceDb.document);
  });

  it("should find an invoice", async () => {
    const invoiceRepository = new InvoiceRepository();

    await ProductModel.create({
      id: "1",
      name: "Produto 1",
      price: 100
    })

    await ProductModel.create({
      id: "2",
      name: "Produto 2",
      price: 200
    })

    await InvoiceModel.create({
      id: "1",
      name: "Invoice",
      document: "123456",
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
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const invoice = await invoiceRepository.find("1");

    expect(invoice.id.id).toEqual(invoice.id.id);
    expect(invoice.name).toEqual(invoice.name);
    expect(invoice.document).toEqual(invoice.document);
  })
});