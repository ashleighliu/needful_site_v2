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
    <Box
      style={{
        border: "2px solid #00A884", // Green border
        borderRadius: "15px", // Rounded corners
        padding: "60px 60px", // Padding for spacing
        width: "fit-content", // Adjust width dynamically to fit content
        margin: "50px auto", // Center the section
      }}
    >
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
    </Box>
  );
}
