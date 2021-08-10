import React, { useState, useEffect } from "react"
import {
  GetImage,
  ListStudents,
  CreateStudent,
  DeleteStudent
} from "../../api/index"
import { FormStudent } from "./FormStudent"
import { ModalUpdateStudent } from "./ModalUpdateStudent"
import { checksInputs } from "../../utils/checksInputs"
import {
  Box,
  Button,
  Text,
  Stack,
  useToast,
  Image,
  Flex,
  Spacer,
  useDisclosure
} from "@chakra-ui/react"
type ObjCepType = {
  cep: string
  cidade: string
  bairro: string
  rua: string
  numCasa: string
}

type ObjStudentType = {
  image: any
  name: string
  street: string
  district: string
  zipcode: string
  city: string
  number: string
  id_student: number
  id: number
  imageProp: string
}
export function StudentPage() {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [data, dataSet] = useState<Array<ObjStudentType>>([])
  const [name, setName] = useState<string>("")
  const [file, setFile] = useState<any>({})
  const [objModelStudent, setObjModelStudent] = useState<any>({})
  const [objCep, setObjCep] = useState<ObjCepType>({
    cep: "",
    cidade: "",
    bairro: "",
    rua: "",
    numCasa: ""
  })
  function openModal(e: any) {
    setObjModelStudent(e)
    onOpen()
  }
  function alertToast(message: string, status: any) {
    toast({
      description: message,
      status,
      duration: 1500,
      isClosable: true,
      position: "bottom-right"
    })
  }
  function clearInputs() {
    setObjCep({ cep: "", cidade: "", bairro: "", rua: "", numCasa: "" })
    setName("")
    setFile({})
  }
  async function sendStudent() {
    if (checksInputs({ name, ...objCep }, file)) {
      alertToast("Todos os campos devem ser preenchidos", "error")
    } else {
      const resp = await CreateStudent({
        file: file ? file[0] : null,
        name,
        street: objCep.rua,
        district: objCep.bairro,
        number: objCep.numCasa,
        zipcode: objCep.cep,
        city: objCep.cidade
      })
      if (resp.status === 201) {
        const imageProp = await GetImage(resp.aluno.id_student)
        resp.aluno.imageProp = imageProp
        dataSet([resp.aluno, ...data])
        clearInputs()

        alertToast("Cadastro realizado com sucesso!", "success")
      } else {
        alertToast(resp.aluno, "error")
      }
    }
  }

  async function deleteStudent(id: number) {
    const resp = await DeleteStudent(id)
    if (resp.status === 200) alertToast(resp.message, "success")
    else alertToast(resp.message, "error")
    listStudents()
  }
  async function listStudents() {
    const alunos = await ListStudents()

    for (let aluno in alunos) {
      var imageProp = await GetImage(alunos[aluno].id_student)
      alunos[aluno].imageProp = imageProp
    }
    dataSet(alunos.reverse())
  }
  useEffect(() => {
    listStudents()
  }, [])
  return (
    <>
      <Stack spacing="10px" align="center">
        <Box bg="#00acae" w="100%" p={6} color="white" textAlign="center">
          <Text as="cite" fontSize="40px">
            Cadastro
          </Text>
          <br />
        </Box>
        <Box bg="#fff" w={{ base: "100%", md: "50%" }} p={6} color="white">
          <FormStudent
            name={name}
            setName={setName}
            setFile={setFile}
            setObjCep={setObjCep}
            objCep={objCep}
          />
        </Box>
        <Button
          size="lg"
          width={{ base: "50%", sm: "50%", md: "10%" }}
          onClick={() => sendStudent()}
        >
          Cadastrar
        </Button>
      </Stack>
      <Stack spacing="10px" margin={{ base: "3%", md: "10%" }}>
        {data.map(e => (
          <Flex key={e.id_student}>
            <Box boxSize={{ base: "100px", md: "150px" }}>
              <Image
                borderRadius="full"
                boxSize={{ base: "70px", md: "150px" }}
                src={e.imageProp}
                alt="Segun Adebayo"
              />
            </Box>
            <Box fontSize={{ base: "50%", md: "90%" }} padding="10px">
              <Text>Nome: {e.name}</Text>
              <Text>
                Endereço: {e.street}, n° {e.number}
              </Text>
              <Text>Bairro: {e.district}</Text>
              <Text>Cidade: {e.city}</Text>
              <Text>CEP: {e.zipcode}</Text>
            </Box>
            <Spacer />
            <Box padding={{ base: "10px", md: "20px" }}>
              <Button
                width={{ base: "60%", md: "40%" }}
                size="xs"
                margin="5px"
                onClick={() => openModal(e)}
              >
                Editar
              </Button>
              <Button
                width={{ base: "60%", md: "40%" }}
                size="xs"
                bg="red.400"
                margin="5px"
                onClick={() => deleteStudent(e.id_student)}
              >
                Remover
              </Button>
            </Box>
          </Flex>
        ))}
        <ModalUpdateStudent
          id={objModelStudent.id_student}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          listStudents={listStudents}
          objStudent={objModelStudent}
        />
      </Stack>
    </>
  )
}
