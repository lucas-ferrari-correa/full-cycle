import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import ClientGateway from "../gateway/client.gateway";
import { ClientModel } from "./client.model";

export default class ClientRepository implements ClientGateway {
  async add(client: Client): Promise<void> {
    await ClientModel.create({
      id: client.id.id,
      name: client.name,
      email: client.email,
      document: client.document,
      street: client.street,
      number: client.number,
      complement: client.complement,
      city: client.city,
      zipCode: client.zipCode,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    });
  }

  async find(id: string): Promise<Client> {
    const client = await ClientModel.findOne({
      where: { id }
    });
    
    if (!client || !client.dataValues) {
      throw new Error("Client not found");
    }

    const clientValue = client.dataValues;

    return new Client({
      id: new Id(clientValue.id),
      name: clientValue.name,
      email: clientValue.email,
      document: clientValue.document,
      street: clientValue.street,
      number: clientValue.number,
      complement: clientValue.complement,
      city: clientValue.city,
      zipCode: clientValue.zipCode,
      createdAt: clientValue.createdAt,
      updatedAt: clientValue.updatedAt
    })
  }
}