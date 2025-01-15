import { Button, Flex, Grid, Group, Image, Text } from "@mantine/core";
import NeedfulLogo from "../../assets/NeedfulLogo.svg";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";

export function Navbar() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery(`(max-width: 800px)`);

  // State for hover styles
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  // Inline styles for default and hover effect
  const tabStyle = {
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const tabHoverStyle = {
    ...tabStyle,
    textDecoration: "underline",
    textDecorationColor: "#00A884", // Green underline
    textDecorationThickness: "3px", // Thicker underline
    textUnderlineOffset: "25px", // Space between text and underline
  };

  return (
    <Grid align="center">
      <Grid.Col span={6}>
        <Group>
          <Image
            m={20}
            h={isMobile ? 30 : 50}
            w="auto"
            src={NeedfulLogo}
            onClick={() => navigate("/")}
          />
          <Text
            style={hoveredTab === "home" ? tabHoverStyle : tabStyle}
            onMouseEnter={() => setHoveredTab("home")}
            onMouseLeave={() => setHoveredTab(null)}
            onClick={() => (window.location.href = "https://needful.site")}
            c="#555555"
            visibleFrom="md"
          >
            Home
          </Text>

          <Text
            style={hoveredTab === "blog" ? tabHoverStyle : tabStyle}
            onMouseEnter={() => setHoveredTab("blog")}
            onMouseLeave={() => setHoveredTab(null)}
            c="#555555"
            visibleFrom="md"
            onClick={() =>
              window.open("https://www.needful.site/blog", "_blank")
            }
          >
            Blog
          </Text>

          {/* <Text
            style={hoveredTab === "about" ? tabHoverStyle : tabStyle}
            onMouseEnter={() => setHoveredTab("about")}
            onMouseLeave={() => setHoveredTab(null)}
            c="#555555"
            visibleFrom="md"
          >
            About
          </Text> */}
          <Text
            style={hoveredTab === "contact" ? tabHoverStyle : tabStyle}
            onMouseEnter={() => setHoveredTab("contact")}
            onMouseLeave={() => setHoveredTab(null)}
            c="#555555"
            visibleFrom="md"
            onClick={() => navigate("/contact")}
          >
            Contact
          </Text>
        </Group>
      </Grid.Col>
      <Grid.Col span={6}>
        <Flex gap="md" justify="flex-end" m={20}>
          <Button
            visibleFrom="md"
            h={45}
            radius="md"
            variant="outline"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button
            h={45}
            // Conditionally adjust width based on screen size
            w={useMediaQuery("(max-width: 768px)") ? 150 : 200}
            radius="md"
            onClick={() => navigate("/signup")}
          >
            {/* Conditionally render button text based on screen size */}
            {useMediaQuery("(max-width: 768px)")
              ? "Try for Free"
              : "Try Needful for Free"}
          </Button>
        </Flex>
      </Grid.Col>
    </Grid>
  );
}
