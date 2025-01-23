import { Box, Button, Center, Flex, Image, Text, Title } from "@mantine/core";
import CheckEmail from "../../assets/CheckEmail.svg";
import { getAuth, sendSignInLinkToEmail } from "@firebase/auth";

type VerifyEmailProps = {
  signup?: boolean;
};

export function VerifyEmail(props: VerifyEmailProps) {
  const { signup } = props;

  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: signup
      ? "http://www.needful.site/signup/continue"
      : "http://www.needful.site/home",
    // This must be true.
    handleCodeInApp: true,
  };

  function sendLinkToEmail() {
    const email = window.localStorage.getItem("emailForSignIn");
    if (email == null) {
      return;
    }
    const auth = getAuth();
    sendSignInLinkToEmail(auth, email, actionCodeSettings);
  }

  return (
    <Box mt={signup ? 0 : 200}>
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
            onClick={sendLinkToEmail}
          >
            Resend email
          </Button>
        </Flex>
      </Center>
    </Box>
  );
}
