import React from "react"
import { GetCep } from "../../api"

import {
  Input,
  SimpleGrid,
  FormLabel,
  FormControl,
  Box,
  useToast
} from "@chakra-ui/react"
type ObjCepType = {
  cep: string
  cidade: string
  bairro: string
  rua: string
  numCasa: string
}
type propsType = {
  name: string
  setName: React.Dispatch<React.SetStateAction<string>>
  setFile: React.Dispatch<any>
  setObjCep: React.Dispatch<React.SetStateAction<ObjCepType>>
  objCep: any
}

export function FormStudent(props: propsType) {
  const { name, setName, setFile, setObjCep, objCep } = props
  const toast = useToast()

  function alertToast(message: string, status: any) {
    toast({
      description: message,
      status,
      duration: 1500,
      isClosable: true,
      position: "bottom-right"
    })
  }
  async function searchCep(cep: any) {
    const data = await GetCep(cep.target.value)
    setObjCep({
      ...objCep,
      cidade: data.localidade,
      bairro: data.bairro,
      rua: data.logradouro
    })
  }
  const updateObj = (e: React.ChangeEvent<HTMLInputElement>) => {
    setObjCep({
      ...objCep,
      [e.target.name]: e.target.value
    })
  }
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      if (event.target.files[0].type === "image/jpeg") {
        setFile(event.target.files)
      } else {
        alertToast("Apenas arquivo de imagem JPG", "error")
        setFile({})
        event.target.value = ""
      }
    }
  }

  return (
    <>
      <FormControl isRequired>
        <FormLabel textColor="#000">Nome</FormLabel>
        <Input
          placeholder="Nome"
          size="sm"
          name="nome"
          marginBottom="2px"
          textColor="#000"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <SimpleGrid columns={2} spacing={1}>
          <Box>
            <FormLabel textColor="#000">Logradouro</FormLabel>
            <Input
              placeholder="Logradouro"
              size="sm"
              name="rua"
              textColor="#000"
              onChange={updateObj}
              value={objCep.rua}
            />
          </Box>
          <Box>
            <FormLabel textColor="#000">Número</FormLabel>
            <Input
              placeholder="Numero"
              size="sm"
              name="numCasa"
              textColor="#000"
              onChange={updateObj}
              value={objCep.numCasa}
            />
          </Box>
          <Box>
            <FormLabel textColor="#000">Bairro</FormLabel>
            <Input
              placeholder="Bairro"
              size="sm"
              name="bairro"
              textColor="#000"
              onChange={updateObj}
              value={objCep.bairro}
            />
          </Box>
          <Box>
            <FormLabel textColor="#000">CEP</FormLabel>
            <Input
              placeholder="CEP"
              size="sm"
              name="cep"
              onBlur={searchCep}
              textColor="#000"
              onChange={updateObj}
              value={objCep.cep}
            />
          </Box>
          <Box>
            <FormLabel textColor="#000">Cidade</FormLabel>
            <Input
              placeholder="Cidade"
              size="sm"
              textColor="#000"
              name="cidade"
              value={objCep.cidade}
              onChange={updateObj}
            />
          </Box>
        </SimpleGrid>
        <Box>
          <FormLabel textColor="#000">Imagem</FormLabel>
          <Input
            type="file"
            id="file"
            accept=".jpg"
            textColor="#000"
            name="file"
            onChange={handleFileChange}
          />
        </Box>
      </FormControl>
    </>
  )
}
