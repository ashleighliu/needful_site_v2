import { Box, Button, Flex, Image, Stack, Text, Title } from "@mantine/core";
import Clipboard from "../../assets/Clipboard.svg";
import { Bullet } from "../Bullet/Bullet";
import { useNavigate } from "react-router-dom";

type SignUpMessageProps = {
  type: null | string;
};

export function SignUpMessage(props: SignUpMessageProps) {
  const { type } = props;

  const navigate = useNavigate();

  return (
    <Box style={{ height: "100vh" }}>
      <Flex gap="md" justify="flex-end" m={20}>
        <Button
          h={45}
          radius="sm"
          variant="outline"
          onClick={() => navigate("/login")}
          style={{ backgroundColor: "white" }}
        >
          Log in
        </Button>
        <Button
          h={45}
          radius="md"
          onClick={() => navigate("/signup")}
          style={{ borderColor: "white" }}
        >
          Contact
        </Button>
      </Flex>
      {type && (
        <Box ml={10}>
          <Image src={Clipboard} h={120} w="auto" ml={10} mb={30} />
          <Text c="#FFFFFF">
            Get the full Needful meditation experience for
          </Text>
          <Title mb={40} style={{ color: "#FFF492" }}>
            $0 today
          </Title>
          {type === "team" && (
            <Title order={3} mb={20} style={{ color: "#FFFFFF" }}>
              Enjoy all features for $429.00 CAD per month, billed annually
              after your 14-day trial. Cancel anytime.
            </Title>
          )}
          <Stack>
            <Bullet
              text={"Unlimited access to premium features of the Needful app"}
              alternate
            />
            <Bullet
              text={"Seamless sync between mobile app and web platform"}
              alternate
            />
            <Bullet
              text={"Option to integrate with Slack, Asana, and Notion"}
              alternate
            />
            <Bullet
              text={"24/7 support and resources for optimal adoption"}
              alternate
            />
          </Stack>
        </Box>
      )}
    </Box>
  );
}
