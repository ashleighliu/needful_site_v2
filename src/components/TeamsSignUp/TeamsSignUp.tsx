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
  Box,
} from "@mantine/core";
import classes from "./TeamsSignUp.module.css";
import { useNavigate } from "react-router-dom";

type TeamsSignUpProps = {
  next: () => void;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
};

export function TeamsSignUp(props: TeamsSignUpProps) {
  const { next, email, setEmail } = props;

  const [size, setSize] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <form onSubmit={() => {}}>
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
        legend={<Text size="xs">Company Name</Text>}
        radius="sm"
        pt={0}
        pb={10}
        mt={5}
      >
        <TextInput placeholder="Company Name" variant="unstyled" />
      </Fieldset>
      <Fieldset
        legend={<Text size="xs">Business Email</Text>}
        radius="sm"
        pt={0}
        pb={10}
        mt={5}
      >
        <TextInput
          placeholder="Business Email"
          variant="unstyled"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
      </Fieldset>
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
      <Radio.Group value={size} onChange={setSize} mt={5}>
        <Center>
          <Grid align="flex-end">
            <Grid.Col span={6}>
              <Text c="#555555" mb={5} size="xs">
                Number of Employees
              </Text>
              <Radio.Card className={classes.root} radius="sm" value="less">
                <Group wrap="nowrap" align="flex-start">
                  <Radio.Indicator />
                  <Center>
                    <Text className={classes.label}>Less than 10</Text>
                  </Center>
                </Group>
              </Radio.Card>
            </Grid.Col>
            <Grid.Col span={6}>
              <Radio.Card className={classes.root} radius="sm" value="more">
                <Group wrap="nowrap" align="flex-start">
                  <Radio.Indicator />
                  <Center>
                    <Text className={classes.label}>10 or more</Text>
                  </Center>
                </Group>
              </Radio.Card>
            </Grid.Col>
          </Grid>
        </Center>
      </Radio.Group>

      {size === "more" && (
        <Box mt={10} w={500}>
          <Text fz="sm" fw={600}>
            To proceed with your sign-up,{" "}
            <Text<"a">
              c="#00A884"
              className={classes.link}
              component="a"
              fz="sm"
            >
              please contact our sales team for assistance.
            </Text>
          </Text>
          <Text fz="sm">
            Our team will help tailor the best solution for your organization.
          </Text>
        </Box>
      )}
      <Center>
        <Button
          disabled={size === "more"}
          mt={20}
          radius="sm"
          fullWidth
          onClick={next}
        >
          CONTINUE
        </Button>
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
    </form>
  );
}
