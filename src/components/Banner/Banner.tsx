import { Title, Text, Box, Flex, Center } from "@mantine/core";
import { DownloadButtons } from "../DownloadButtons/DownloadButtons";
import BannerBackground from "../../assets/BannerBackground.mp4";
import MobileBackground from "../../assets/MobileBackground.json";
import classes from "./Banner.module.css";
import { useMediaQuery } from "@mantine/hooks";
import Lottie from "react-lottie"; // Import the Lottie component

export function Banner() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Box>
      <Box className={classes.fullHeight}>
        {/* Conditionally render the background based on screen size */}
        {useMediaQuery("(max-width: 768px)") ? (
          // Render Lottie animation for mobile (JSON format)
          <Lottie
            options={{
              animationData: MobileBackground, // Set the Lottie animation data
              loop: true, // Set to loop
              autoplay: true, // Set to autoplay
            }}
            height="100%"
            width="100%"
          />
        ) : (
          // Default background for larger screens (video)
          <video
            autoPlay
            className={classes.background}
            loop
            muted
            src={BannerBackground}
          />
        )}
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
            <Center style={{ marginLeft: "120px" }}>
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
