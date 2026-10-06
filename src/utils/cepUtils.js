export function validarCep(cep) {
  if (typeof cep !== "string") {
    return {
      valido: false,
      regiao: null
    };
  }

  const cepLimpo = cep.replace(/\D/g, "");

  if (cepLimpo.length !== 8) {
    return {
      valido: false,
      regiao: null
    };
  }

  const numero = Number(cepLimpo);

  let regiao = null;

  // Região Sudeste
  if (numero >= 1000000 && numero <= 39999999) {
    regiao = "SUDESTE";
  }

  // Região Sul
  else if (numero >= 80000000 && numero <= 99999999) {
    regiao = "SUL";
  }

  // Região Nordeste
  else if (numero >= 40000000 && numero <= 65999999) {
    regiao = "NORDESTE";
  }

  // Região Norte
  else if (numero >= 66000000 && numero <= 69999999) {
    regiao = "NORTE";
  }

  // Centro-Oeste
  else if (numero >= 70000000 && numero <= 79999999) {
    regiao = "CENTRO_OESTE";
  }

  return {
    valido: regiao !== null,
    regiao
  };
}
