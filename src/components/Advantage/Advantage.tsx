import { Box, Center, Flex, Grid, Group, Image, Text, Title } from '@mantine/core';

type AdvantageProps = {
  image: string;
  title: string;
  description: string;
}

export function Advantage(props: AdvantageProps) {
  const { image, title, description } = props;

  return (
    <Box>
      <Grid align='center'>
        <Grid.Col span={2}>
          <Image src={image} />
        </Grid.Col>
        <Grid.Col span={10}>
          <Center>
            <Box>
              <Title order={3} style={{ color: '#404040' }}>
                {title}
              </Title>
              <Text c='#555555' size="sm">
                {description}
              </Text>
            </Box>
          </Center>
        </Grid.Col>
      </Grid>
    </Box>
  );
}