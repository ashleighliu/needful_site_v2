import { Text, Container, Center, Image, Box, Flex, Grid } from "@mantine/core";
import { MediaButtons } from "../MediaButtons/MediaButtons";
import AppStore from "../../assets/AppStore.svg";
import GooglePlay from "../../assets/GooglePlay.svg";
import Canada from "../../assets/Canada.svg";
import Location from "../../assets/Location.svg";
import DoingByBeing from "../../assets/DoingByBeing.svg";
import Phone from "../../assets/Phone.svg";
import QRCode from "../../assets/QRCode.svg";
import AppStoreQR from "../../assets/AppStoreQR.svg";
import GooglePlayQR from "../../assets/GooglePlayQR.svg";
import classes from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={classes.footer}>
      <Grid grow>
        <Grid.Col span="auto">
          <Box>
            <Center>
              <Image src={DoingByBeing} w={300} />
            </Center>
            <Center>
              <MediaButtons />
            </Center>
            {/* Blog link - visible only in `sm` viewport */}
            <Center hiddenFrom="md" mt="md">
              <Text<"a">
                c="#888888"
                className={classes.link}
                component="a"
                href="/blog"
              >
                Discover the Needful Blog
              </Text>
            </Center>
          </Box>
        </Grid.Col>
        <Grid.Col span="auto" visibleFrom="md">
          <div className={classes.groups}>
            <div className={classes.wrapper} key="Contact">
              <Text c="#404040" className={classes.title}>
                Contact
              </Text>
              <Flex>
                <Center>
                  <Image src={Location} h={15} w={15} mr={5} />
                </Center>
                <Text<"a">
                  c="#888888"
                  className={classes.link}
                  component="a"
                  href="/"
                  onClick={(event) => event.preventDefault()}
                >
                  Toronto
                </Text>
                <Center>
                  <Image src={Canada} h={15} w={15} ml={5} />
                </Center>
              </Flex>
              <Flex>
                <Center>
                  <Image src={Phone} h={15} w={15} mr={10} />
                </Center>
                <Text<"a">
                  c="#888888"
                  className={classes.link}
                  component="a"
                  href="/"
                  onClick={(event) => event.preventDefault()}
                >
                  1-800-539-0293
                </Text>
              </Flex>
            </div>
            <div className={classes.wrapper} key="Useful links">
              <Text c="#404040" className={classes.title}>
                Useful links
              </Text>
              <Text<"a">
                c="#888888"
                className={classes.link}
                component="a"
                href="/"
                onClick={(event) => event.preventDefault()}
              >
                Resources
              </Text>
              <Text<"a">
                c="#888888"
                className={classes.link}
                component="a"
                href="https://www.youtube.com/watch?v=LWfT5avdhQQ"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get a tour
              </Text>
              <Text<"a">
                c="#888888"
                className={classes.link}
                component="a"
                href="/"
                onClick={(event) => event.preventDefault()}
              >
                Contact us
              </Text>
            </div>
            <div>
              {/* QR Code and App Store icons */}
              <Flex justify="center" align="center" gap={15} mt={10}>
                {/* QR Code and App Store */}
                <Flex direction="column" align="center" gap={4}>
                  <Image src={AppStoreQR} h={30} />
                  <Image src={AppStore} onClick={() => {}} h={35} />
                </Flex>
                {/* QR Code and Play Store */}
                <Flex direction="column" align="center" gap={4}>
                  <Image src={QRCode} h={30} />
                  <Image src={GooglePlayQR} onClick={() => {}} h={35} />
                </Flex>
              </Flex>
            </div>
          </div>
        </Grid.Col>
      </Grid>
      <Container className={classes.afterFooter}>
        <Center>
          <Text c="#888888" size="sm">
            © 2024 Needful. All rights reserved.
          </Text>
        </Center>
      </Container>
    </footer>
  );
}
