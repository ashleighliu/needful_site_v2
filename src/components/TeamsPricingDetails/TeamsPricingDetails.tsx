import { Button, Center, Flex, Paper, Stack, Text, Title } from "@mantine/core";
import { Bullet } from "../Bullet/Bullet";
import { theme } from "../../theme";
import classes from "./TeamsPricingDetails.module.css";
import { IconArrowRight } from "@tabler/icons-react";

export function TeamsPricingDetails() {
  if (!theme.colors || !theme.colors.brand) {
    return null;
  }

  return (
    <Flex direction="column" mt={50}>
      <Center>
        <Paper radius="xl" shadow="lg" className={classes.paper}>
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={25}
            style={{ height: "100%" }}
            wrap="wrap"
          >
            <Center
              w={400}
              className={classes.price}
              style={{
                backgroundColor: theme.colors.brand[1],
              }}
            >
              <Flex direction="column">
                <Center>
                  <Title order={3} style={{ color: "#404040" }}>
                    Premium PRO
                  </Title>
                </Center>
                <Center>
                  <Title style={{ color: "#404040", display: "inline" }}>
                    $479
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#404040",
                        marginLeft: "4px",
                      }}
                    >
                      /month
                    </span>
                  </Title>
                </Center>
                {/* <Center>
                  <Text c="#555555" size="sm">
                    billed annually
                  </Text>
                </Center> */}
                <Button h={40} mt={25} w={300}>
                  Get Started
                </Button>
              </Flex>
            </Center>
            <Center m={25}>
              <Stack>
                <Bullet
                  text={
                    "Unlimited access to premium features of the Needful app"
                  }
                />
                <Bullet
                  text={"Seamless sync between mobile app and web platform"}
                />
                <Bullet
                  text={"Option to integrate with Slack, Asana, and Notion"}
                />
                <Bullet
                  text={"24/7 support and resources for optimal adoption"}
                />
              </Stack>
            </Center>
          </Flex>
        </Paper>
      </Center>
      <Center mt={50} className={classes.center}>
        <Title
          order={2}
          style={{ color: "#404040", fontSize: "20px" }}
          className={classes.title}
        >
          Is your team greater than 10 members?{" "}
          <Text
            inherit
            component="span"
            c={theme.colors.brand[6]}
            style={{
              textDecoration: "none",
              transition: "text-decoration 0.3s ease",
              fontSize: "20px", // Adjust font size here
            }}
            onMouseEnter={(
              e: React.MouseEvent<HTMLSpanElement, MouseEvent>
            ) => {
              (e.target as HTMLSpanElement).style.textDecoration = "underline";
            }}
            onMouseLeave={(
              e: React.MouseEvent<HTMLSpanElement, MouseEvent>
            ) => {
              (e.target as HTMLSpanElement).style.textDecoration = "none";
            }}
          >
            Get a custom rate for your organization!
            <IconArrowRight
              style={{ marginLeft: "8px", verticalAlign: "middle" }}
            />
          </Text>
        </Title>
      </Center>
    </Flex>
  );
}
