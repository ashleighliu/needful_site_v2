import { Box, Button, Flex, Image, Stack, Text, Title } from '@mantine/core';
import Clipboard from '../../assets/Clipboard.svg';
import { Bullet } from '../Bullet/Bullet';
import { useNavigate } from 'react-router-dom';

type SignUpMessageProps = {
  type: null | string;
};

export function SignUpMessageNoText(props: SignUpMessageProps) {
  const { type } = props;

  const navigate = useNavigate();

  return (
    <Box style={{ height: '100vh' }}>
      <Flex gap="md" justify="flex-end" m={20}>
        <Button
          h={45}
          radius="sm"
          variant="outline"
          onClick={() => navigate('/login')}
          style={{ backgroundColor: 'white' }}
        >
          Log in
        </Button>
        <Button
          h={45}
          radius="md"
          onClick={() => navigate('/signup')}
          style={{ borderColor: 'white' }}
        >
          Contact
        </Button>
      </Flex>
    </Box>
  );
}
