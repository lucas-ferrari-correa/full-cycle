class Customer {
  _id: string;
  _name: string;
  _address: string;
  _active: boolean;

  constructor(
    id: string, 
    name: string, 
    address: string,
    active: boolean,
  ) {
    this._id = id;
    this._name = name;
    this._address = address;
    this._active = active;
    this.validate();
  }

  validate() {
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }

    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
  }

  // Expressividade semântica
  changeName(name: string) {
    this._name = name;
  }

  activate() {
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