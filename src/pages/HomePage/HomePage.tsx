import React, { useState } from "react"
import { Button, VStack, Stack, Image, Text } from "@chakra-ui/react"
import { navigateTo } from "../../utils/navigateTo"
import logo from "../../2246900.jpg"
function navigate() {
  navigateTo("/students")
}
export function HomePage() {
  return (
    <Stack style={{ backgroundColor: "#00acae" }}>
      <VStack spacing={2} margin={"62px 32px 0px 32px"}>
        <Text fontSize="50px" textColor="#fff">
          Sistema De Cadastro De Alunos
        </Text>
        <Image
          boxSize="30%"
          src={logo}
          width={{ base: "100%", sm: "50%", md: "30%" }}
        />
        <Button
          size="lg"
          width={{ base: "100%", sm: "50%", md: "10%" }}
          onClick={() => navigate()}
        >
          Entrar
        </Button>
        <br />
      </VStack>
    </Stack>
  )
}
