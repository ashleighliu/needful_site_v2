import { Box, Center, Flex, Image, Text, Title } from '@mantine/core';
import AppStore from '../../assets/AppStore.svg';
import GooglePlay from '../../assets/GooglePlay.png';

export function Welcome() {
  return (
    <Box mt={200}>
      <Center>
        <Title order={2}>Welcome to Needful!</Title>
      </Center>
      <Center>
        <Text>For the full Needful experience, download our mobile app.</Text>
      </Center>
      <Center mt={10}>
        <Flex align="center" gap="xl">
          <Image src={AppStore} onClick={() => {}} h={50} />
          <Image src={GooglePlay} onClick={() => {}} h={50} />
        </Flex>
      </Center>
    </Box>
  );
}
