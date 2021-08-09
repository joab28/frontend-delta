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
 * Função cujo objetivo é criar um estudante.
 * @param {ObjStudentType} objStudent -> um objeto com as informações necessarias para fazer o cadastro
 * @returns {Object}  -> Um objeto a resposta da api e o status
 */
export async function CreateStudent(objStudent: ObjStudentType) {
  const headers = {
    Accept: "application/json"
  }
  let body = new FormData()
  body.append("file", objStudent.file)
  body.append("name", objStudent.name)
  body.append("street", objStudent.street)
  body.append("district", objStudent.district)
  body.append("number", objStudent.number)
  body.append("zipcode", objStudent.zipcode)
  body.append("city", objStudent.city)
  const myInit: any = {
    method: "POST",
    headers,
    body
  }
  const rest = await fetch(
    `https://api-cadastro-alunos.herokuapp.com/aluno`,
    myInit
  )
  const aluno = await rest.json()
  return { aluno, status: rest.status }
}
