import { validarCep } from "../utils/cepUtils.js";

export class FreteService {
  constructor() {
    this.tabelasFrete = {
      NORDESTE: {
        ate1kg: 15.00,
        ate5kg: 25.00,
        acima5kg: 40.00
      },
      SUDESTE: {
        ate1kg: 10.00,
        ate5kg: 18.00,
        acima5kg: 30.00
      },
      SUL: {
        ate1kg: 12.00,
        ate5kg: 20.00,
        acima5kg: 35.00
      },
      CENTRO_OESTE: {
        ate1kg: 18.00,
        ate5kg: 28.00,
        acima5kg: 45.00
      },
      NORTE: {
        ate1kg: 20.00,
        ate5kg: 35.00,
        acima5kg: 55.00
      }
    };

    this.prazos = {
      NORDESTE: 7,
      SUDESTE: 5,
      SUL: 6,
      CENTRO_OESTE: 8,
      NORTE: 10
    };

    this.valorMinimoFreteGratis = 200;
  }

  calcularFrete({ peso, regiao, valorCompra }) {
    this.validarDadosFrete({ peso, regiao, valorCompra });

    if (valorCompra >= this.valorMinimoFreteGratis) {
      return 0;
    }

    const tabela = this.tabelasFrete[regiao];

    if (peso <= 1) {
      return tabela.ate1kg;
    }

    if (peso <= 5) {
      return tabela.ate5kg;
    }

    return tabela.acima5kg;
  }

  calcularPrazo(regiao) {
    if (!regiao || !this.prazos[regiao]) {
      throw new Error("Região inválida");
    }

    return this.prazos[regiao];
  }

  validarDadosFrete({ peso, regiao, valorCompra }) {
    if (typeof peso !== "number" || Number.isNaN(peso)) {
      throw new Error("Peso deve ser um número");
    }

    if (peso <= 0) {
      throw new Error("Peso deve ser maior que zero");
    }

    if (typeof valorCompra !== "number" || Number.isNaN(valorCompra)) {
      throw new Error("Valor da compra deve ser um número");
    }

    if (valorCompra < 0) {
      throw new Error("Valor da compra não pode ser negativo");
    }

    if (!regiao || !this.tabelasFrete[regiao]) {
      throw new Error("Região inválida");
    }
  }

  validarCep(cep) {
    return validarCep(cep);
  }

  calcularFretePorCep({ cep, peso, valorCompra }) {
    const resultado = validarCep(cep);

    if (!resultado.valido) {
      throw new Error("CEP inválido");
    }

    return this.calcularFrete({
      peso,
      regiao: resultado.regiao,
      valorCompra
    });
  }
}
