import { Title, Text, Box } from "@mantine/core";
import { DownloadButtons } from "../DownloadButtons/DownloadButtons";
import BannerBackground from "../../assets/BannerBackground.mp4";
import classes from "./Banner.module.css";

export function Banner() {
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
      <Box className={classes.banner}>
        <Box className={classes.verticalAlign}>
          <Title className={classes.title} order={1}>
            Meditation for Clarity, Vision, and Execution
          </Title>
          <Text c="#404040" fz="md" fw={400}>
            The only platform designed to enhance productivity through
            meditation
          </Text>
          <DownloadButtons />
        </Box>
      </Box>
    </Box>
  );
}
