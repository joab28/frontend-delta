/**
 * Função cujo objetivo é remover um estudante.
 * @param {number} id -> id do estudante a ser removido
 * @returns {Object}  -> Um objeto a resposta da api e o status
 */
export async function DeleteStudent(id: number) {
  const headers = {
    Accept: "application/json"
  }
  const myInit: any = {
    method: "DELETE",
    headers
  }
  const rest = await fetch(
    `https://api-cadastro-alunos.herokuapp.com/aluno/${id}`,
    myInit
  )
  const message = await rest.json()
  return { message, status: rest.status }
}
