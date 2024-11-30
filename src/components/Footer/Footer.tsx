import { Text, Container, Center, Image, Box, Flex, Grid } from '@mantine/core';
import { MediaButtons } from '../MediaButtons/MediaButtons';
import AppStore from '../../assets/AppStore.svg';
import GooglePlay from '../../assets/GooglePlay.png';
import Canada from '../../assets/Canada.svg';
import Location from '../../assets/Location.svg';
import NeedfulLogo from '../../assets/NeedfulLogo.svg';
import Phone from '../../assets/Phone.svg';
import classes from './Footer.module.css';

export function Footer() {
  return (
    <footer className={classes.footer}>
      <Grid>
        <Grid.Col span={6}>
          <Box>
            <Center>
              <Image src={NeedfulLogo} w={300}/>
            </Center>
            <Center>
              <Text c='#888888' size="sm" fw={600} className={classes.description}>
                Doing by being
              </Text>
            </Center>
            <Center>
              <MediaButtons />
            </Center>
          </Box>
        </Grid.Col>
        <Grid.Col span={6}>
          <div className={classes.groups}>
            <div className={classes.wrapper} key="Contact">
              <Text c='#404040' className={classes.title}>Contact</Text>
              <Flex>
                <Center>
                  <Image src={Location} h={20} w={20} mr={5}/>
                </Center>
                <Text<'a'>
                  c='#888888'
                  className={classes.link}
                  component="a"
                  href="/"
                  onClick={(event) => event.preventDefault()}
                >
                  Toronto
                </Text>
                <Center>
                <Image src={Canada} h={20} w={20} ml={5}/>
                </Center>
              </Flex>
              <Flex>
                <Center>
                  <Image src={Phone} h={17} w={17} mr={10}/>
                </Center>
                <Text<'a'>
                  c='#888888'
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
              <Text c='#404040' className={classes.title}>Useful links</Text>
              <Text<'a'>
                c='#888888'
                className={classes.link}
                component="a"
                href="/"
                onClick={(event) => event.preventDefault()}
              >
                Resources
              </Text>
              <Text<'a'>
                c='#888888'
                className={classes.link}
                component="a"
                href="/"
                onClick={(event) => event.preventDefault()}
              >
                Get a tour
              </Text>
              <Text<'a'>
                c='#888888'
                className={classes.link}
                component="a"
                href="/"
                onClick={(event) => event.preventDefault()}
              >
                Contact us
              </Text>
            </div>
            <div>
              <Image src={AppStore} onClick={() => {}} h={50} mb={10}/>
              <Image src={GooglePlay} onClick={() => {}} h={50} />
            </div>
          </div>
        </Grid.Col>
      </Grid>
      <Container className={classes.afterFooter}>
        <Center>
          <Text c='#888888' size="sm">
            © 2024 Needful. All rights reserved.
          </Text>
        </Center>
      </Container>
    </footer>
  );
};