import { Box, Button, Center, Flex, Image, Text, Title } from "@mantine/core";
import CheckEmail from "../../assets/CheckEmail.svg";
import AppStore from "../../assets/AppStore.svg";
import GooglePlay from "../../assets/GooglePlay.svg";

export function VerifyEmail() {
  return (
    <Box mt={200}>
      <Center>
        <Image src={CheckEmail} w={100} />
      </Center>
      <Center mt={20}>
        <Title order={2}>Please verify your email</Title>
      </Center>
      <Center>
        <Text mt={30}>
          You're almost there! Just click on the link in your email to complete
          your signup. You may need to check your spam folder.
        </Text>
      </Center>
      <Center mt={60}>
        <Text size="sm">Still can't find the email?</Text>
      </Center>
      <Center>
        <Flex align="center" gap="xl">
          <Button
            fullWidth
            mt="md"
            variant="filled"
            type="submit"
            style={{ width: "300px" }}
          >
            Resend email
          </Button>
        </Flex>
      </Center>
    </Box>
  );
}
