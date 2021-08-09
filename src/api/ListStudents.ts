/**
 * Função cujo objetivo é retorna uma lista com todos os estudantes
 * @returns {Object}  -> um array com todos os estudantes cadastrados
 */
export async function ListStudents() {
  const headers = {
    Accept: "application/json"
  }
  const myInit: any = {
    method: "GET",
    headers
  }
  const rest = await fetch(
    `https://api-cadastro-alunos.herokuapp.com/aluno`,
    myInit
  )
  const response = await rest.json()

  return response
}
