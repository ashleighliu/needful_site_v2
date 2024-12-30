import { Center, Image, Title, Text, Box, Flex } from "@mantine/core";
import AppPreviews from "../../assets/AppPreviews.svg";
import RedBubbles from "../../assets/RedBubbles.svg";
import classes from "./InformationSection.module.css";

export function InformationSection() {
  return (
    <Box mt={200} style={{ position: "relative", overflow: "hidden" }}>
      {/* Red Bubbles Image at the top-right */}
      <Box
        style={{
          position: "absolute",
          top: "20px", // Slightly below the top edge
          right: "-20px", // Increase this value to push further out and hide whitespace
          width: "auto",
          height: "auto",
          zIndex: -1, // Ensures it is behind all other elements
        }}
      >
        <Image
          src={RedBubbles}
          alt="Red Bubbles"
          style={{
            maxWidth: "300px", // Maintains a smaller size
            height: "auto",
          }}
        />
      </Box>

      {/* Information Section Content */}
      <Flex justify="center" align="center" wrap="wrap" gap="xl">
        <Box className={classes.segment}>
          <Center ml={100}>
            <Image className={classes.icon} src={AppPreviews} />
          </Center>
        </Box>
        <Box className={classes.segment}>
          <Center className={classes.marginRightIntroduction}>
            <Box>
              <Title
                order={2}
                style={{ color: "#404040" }}
                className={classes.title}
              >
                Meditation meets productivity
              </Title>
              <Text c="#555555" mt={25} size="md" className={classes.body}>
                Needful is the only meditation app designed with productivity
                features for individuals and teams.
              </Text>
              <Text c="#555555" mt={25} size="md" className={classes.body}>
                The micro-meditation protocol provides all of the benefits of
                traditional meditation, while allowing users to easily
                incorporate it into existing workflows and routines.
              </Text>
              <Text c="#555555" mt={25} size="md" className={classes.body}>
                While users effortlessly tap into deeper levels of
                concentration, to-dos or breakthroughs are generated and stored
                in Needful.
              </Text>
            </Box>
          </Center>
        </Box>
      </Flex>
    </Box>
  );
}
