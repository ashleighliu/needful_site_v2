import { useState } from "react";
import { useForm } from "@mantine/form";
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
  sendSignInLinkToEmail,
} from "firebase/auth";
import {
  Box,
  Center,
  Grid,
  Radio,
  Text,
  TextInput,
  Button,
  Image,
  Group,
} from "@mantine/core";
import NeedfulLogoWhite from "../../assets/NeedfulLogoWhite.svg";
import classes from "./SSOLogin.module.css";
import { useNavigate } from "react-router-dom";

type SignUpFormFields = {
  email: string;
};

export function SSOLogin() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const navigate = useNavigate();
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: "http://www.needful.site/home",
    // This must be true.
    handleCodeInApp: true,
  };

  const auth = getAuth();

  function sendLinkToEmail(values: SignUpFormFields) {
    sendSignInLinkToEmail(auth, values.email, actionCodeSettings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem("emailForSignIn", values.email);

        // Navigate to the verify email page after sending the link
        navigate("/verify-email");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Handle errors here
      });
  }

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
    },
  });

  return (
    <Grid style={{ height: "100vh" }}>
      <Grid.Col span={8} className={classes.content}>
        <Image h={50} m="lg" w="auto" src={NeedfulLogoWhite} />
        <Box m={40}>
          <Text size="md" mb={20} ml={"300px"}>
            Do you have an existing account with Needful?
          </Text>
          <Center>
            <Radio.Group value={selectedOption} onChange={setSelectedOption}>
              <Group>
                <Radio
                  value="existing"
                  label="Yes, I have an existing account"
                  className={classes.radio}
                />
                <Radio
                  value="sso"
                  label="No, log in with my SSO account"
                  className={classes.radio}
                />
              </Group>
            </Radio.Group>
          </Center>

          {selectedOption === "existing" && (
            <Box mt={30}>
              <Text size="sm" mb={10} ml={"300px"}>
                Sign in
              </Text>
              <TextInput
                label="Email Address"
                placeholder="Email Address"
                required
                mb={10}
                style={{ width: "600px" }}
                ml={"300px"}
              />
              <TextInput
                label="Password"
                type="password"
                placeholder="Password"
                required
                mb={10}
                style={{ width: "600px" }}
                ml={"300px"}
              />
              <Button
                fullWidth
                mt="md"
                variant="filled"
                type="submit"
                style={{ width: "600px" }}
                ml={"300px"}
              >
                Sign in
              </Button>
              <Text size="sm" mt={10} color="dimmed" ml={"300px"}>
                Forgot your password?
              </Text>
            </Box>
          )}

          {selectedOption === "sso" && (
            <form onSubmit={form.onSubmit((values) => sendLinkToEmail(values))}>
              <Box mt={30}>
                <Text size="sm" mb={10} ml={"300px"}>
                  Single Sign On
                </Text>
                <Text size="xs" mb={20} color="dimmed" ml={"300px"}>
                  Your organization uses SSO to use Needful. Sign in using your
                  SSO credentials.
                </Text>
                <TextInput
                  key={form.key("email")}
                  {...form.getInputProps("email")}
                  label="Email Address"
                  placeholder="Email Address"
                  required
                  mb={10}
                  style={{ width: "600px" }}
                  ml={"300px"}
                />
                <Button
                  fullWidth
                  mt="md"
                  variant="filled"
                  type="submit"
                  style={{ width: "600px" }}
                  ml={"300px"}
                >
                  Continue
                </Button>
              </Box>
            </form>
          )}
        </Box>
      </Grid.Col>

      <Grid.Col span={4} className={classes.sidebar}>
        <Center className={classes.logoContainer} style={{ height: "100%" }}>
          <Image
            h={50}
            m="lg"
            w="auto"
            src={NeedfulLogoWhite}
            className={classes.logo}
          />
        </Center>
      </Grid.Col>
    </Grid>
  );
}
