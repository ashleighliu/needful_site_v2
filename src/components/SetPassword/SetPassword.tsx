import {
  Text,
  Button,
  Center,
  Box,
  Fieldset,
  PasswordInput,
} from "@mantine/core";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/services/firebase";
import { FormEvent, useState } from "react";

export function SetPassword() {
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const docRef = await addDoc(collection(db, "redirects"), {
      email: window.localStorage.getItem("emailForSignIn"),
      password,
    });
    window.location.href = `https://app.salesbricks.com/products/needful-subscription/new?sku=4f7f18f9-7952-4b73-a543-b8bb42a46a61&locked=yes&meta_signupId=${docRef.id}`;
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <Center>
        <Box w={540}>
          <Text>Set your password</Text>
        </Box>
      </Center>
      <Center>
        <Fieldset
          legend={<Text size="xs">Password</Text>}
          radius="sm"
          pt={0}
          pb={10}
          mt={5}
        >
          <PasswordInput
            mt={10}
            w={500}
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
            styles={{
              input: {
                border: "none",
              },
            }}
          />
        </Fieldset>
      </Center>
      <Center>
        <Fieldset
          legend={<Text size="xs">Confirm Password</Text>}
          radius="sm"
          pt={0}
          pb={10}
          mt={5}
        >
          <PasswordInput
            mt={10}
            w={500}
            styles={{
              input: {
                border: "none",
              },
            }}
          />
        </Fieldset>
      </Center>
      <Center>
        <Button mt={20} type="submit" w={540}>
          CONTINUE
        </Button>
      </Center>
      <Center>
        <Button mt={10} variant="outline" w={540}>
          BACK TO LOGIN
        </Button>
      </Center>
    </form>
  );
}
