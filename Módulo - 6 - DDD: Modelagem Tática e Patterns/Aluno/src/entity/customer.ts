import { Address } from "./address";

export class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;

  constructor(
    id: string, 
    name: string, 
  ) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  get name(): string {
    return this._name;
  }

  get isActive(): boolean {
    return this._active;
  }

  set address(address: Address) {
    this._address = address;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }

    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }

  // Expressividade semântica
  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  // Classe Anêmica
  // get id(): string {
  //   return this._id;
  // }

  // get name(): string {
  //   return this._name;
  // }

  // get address(): string {
  //   return this._address;
  // }

  // set id(id: string) {
  //   this._id = id;
  // }

  // set name(name: string) {
  //   this._name = name;
  // }

  // set address(address: string) {
  //   this._address = address;
  // }
}