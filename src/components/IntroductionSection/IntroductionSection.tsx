import { useState } from "react";
import { Box, Button, Center, Flex, Image, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Features from "../../assets/Features.svg";
import NeedfulExplainerVideo from "../../assets/NeedfulExplainerVideo.mp4";
import ExplainerVideoThumbnail from "../../assets/ExplainerVideoThumbnail.svg";
import MobilePreview from "../../assets/MobilePreview.svg";
import YellowBubbles from "../../assets/YellowBubbles.svg";
import GreenBubbles from "../../assets/GreenBubbles.svg";
import classes from "./IntroductionSection.module.css";
import NeedfulIconAnimated from "../../assets/NeedfulIconAnimated.mp4";
import AnimatedNeedfulGif from "../../assets/AnimatedNeedfulGif.gif";

export function IntroductionSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <Box mt={100} style={{ position: "relative", overflow: "hidden" }}>
      <Box
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "auto",
          height: "100%",
          zIndex: -1, // Ensures it is behind all other elements
        }}
      >
        <Image
          src={GreenBubbles}
          alt="Green Bubbles"
          style={{
            maxWidth: "500px",
            height: "auto",
          }}
        />
      </Box>

      {/* Video Section */}
      <Center mb={50}>
        <Box style={{ textAlign: "center" }}>
          <Title order={2} style={{ color: "#00A884", marginBottom: "8px" }}>
            Discover Needful
          </Title>
          <Text size="sm" style={{ color: "#555555", marginBottom: "16px" }}>
            Watch the video and start your wellness & success journey now
          </Text>
          <Center>
            {!isVideoPlaying ? (
              <Image
                src={ExplainerVideoThumbnail}
                alt="Needful Explainer Video Thumbnail"
                className={classes.thumbnail}
                onClick={() => setIsVideoPlaying(true)}
              />
            ) : (
              <video
                src={NeedfulExplainerVideo}
                controls
                autoPlay
                className={classes.video}
              />
            )}
          </Center>
        </Box>
      </Center>

      {/* Existing Introduction Section */}
      <Flex justify="center" align="center" wrap="wrap" gap="xl">
        <Box className={classes.segment}>
          <Center>
            {/* Conditionally render the video or gif based on screen size */}
            {useMediaQuery("(max-width: 768px)") ? (
              <img
                className={classes.icon}
                src={AnimatedNeedfulGif}
                alt="Needful Animated Gif"
              />
            ) : (
              <video
                className={classes.icon}
                autoPlay
                loop
                muted
                src={NeedfulIconAnimated}
              />
            )}
          </Center>
        </Box>
        <Box className={classes.segment}>
          <Center className={classes.marginRightIntroduction}>
            <Box>
              <Title order={2} className={classes.title}>
                What is Needful?
              </Title>
              <Text c="#555555" size="md" className={classes.body}>
                Needful combines the most accessible, effortless meditation
                technique that anyone can use, with a platform designed to boost
                productivity, enhance creativity, and achieve powerful results
                in life and work.
              </Text>
            </Box>
          </Center>
        </Box>
      </Flex>

      {/* Other sections remain unchanged */}
      <Flex justify="center" align="center" wrap="wrap" mt={50} gap="xl">
        <Box className={classes.segment}>
          <Center className={classes.marginRightIntroduction}>
            <Image className={classes.offsetImage} src={MobilePreview} />
          </Center>
        </Box>
        <Box className={classes.segment}>
          <Center className={classes.marginRightIntroduction}>
            <Box>
              <Title order={2} className={classes.title}>
                What does Needful do?
              </Title>
              <Text c="#555555" size="md" className={classes.body}>
                Needful facilitates a powerful micro-meditation protocol
                enhanced with a tactile interface and audio experience that
                increases concentration, creativity, and problem solving
                ability.
              </Text>
            </Box>
          </Center>
        </Box>
      </Flex>
      <Flex justify="center" align="center" wrap="wrap" mt={100} gap="xl">
        <Box className={classes.segment}>
          <Center>
            <Image src={Features} />
          </Center>
        </Box>
        <Box className={classes.segment}>
          <Image
            src={YellowBubbles}
            className={classes.bubbles}
            h="auto"
            w={1000}
          />
          <Center className={classes.marginRightIntroduction}>
            <Box>
              <Title order={2} className={classes.title}>
                How does Needful work?
              </Title>
              <Text c="#555555" size="md" className={classes.body}>
                The Needful micro-meditation technique quiets the mind and
                cultivates a deeper state of awareness bringing to the surface
                thoughts, ideas and initiatives which chart your path to
                success.
              </Text>
            </Box>
          </Center>
        </Box>
      </Flex>
      <Center mt={100}>
        <a
          href="https://www.youtube.com/watch?v=LWfT5avdhQQ"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <Button
            fz="md"
            radius="xl"
            h={50}
            w={250}
            styles={{
              root: {
                backgroundColor: "#00A884", // Button background color
                color: "white", // Text color
                border: "none", // Remove outline
                "&:hover": {
                  backgroundColor: "#005f00", // Darker green for hover effect
                },
              },
            }}
          >
            Get a Tour
          </Button>
        </a>
      </Center>
    </Box>
  );
}
