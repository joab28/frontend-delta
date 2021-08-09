/**
 * Função cujo objetivo é buscar o endereço pelo cep.
 * @param {number} cep -> cep a ser buscado
 * @returns {Object}  -> Um objeto com o endereço relacionado ao cep
 */
export async function GetCep(cep: number) {
  const rest = await fetch(`http://viacep.com.br/ws/${cep}/json/`)
  const data = await rest.json()
  return data
}
