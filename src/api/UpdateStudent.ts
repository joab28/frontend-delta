type ObjStudentType = {
  file: any
  name: string
  street: string
  district: string
  zipcode: string
  city: string
  number: string
}
/**
 * Função cujo objetivo é atualizar informações de um estudante
 * @param {ObjStudentType} objStudent -> objeto com os dados a serem alterados
 * @param {number} id -> id do aluno
 * @returns {Object}  -> a imagem do aluno
 */
export async function UpdateStudent(objStudent: ObjStudentType, id: number) {
  const headers = {
    Accept: "application/json"
  }
  const body = new FormData()
  body.append("file", objStudent.file)
  body.append("name", objStudent.name)
  body.append("street", objStudent.street)
  body.append("district", objStudent.district)
  body.append("number", objStudent.number)
  body.append("zipcode", objStudent.zipcode)
  body.append("city", objStudent.city)
  const myInit: any = {
    method: "PUT",
    headers,
    body
  }
  const rest = await fetch(
    `https://api-cadastro-alunos.herokuapp.com/aluno/${id}`,
    myInit
  )

  const message = await rest.json()
  return { message, status: rest.status }
}
