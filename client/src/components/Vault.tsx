import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { saveVault } from "../api";
import { encryptVault } from "../crypto";
import { VaultItem } from "../pages";
import FormWrapper from "./FormWrapper";

function Cofre({
  cofre = [],
  chaveCofre = "",
}: {
  cofre: VaultItem[];
  chaveCofre: string;
}) {
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      cofre,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "cofre",
  });

  const mutacao = useMutation(saveVault);

  return (
    <FormWrapper
      onSubmit={handleSubmit(({ cofre }) => {
        console.log({ cofre });

        const cofreCriptografado = encryptVault({
          vault: JSON.stringify({ cofre }),
          vaultKey: chaveCofre,
        });

        window.sessionStorage.setItem("vault", JSON.stringify(cofre));

        mutacao.mutate({
          encryptedVault: cofreCriptografado,
        });
      })}
    >
      {fields.map((field, index) => {
        return (
          <Box
            mt="4"
            mb="4"
            display="flex"
            key={field.id}
            alignItems="flex-end"
          >
            <FormControl>
              <FormLabel htmlFor="website">Website</FormLabel>
              <Input
                type="url"
                id="website"
                placeholder="Website"
                {...register(`cofre.${index}.website`, {
                  required: "Website é obrigatório",
                })}
              />
            </FormControl>

            <FormControl ml="2">
              <FormLabel htmlFor="username">Nome de Usuário</FormLabel>
              <Input
                id="username"
                placeholder="Nome de Usuário"
                {...register(`cofre.${index}.username`, {
                  required: "Nome de usuário é obrigatório",
                })}
              />
            </FormControl>

            <FormControl ml="2">
              <FormLabel htmlFor="password">Senha</FormLabel>
              <Input
                type="password"
                id="password"
                placeholder="Senha"
                {...register(`cofre.${index}.password`, {
                  required: "Senha é obrigatória",
                })}
              />
            </FormControl>

            <Button
              type="button"
              bg="red.500"
              color="white"
              fontSize="2xl"
              ml="2"
              onClick={() => remove(index)}
            >
              -
            </Button>
          </Box>
        );
      })}

      <Button
        onClick={() => append({ website: "", username: "", password: "" })}
      >
        Adicionar
      </Button>

      <Button ml="8" color="teal" type="submit">
        Salvar cofre
      </Button>
    </FormWrapper>
  );
}

export default Cofre;
