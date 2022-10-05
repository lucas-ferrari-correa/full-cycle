import { Address } from "./address";
import { Customer } from "./customer"

describe("Customer unit tests", () => {
  it("Should throw error when id is empty", () => {
    expect(() => {
      let customer = new Customer("", "John");
    }).toThrowError("Id is required")
  })

  it("Should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer("123", "");
    }).toThrowError("Name is required")
  })

  it("Should change name", () => {
    let customer = new Customer("123", "John");
    customer.changeName("Jane")
    
    expect(customer.name).toBe("Jane");
  });

  it("Should activate customer", () => {
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 123, "29090-010", "São Paulo");
    customer.address = address;

    customer.activate();

    expect(customer.isActive).toBe(true);
  });

  it("Should not be able to activate a customer without address", () => {
    const customer = new Customer("1", "Customer 1");

    expect(() => {
      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer")
  });

  it("Should deactivate customer", () => {
    const customer = new Customer("1", "Customer 1");
    customer.deactivate()

    expect(customer.isActive).toBe(false);
  });
})