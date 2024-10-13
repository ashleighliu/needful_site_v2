import { Button, Center, Flex, Paper, Stack, Text, Title } from '@mantine/core';
import { Bullet } from '../Bullet/Bullet';
import { theme } from '../../theme';

export function TeamsPricingDetails() {
  if (!theme.colors || !theme.colors.brand) {
    return null;
  }

  return (
    <Flex direction="column" mt={50}>
      <Center>
        <Paper h={250} radius="xl" shadow="lg" w={1200}>
          <Flex
            direction={{ base: 'column', sm: 'row' }}
            gap={25}
            style={{ height: "100%" }}
          >
            <Center w={400} style={{ borderBottomLeftRadius: "24px", borderTopLeftRadius: "24px", backgroundColor: theme.colors.brand[1] }}>
              <Flex direction="column">
                <Center>
                  <Title order={3} style={{ color: '#404040' }}>
                    Premium PRO
                  </Title>
                </Center>
                <Center>
                  <Title style={{ color: '#404040' }}>
                    $479
                  </Title>
                </Center>
                <Center>
                  <Text c='#555555' size='sm'>
                    billed annually
                  </Text>
                </Center>
                <Button h={40} mt={25} w={300}>
                  Get Started
                </Button>
              </Flex>
            </Center>
            <Center m={25}>
              <Stack>
                <Bullet text={"Unlimited access to premium features of the Needful app"} />
                <Bullet text={"Seamless sync between mobile app and web platform"} />
                <Bullet text={"Option to integrate with Slack, Asana, and Notion"} />
                <Bullet text={"24/7 support and resources for optimal adoption"} />
              </Stack>
            </Center>
          </Flex>
        </Paper>
      </Center>
      <Center mt={50}>
        <Title order={2} style={{ color: '#404040' }}>
          Managing over 10 employees? {' '}
          <Text inherit component='span' c={theme.colors.brand[6]}>
            Get a custom rate for your business!
          </Text>
        </Title>
      </Center>
    </Flex>
  );
}