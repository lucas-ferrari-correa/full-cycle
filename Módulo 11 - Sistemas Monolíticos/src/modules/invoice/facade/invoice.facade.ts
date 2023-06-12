import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.facade.interface";

export interface UseCasesProps {
  generateInvoice: UseCaseInterface;
  findInvoice: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
  private _generateInvoice: UseCaseInterface;
  private _findInvoice: UseCaseInterface;
  
  constructor(usecasesProps: UseCasesProps) {
    this._generateInvoice = usecasesProps.generateInvoice;
    this._findInvoice = usecasesProps.findInvoice;
  }
  
  generateInvoice(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
    return this._generateInvoice.execute(input);
  }

  findInvoice(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
    return this._findInvoice.execute(input);
  }
}