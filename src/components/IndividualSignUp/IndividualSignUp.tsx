import { Dispatch, SetStateAction, useState } from "react";
import {
  Group,
  Text,
  TextInput,
  Radio,
  Button,
  Fieldset,
  Center,
  Grid,
  Select,
  NumberInput,
  Image,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Apple from "../../assets/Apple.svg";
import FacebookBlue from "../../assets/FacebookBlue.svg";
import Google from "../../assets/Google.svg";
import classes from "./IndividualSignUp.module.css";
import { useNavigate } from "react-router-dom";

type SignUpFormFields = {
  email: string;
};

type IndividualSignUpProps = {
  next: () => void;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
};

export function IndividualSignUp(props: IndividualSignUpProps) {
  const { next, email, setEmail } = props;

  const [gender, setGender] = useState<string | null>(null);
  const navigate = useNavigate();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
    },
  });

  const auth = getAuth();
  const [formError, setFormError] = useState(false);

  function signUserUp(values: SignUpFormFields) {
    createUserWithEmailAndPassword(auth, values.email, "fixedpassword1")
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // If sign-up is successful, call the next function
        next();
      })

      .catch(() => {
        setFormError(true);
      });
  }

  return (
    <form onSubmit={form.onSubmit((values) => signUserUp(values))}>
      <Grid mt={10}>
        <Grid.Col span={6}>
          <TextInput
            placeholder="First Name"
            radius="sm"
            styles={{
              input: {
                height: "50px",
              },
            }}
            w={250}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            placeholder="Last Name"
            radius="sm"
            styles={{
              input: {
                height: "50px",
              },
            }}
            w={250}
          />
        </Grid.Col>
      </Grid>
      <Fieldset
        legend={<Text size="xs">Email Address</Text>}
        radius="sm"
        pt={0}
        pb={10}
        mt={5}
      >
        <TextInput
          placeholder="Email Address"
          key={form.key("email")}
          {...form.getInputProps("email")}
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          variant="unstyled"
          error={
            formError
              ? "This email address is already in use. Please log in instead."
              : false
          }
        />
      </Fieldset>
      <Radio.Group value={gender} onChange={setGender} mt={5}>
        <Center>
          <Grid align="flex-end">
            <Grid.Col span={6}>
              <Text c="#555555" mb={5} size="xs">
                Gender
              </Text>
              <Radio.Card className={classes.root} radius="sm" value="team">
                <Group wrap="nowrap" align="flex-start">
                  <Radio.Indicator />
                  <Center>
                    <Text className={classes.label}>Female</Text>
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
                    <Text className={classes.label}>Male</Text>
                  </Center>
                </Group>
              </Radio.Card>
            </Grid.Col>
          </Grid>
        </Center>
      </Radio.Group>
      <Grid align="flex-end" mt={5}>
        <Grid.Col span={6}>
          <Fieldset
            legend={<Text size="xs">Country</Text>}
            radius="sm"
            pt={0}
            pb={10}
          >
            <Select
              placeholder="Country"
              data={["Canada", "United States"]}
              variant="unstyled"
            />
          </Fieldset>
        </Grid.Col>
        <Grid.Col span={6}>
          <Fieldset
            legend={<Text size="xs">Phone #</Text>}
            radius="sm"
            pt={0}
            pb={10}
          >
            <NumberInput
              placeholder="Phone #"
              prefix="+1 "
              hideControls
              variant="unstyled"
              allowNegative={false}
              allowDecimal={false}
            />
          </Fieldset>
        </Grid.Col>
      </Grid>
      <Center>
        <Center>
          <Button mt={20} radius="sm" fullWidth type="submit">
            CONTINUE
          </Button>
        </Center>
      </Center>
      <Center>
        <Button
          mt={10}
          radius="sm"
          variant="outline"
          fullWidth
          onClick={() => navigate("/login")}
        >
          BACK TO LOGIN
        </Button>
      </Center>
      <Center>
        <Text className={classes.divider}>
          <Text
            inherit
            component="span"
            className={classes.dividerText}
            fz="sm"
          >
            or continue with
          </Text>
        </Text>
      </Center>
      <Center>
        <Group gap="xl">
          <Image src={Apple} onClick={() => {}} />
          <Image src={FacebookBlue} onClick={() => {}} />
          <Image src={Google} onClick={() => {}} />
        </Group>
      </Center>
    </form>
  );
}
