import { Title, Text, Box, Flex, Center } from "@mantine/core";
import { DownloadButtons } from "../DownloadButtons/DownloadButtons";
import BannerBackground from "../../assets/BannerBackground.mp4";
import classes from "./Banner.module.css";
import { useMediaQuery } from "@mantine/hooks";

export function Banner() {
  const isMobile = useMediaQuery("(max-width: 800px)");

  return (
    <Box>
      <Box className={classes.fullHeight}>
        <video
          autoPlay
          className={classes.background}
          loop
          muted
          src={BannerBackground}
        />
      </Box>
      <Flex className={classes.banner}>
        <Box className={classes.verticalAlign}>
          <Title className={classes.title} order={1}>
            Meditation for Clarity, Vision, and Execution
          </Title>
          <Text className={classes.subtitle} c="#404040" fz="md" fw={400}>
            The only platform designed to enhance productivity through
            meditation
          </Text>
          {isMobile ? (
            <Center>
              <DownloadButtons />
            </Center>
          ) : (
            <DownloadButtons />
          )}
        </Box>
      </Flex>
    </Box>
  );
}
