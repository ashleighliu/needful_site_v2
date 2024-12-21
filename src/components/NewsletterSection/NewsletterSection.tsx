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

  return (
    <Flex align="center" justify="center" mt={100} wrap="wrap" gap={100}>
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
      <Box className={classes.marginLeft}>
        <Box>
          <Text c="#555555" fw={600} mb={20} size="sm">
            Sign up to our newsletter
          </Text>
          <form onSubmit={() => {}}>
            <Group>
              <TextInput
                placeholder="Enter your email"
                key={form.key("email")}
                {...form.getInputProps("email")}
                w={350}
              />
              <Button type="submit" h={40} radius="md" w={150}>
                Subscribe
              </Button>
            </Group>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}
