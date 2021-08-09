import React, { useState, useEffect } from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast
} from "@chakra-ui/react"
import { FormStudent } from "./FormStudent"
import { UpdateStudent } from "../../api/index"
import { checksInputs } from "../../utils/checksInputs"
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
}
type ModalPorpsType = {
  isOpen: boolean
  onOpen: React.MouseEventHandler<HTMLButtonElement>
  onClose: any
  id: number
  listStudents: any
  objStudent: ObjStudentType
}
type ObjCepType = {
  cep: string
  cidade: string
  bairro: string
  rua: string
  numCasa: string
}

export function ModalUpdateStudent(props: ModalPorpsType) {
  const toast = useToast()
  const { id, isOpen, onOpen, onClose, listStudents, objStudent } = props
  const [name, setName] = useState<string>("")
  const [file, setFile] = useState<any>({})
  const [objCep, setObjCep] = useState<ObjCepType>({
    cep: "",
    cidade: "",
    bairro: "",
    rua: "",
    numCasa: ""
  })
  function alertToast(message: string, status: any) {
    toast({
      description: message,
      status,
      duration: 1500,
      isClosable: true,
      position: "bottom-right"
    })
  }
  useEffect(() => {
    setName(objStudent.name)
    setObjCep({
      cep: objStudent.zipcode,
      cidade: objStudent.city,
      bairro: objStudent.district,
      rua: objStudent.street,
      numCasa: objStudent.number
    })
  }, [objStudent])
  async function editStudent() {
    if (checksInputs({ name, ...objCep }, null)) {
      alertToast("Falta campos a serem preenchidos", "error")
    } else {
      const student = await UpdateStudent(
        {
          file: file[0],
          name,
          street: objCep.rua,
          district: objCep.bairro,
          zipcode: objCep.cep,
          city: objCep.cidade,
          number: objCep.numCasa
        },
        id
      )

      if (student.status === 200) {
        alertToast(student.message, "success")
      } else {
        alertToast(student.message, "error")
      }
      listStudents()
    }
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} trapFocus={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Estudante</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={20}>
          <FormStudent
            name={name}
            setName={setName}
            setFile={setFile}
            setObjCep={setObjCep}
            objCep={objCep}
          />
        </ModalBody>

        <ModalFooter>
          <Button onClick={editStudent} colorScheme="blue" mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
