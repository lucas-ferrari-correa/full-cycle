import InvoiceFacade from "../facade/invoice.facade";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUsecase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";

export default class InvoiceFacadeFactory {
  static create() {
    const invoiceRepository = new InvoiceRepository();
    const generateInvoice = new GenerateInvoiceUseCase(invoiceRepository);
    const findInvoice = new FindInvoiceUsecase(invoiceRepository);

    const invoiceFacade = new InvoiceFacade({
      generateInvoice,
      findInvoice
    });

    return invoiceFacade;
  }
}