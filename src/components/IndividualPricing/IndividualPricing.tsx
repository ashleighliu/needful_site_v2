import { Center, Title, Text, Box, Grid } from '@mantine/core';
import { Advantage } from '../Advantage/Advantage';
import Bullseye from '../../assets/Bullseye.svg';
import Cloud from '../../assets/Speech.svg';
import Harmony from '../../assets/Harmony.svg';
import Infinity from '../../assets/Infinity.svg';
import { DownloadButtons } from '../DownloadButtons/DownloadButtons';

export function IndividualPricing() {
  return (
    <Box mt={50}>
      <Center>
        <Box>
          <Center>
            <Title order={2} style={{ color: '#404040' }}>
              Needful for Individuals
            </Title>
          </Center>
          <Center w={600}>
            <Text c='#555555' size='md'>
              Learn and leverage meditation in an accessible and practical way to achieve the deepest possible fulfillment in your life and work
            </Text>
          </Center>
        </Box>
      </Center>
      <Center mt={50}>
        <Grid gutter='xl' ml={300} mr={300}>
          <Grid.Col span={6}>
            <Advantage 
              image={Bullseye}
              title='Increase Concentration'
              description='Improve focus and reduce distraction using the integrated attention training technique (ATT) offered by the Needful meditation interface'
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Advantage
              image={Cloud}
              title='Achieve Clarity'
              description='Quiet the mind and cultivate deeper awareness, clearing brain fog and accessing clear and creative thinking from runway to 50,000 ft.'
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Advantage 
              image={Infinity}
              title='Increase Resilience'
              description='Tap into a repeatable way to handle obstacles and overcome adversity, while finding meaning and handling uncertainty in life and work'
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Advantage
              image={Harmony}
              title='Improve Mental Wellness'
              description='Disengage the fight-or-flight response and reduce stress, release fatigue, mitigate anxiety, alleviate depression, and avoid burnout '
            />
          </Grid.Col>
        </Grid>
      </Center>
      <Center mt={50}>
        <DownloadButtons />
      </Center>
    </Box>
  );
}