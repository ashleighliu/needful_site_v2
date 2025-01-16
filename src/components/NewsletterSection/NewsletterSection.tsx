import {
  Box,
  Button,
  Center,
  Flex,
  Group,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from "./NewsletterSection.module.css";

export function NewsletterSection() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  // const handleSubmit = async (values: { email: string }) => {
  //   if (!form.validate().hasErrors) {
  //     const apiInstance = new SibApiV3Sdk.ContactsApi();

  //     const createContact = new SibApiV3Sdk.CreateContact();

  //     createContact.email = values.email;
  //     createContact.listIds = [5];

  //     apiInstance.createContact(createContact);
  //   }
  // };

  return (
    <Box className={classes.newsletter}>
      <Flex align="center" justify="center" wrap="wrap" gap={50}>
        <Box>
          <Center>
            <Box>
              <Title style={{ color: "#404040" }}>Stay up to date!</Title>
              <Text c="#555555" fw={500} size="sm">
                Subscribe to our newsletter to get inbox notifications
              </Text>
            </Box>
          </Center>
        </Box>
        <Box>
          <Box>
            <Text c="#555555" fw={600} mb={20} size="sm">
              Sign up to our newsletter
            </Text>
            <form onSubmit={() => {}}>
              <Group>
                <TextInput
                  placeholder="Enter your email"
                  {...form.getInputProps("email")}
                  className={classes.input}
                />
                <Button type="submit" h={40} radius="md" w={150}>
                  Subscribe
                </Button>
              </Group>
            </form>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
