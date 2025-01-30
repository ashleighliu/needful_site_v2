import { useState } from "react";
import {
  Box,
  Center,
  Grid,
  Group,
  Image,
  Radio,
  Stepper,
  Text,
} from "@mantine/core";
import NeedfulLogo from "../../assets/NeedfulLogo.svg";
import classes from "./SignUp.module.css";
import { TeamsSignUp } from "../TeamsSignUp/TeamsSignUp";
import { IndividualSignUp } from "../IndividualSignUp/IndividualSignUp";
import { SignUpMessage } from "../SignUpMessage/SignUpMessage";
import { useLocation, useNavigate } from "react-router-dom";
import { EmailConfirmation } from "../EmailConfirmation/EmailConfirmation";
import { SetPassword } from "../SetPassword/SetPassword";
import { PaymentDetails } from "../PaymentDetails/PaymentDetails";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

export function SignUp() {
  const location = useLocation();
  const { pathname } = location;
  const [active, setActive] = useState(pathname === "/signup" ? 0 : 2);
  const [email, setEmail] = useState("");
  const [type, setType] = useState<string | null>(null);
  const navigate = useNavigate();
  const next = () => {
    if (active === 0) {
      sendLinkToEmail();
    }
    setActive((current) => (current < 4 ? current + 1 : current));
  };

  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: "https://www.needful.site/signup/continue",
    // This must be true.
    handleCodeInApp: true,
  };

  const auth = getAuth();

  function sendLinkToEmail() {
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem("emailForSignIn", email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Handle errors here
      });
  }

  return (
    <Grid>
      <Grid.Col span={8}>
        <Image
          h={50}
          m="lg"
          w="auto"
          src={NeedfulLogo}
          onClick={() => navigate("/")}
        />
        <Stepper active={active} onStepClick={setActive} size="sm" m={20}>
          <Stepper.Step
            description="Personal Information"
            allowStepSelect={false}
          >
            <Box>
              <Radio.Group value={type} onChange={setType}>
                <Center>
                  <Grid align="flex-end">
                    <Grid.Col span={6}>
                      <Text c="#555555" mb={10} size="sm">
                        Sign up to Needful
                      </Text>
                      <Radio.Card
                        className={classes.root}
                        radius="sm"
                        value="team"
                      >
                        <Group wrap="nowrap" align="flex-start">
                          <Radio.Indicator />
                          <Center>
                            <Text className={classes.label}>Team</Text>
                          </Center>
                        </Group>
                      </Radio.Card>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Radio.Card
                        className={classes.root}
                        radius="sm"
                        value="individual"
                      >
                        <Group wrap="nowrap" align="flex-start">
                          <Radio.Indicator />
                          <Center>
                            <Text className={classes.label}>Individual</Text>
                          </Center>
                        </Group>
                      </Radio.Card>
                    </Grid.Col>
                  </Grid>
                </Center>
              </Radio.Group>
              <Center>
                {type === "team" && (
                  <TeamsSignUp next={next} email={email} setEmail={setEmail} />
                )}
                {type === "individual" && (
                  <IndividualSignUp
                    next={next}
                    email={email}
                    setEmail={setEmail}
                  />
                )}
              </Center>
            </Box>
          </Stepper.Step>
          <Stepper.Step
            description="Email Confirmation"
            allowStepSelect={false}
          >
            <Center>
              <EmailConfirmation next={next} />
            </Center>
          </Stepper.Step>
          <Stepper.Step description="Set Password" allowStepSelect={false}>
            <Center>
              <SetPassword />
            </Center>
          </Stepper.Step>
          <Stepper.Step description="Payment Details" allowStepSelect={false}>
            <Center>
              <PaymentDetails />
            </Center>
          </Stepper.Step>
        </Stepper>
      </Grid.Col>
      <Grid.Col span={4} style={{ backgroundColor: "#00A884" }}>
        <SignUpMessage type={type} />
      </Grid.Col>
    </Grid>
  );
}
