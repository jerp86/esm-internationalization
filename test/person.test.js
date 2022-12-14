import mocha from "mocha";
import chai from "chai";

import Person from "../src/person.js";

const { describe, it } = mocha;
const { expect } = chai;

describe("Person Suit test", () => {
  it("should return a person instance from a string", () => {
    const person = Person.generateInstanceFromString(
      "1 Bike,Carro 20000 2020-01-01 2020-02-01"
    );
    const expected = {
      from: "2020-01-01",
      to: "2020-02-01",
      vehicles: ["Bike", "Carro"],
      kmTraveled: "20000",
      id: "1",
    };

    expect(person).to.be.deep.equal(expected);
  });

  it("should format values in Portuguese", () => {
    const person = new Person({
      from: "2020-01-01",
      to: "2020-02-01",
      vehicles: ["Bike", "Carro"],
      kmTraveled: "20000",
      id: "1",
    });
    const result = person.formatted("pt-BR");
    const expected = {
      id: 1,
      vehicles: "Bike e Carro",
      kmTraveled: "20.000 km",
      from: "01 de janeiro de 2020",
      to: "01 de fevereiro de 2020",
    };

    expect(result).to.be.deep.equal(expected);
  });

  it("should format values in default language, English", () => {
    const person = new Person({
      from: "2020-01-01",
      to: "2020-02-01",
      vehicles: ["Bike", "Carro"],
      kmTraveled: "20000",
      id: "1",
    });
    const result = person.formatted();
    const expected = {
      id: 1,
      vehicles: "Bike and Carro",
      kmTraveled: "20,000 km",
      from: "January 01, 2020",
      to: "February 01, 2020",
    };

    expect(result).to.be.deep.equal(expected);
  });

  it("should return a person instance from a string with space before and/or after comma in vehicle list", () => {
    const person = Person.generateInstanceFromString(
      "1 Bike ,Carro, Aviao,Moto , Navio 20000 2020-01-01 2020-02-01"
    );
    const expected = {
      id: "1",
      vehicles: ["Bike", "Carro", "Aviao", "Moto", "Navio"],
      kmTraveled: "20000",
      from: "2020-01-01",
      to: "2020-02-01",
    };

    expect(person).to.be.deep.equal(expected);
  });
});
