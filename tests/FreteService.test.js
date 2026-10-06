import { FreteService } from "../src/services/FreteService.js";

describe("FreteService", () => {
  let service;

  beforeEach(() => {
    service = new FreteService();
  });

  describe("Cálculo de frete por peso e região", () => {
    test("deve calcular frete para produto de até 1kg na região Nordeste", () => {
      const frete = service.calcularFrete({
        peso: 1,
        regiao: "NORDESTE",
        valorCompra: 100
      });

      expect(frete).toBe(15);
    });

    test("deve calcular frete para produto de até 5kg na região Nordeste", () => {
      const frete = service.calcularFrete({
        peso: 5,
        regiao: "NORDESTE",
        valorCompra: 100
      });

      expect(frete).toBe(25);
    });

    test("deve calcular frete para produto acima de 5kg na região Nordeste", () => {
      const frete = service.calcularFrete({
        peso: 6,
        regiao: "NORDESTE",
        valorCompra: 100
      });

      expect(frete).toBe(40);
    });

    test("deve calcular frete de até 1kg no Sudeste", () => {
      const frete = service.calcularFrete({
        peso: 1,
        regiao: "SUDESTE",
        valorCompra: 100
      });

      expect(frete).toBe(10);
    });

    test("deve calcular frete de até 5kg no Sudeste", () => {
      const frete = service.calcularFrete({
        peso: 5,
        regiao: "SUDESTE",
        valorCompra: 100
      });

      expect(frete).toBe(18);
    });

    test("deve calcular frete acima de 5kg no Sudeste", () => {
      const frete = service.calcularFrete({
        peso: 10,
        regiao: "SUDESTE",
        valorCompra: 100
      });

      expect(frete).toBe(30);
    });

    test("deve calcular frete de até 1kg no Sul", () => {
      const frete = service.calcularFrete({
        peso: 1,
        regiao: "SUL",
        valorCompra: 100
      });

      expect(frete).toBe(12);
    });

    test("deve calcular frete acima de 5kg no Norte", () => {
      const frete = service.calcularFrete({
        peso: 6,
        regiao: "NORTE",
        valorCompra: 100
      });

      expect(frete).toBe(55);
    });
  });

  describe("Frete grátis", () => {
    test("deve conceder frete grátis quando a compra atingir exatamente R$ 200", () => {
      const frete = service.calcularFrete({
        peso: 10,
        regiao: "NORDESTE",
        valorCompra: 200
      });

      expect(frete).toBe(0);
    });

    test("deve conceder frete grátis quando a compra for superior a R$ 200", () => {
      const frete = service.calcularFrete({
        peso: 10,
        regiao: "SUDESTE",
        valorCompra: 500
      });

      expect(frete).toBe(0);
    });

    test("não deve conceder frete grátis quando a compra estiver abaixo de R$ 200", () => {
      const frete = service.calcularFrete({
        peso: 10,
        regiao: "SUDESTE",
        valorCompra: 199.99
      });

      expect(frete).toBe(30);
    });
  });

  describe("Prazos operacionais", () => {
    test("deve retornar prazo de 7 dias para o Nordeste", () => {
      expect(service.calcularPrazo("NORDESTE")).toBe(7);
    });

    test("deve retornar prazo de 5 dias para o Sudeste", () => {
      expect(service.calcularPrazo("SUDESTE")).toBe(5);
    });

    test("deve retornar prazo de 6 dias para o Sul", () => {
      expect(service.calcularPrazo("SUL")).toBe(6);
    });

    test("deve retornar prazo de 8 dias para o Centro-Oeste", () => {
      expect(service.calcularPrazo("CENTRO_OESTE")).toBe(8);
    });

    test("deve retornar prazo de 10 dias para o Norte", () => {
      expect(service.calcularPrazo("NORTE")).toBe(10);
    });

    test("deve rejeitar uma região inválida no cálculo do prazo", () => {
      expect(() => {
        service.calcularPrazo("REGIAO_INVALIDA");
      }).toThrow("Região inválida");
    });
  });

  describe("Validação de CEP", () => {
    test("deve validar CEP com oito dígitos", () => {
      const resultado = service.validarCep("40000000");

      expect(resultado.valido).toBe(true);
    });

    test("deve aceitar CEP formatado com hífen", () => {
      const resultado = service.validarCep("40000-000");

      expect(resultado.valido).toBe(true);
    });

    test("deve identificar CEP da região Nordeste", () => {
      const resultado = service.validarCep("40000-000");

      expect(resultado.regiao).toBe("NORDESTE");
    });

    test("deve identificar CEP da região Sudeste", () => {
      const resultado = service.validarCep("01000-000");

      expect(resultado.regiao).toBe("SUDESTE");
    });

    test("deve identificar CEP da região Sul", () => {
      const resultado = service.validarCep("80000-000");

      expect(resultado.regiao).toBe("SUL");
    });

    test("deve rejeitar CEP com quantidade incorreta de dígitos", () => {
      const resultado = service.validarCep("12345");

      expect(resultado.valido).toBe(false);
    });

    test("deve rejeitar CEP vazio", () => {
      const resultado = service.validarCep("");

      expect(resultado.valido).toBe(false);
    });

    test("deve rejeitar CEP nulo", () => {
      const resultado = service.validarCep(null);

      expect(resultado.valido).toBe(false);
    });
  });

  describe("Cálculo de frete utilizando CEP", () => {
    test("deve calcular frete utilizando a região identificada pelo CEP", () => {
      const frete = service.calcularFretePorCep({
        cep: "40000-000",
        peso: 1,
        valorCompra: 100
      });

      expect(frete).toBe(15);
    });

    test("deve conceder frete grátis mesmo utilizando CEP", () => {
      const frete = service.calcularFretePorCep({
        cep: "01000-000",
        peso: 10,
        valorCompra: 200
      });

      expect(frete).toBe(0);
    });

    test("deve rejeitar cálculo quando o CEP for inválido", () => {
      expect(() => {
        service.calcularFretePorCep({
          cep: "123",
          peso: 2,
          valorCompra: 100
        });
      }).toThrow("CEP inválido");
    });
  });

  describe("Validação dos dados de entrada", () => {
    test("deve rejeitar peso igual a zero", () => {
      expect(() => {
        service.calcularFrete({
          peso: 0,
          regiao: "SUDESTE",
          valorCompra: 100
        });
      }).toThrow("Peso deve ser maior que zero");
    });

    test("deve rejeitar peso negativo", () => {
      expect(() => {
        service.calcularFrete({
          peso: -1,
          regiao: "SUDESTE",
          valorCompra: 100
        });
      }).toThrow("Peso deve ser maior que zero");
    });

    test("deve rejeitar peso que não seja número", () => {
      expect(() => {
        service.calcularFrete({
          peso: "5",
          regiao: "SUDESTE",
          valorCompra: 100
        });
      }).toThrow("Peso deve ser um número");
    });

    test("deve rejeitar valor de compra negativo", () => {
      expect(() => {
        service.calcularFrete({
          peso: 2,
          regiao: "SUDESTE",
          valorCompra: -50
        });
      }).toThrow("Valor da compra não pode ser negativo");
    });

    test("deve rejeitar região inexistente", () => {
      expect(() => {
        service.calcularFrete({
          peso: 2,
          regiao: "INVALIDA",
          valorCompra: 100
        });
      }).toThrow("Região inválida");
    });
  });
});
