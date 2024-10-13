import { Title, Text, Box } from '@mantine/core';
import { DownloadButtons } from '../DownloadButtons/DownloadButtons';
import BannerBackground from '../../assets/BannerBackground.mp4';
import classes from './Banner.module.css';

export function Banner() {
  return (
    <Box>
      <video autoPlay className={classes.background} loop muted src={BannerBackground} />
      <Box ml={100}>
        <Box className={classes.verticalAlign}>
          <Title className={classes.title} order={1}>
            Meditation for Clarity, Vision, and Execution
          </Title>
          <Text c='#404040' fz='md' fw={400}>
            The only platform designed to enhance productivity through meditation
          </Text>
          <DownloadButtons />
        </Box>
      </Box>
    </Box>
  );
}
