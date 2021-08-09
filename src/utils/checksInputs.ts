export function checksInputs(objStudent: any, file: object | null) {
  console.log(file)
  for (let value in objStudent) {
    if (objStudent[value] === "") return true
  }
  if (file) if (Object.keys(file).length === 0) return true
  return false
}
