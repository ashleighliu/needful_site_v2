import { Text, Button, Center, Box, PinInput } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

type EmailConfirmationProps = {
  next: () => void;
};

export function EmailConfirmation(props: EmailConfirmationProps) {
  const { next } = props;
  const navigate = useNavigate();

  return (
    <form onSubmit={() => {}}>
      <Center>
        <Box>
          <Text>Confirm your email address</Text>
          <Text fz='sm'>We have sent a verification code to your email</Text>
        </Box>
      </Center>
      <Center m={20}>
        <PinInput />
      </Center>
      <Center m={10}>
        <Button onClick={next}>CONTINUE</Button>
      </Center>
      <Center>
        <Button variant='outline'>RESEND EMAIL</Button>
      </Center>
      <Center mt={40}>
        <Button w={300}>CONTACT SUPPORT</Button>
      </Center>
      <Center mt={10}>
        <Button onClick={() => navigate('/login')} variant='outline' w={300}>BACK TO LOGIN</Button>
      </Center>
    </form>
  );
}
