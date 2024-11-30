import { Center, Title, Text, Box, Grid, Button, Collapse } from '@mantine/core';
import { Advantage } from '../Advantage/Advantage';
import { TeamsPricingDetails } from '../TeamsPricingDetails/TeamsPricingDetails';
import { useDisclosure } from '@mantine/hooks';
import BarChart from '../../assets/BarChart.svg';
import Harmony from '../../assets/Harmony.svg';
import Lightbulb from '../../assets/Lightbulb.svg';
import Speech from '../../assets/Speech.svg';

export function TeamsPricing() {
  const [opened, { toggle }] = useDisclosure(false);
  
  return (
    <Box mt={50}>
      <Center>
        <Box>
          <Center>
            <Title order={2} style={{ color: '#404040' }}>
              Needful for Teams
            </Title>
          </Center>
          <Center w={600}>
            <Text c='#555555' size='md'>
              Provide a mental wellness benefit to your team members that will pay dividends in engagement, satisfaction, and collaboration
            </Text>
          </Center>
        </Box>
      </Center>
      <Center mt={50}>
        <Grid gutter='xl' ml={300} mr={300}>
          <Grid.Col span={6}>
            <Advantage 
              image={Harmony}
              title='Enhance Well-Being'
              description='Reduced stress, improved mental health, increased satisfaction'
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Advantage
              image={BarChart}
              title='Boost Productivity'
              description='Better focus, efficient time management, enhanced creativity and abstract thinking'
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Advantage 
              image={Speech}
              title='Improve Engagement'
              description='Increase motivation, improve communication and collaboration'
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Advantage
              image={Lightbulb}
              title='Culture Innovation'
              description='Create the optimal conditions for innovation by encouraging outside-the-box thinking'
            />
          </Grid.Col>
        </Grid>
      </Center>
      <Center mt={50}>
        <Button fz='md' h={50} onClick={toggle} radius='xl' w={250}>
          {opened ? "Collapse Pricing" : "Expand Pricing"}
        </Button>
      </Center>
      <Collapse in={opened} transitionDuration={500}>
        <Center>
          <TeamsPricingDetails />
        </Center>
      </Collapse>
    </Box>
  );
}