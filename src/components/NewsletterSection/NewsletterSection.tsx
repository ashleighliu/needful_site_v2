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

  const handleSubmit = async (values: { email: string }) => {
    if (!form.validate().hasErrors) {
      fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          accept: "application/json",
          "api-key":
            "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",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          listIds: [5],
        }),
      });
    }
  };

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
            <form onSubmit={form.onSubmit(handleSubmit)}>
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
