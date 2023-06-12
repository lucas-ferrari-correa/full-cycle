import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find-invoice.dto";

export default class FindInvoiceUsecase {
  constructor(private invoiceRepository: InvoiceGateway) {}

  async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
    const invoice = await this.invoiceRepository.find(input.id);

    return {
      id: invoice.id.id,
      document: invoice.document,
      name: invoice.name,
      address: {
        city: invoice.address.city,
        street: invoice.address.street,
        state: invoice.address.state,
        number: invoice.address.number,
        complement: invoice.address.complement,
        zipCode: invoice.address.zipCode,
      },
      items: invoice.items.map(i => {
        return {
          id: i.id.id,
          name: i.name,
          price: i.price
        }
      }),
      total: invoice.total,
      createdAt: invoice.createdAt,
    }
  }
}