import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import Product from "../domain/product.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import { InvoiceModel } from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
  async add(invoice: Invoice): Promise<void> {
    await InvoiceModel.create({
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      city: invoice.address.city,
      number: invoice.address.number,
      zipCode: invoice.address.zipCode,
      state: invoice.address.state,
      complement: invoice.address.complement,
      items: invoice.items,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({
      where: { id }
    });

    if (!invoice || !invoice.dataValues) {
      throw new Error(`Invoice with id ${id} not found`);
    }

    const invoiceValue = invoice.dataValues;

    return new Invoice({
      id: new Id(invoiceValue.id),
      name: invoiceValue.name,
      address: new Address({
        city: invoiceValue.city,
        complement: invoiceValue.complement,
        number: invoiceValue.number,
        state: invoiceValue.state,
        street: invoiceValue.street,
        zipCode: invoiceValue.zipCode
      }),
      document: invoiceValue.document,
      items: invoiceValue.items?.map((i: any) => {
        return new Product({
          id: new Id(i.id),
          name: i.name,
          price: i.price,
        })
      })
    })
  }
}