/**
 * Função cujo objetivo é buscar a imagem de um aluno
 * @param {number} id -> id do aluno
 * @returns {Object}  -> a imagem do aluno
 */
export async function GetImage(id: number) {
  const rest = await fetch(
    `https://api-cadastro-alunos.herokuapp.com/aluno/file/${id}`
  )
  const file = await rest.blob()
  var imagem = window.URL.createObjectURL(file)
  return imagem
}
