import { Button, Flex, Grid, Group, Image, Text } from '@mantine/core';
import NeedfulLogo from '../../assets/NeedfulLogo.svg';
import { useNavigate } from 'react-router-dom';

export function Navbar() {
  const navigate = useNavigate();

  return (
    <Grid align="center">
      <Grid.Col span={6}>
        <Group>
          <Image m={20} h={50} w="auto" src={NeedfulLogo} onClick={() => navigate('/')} />
          <Text c="#555555" onClick={() => navigate('/home')} style={{cursor: "pointer"}}>Home</Text>
          <Text c="#555555" onClick={() => navigate('/About')} style={{cursor: "pointer"}}>About</Text>
          <Text c="#555555" onClick={() => navigate('/contact')} style={{cursor: "pointer"}}>
            Contact
          </Text>
        </Group>
      </Grid.Col>
      <Grid.Col span={6}>
        <Flex gap="md" justify="flex-end" m={20}>
          <Button h={45} radius="md" variant="outline" onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button h={45} w={200} radius="md" onClick={() => navigate('/signup')}>
            Try Needful for Free
          </Button>
        </Flex>
      </Grid.Col>
    </Grid>
  );
}
