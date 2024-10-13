import { Text, Button, Center, Box, Fieldset, PasswordInput } from '@mantine/core';

type SetPasswordProps = {
  next: () => void;
};

export function SetPassword(props: SetPasswordProps) {
  const { next } = props;

  return (
    <form onSubmit={() => {}}>
      <Center>
        <Box w={540}>
          <Text>Set your password</Text>
        </Box>
      </Center>
      <Center>
        <Fieldset legend={<Text size="xs">Password</Text>} radius="sm" pt={0} pb={10} mt={5}>
          <PasswordInput
            mt={10}
            w={500}
            styles={{
              input: {
                border: 'none',
              },
            }}
          />
        </Fieldset>
      </Center>
      <Center>
        <Fieldset legend={<Text size="xs">Confirm Password</Text>} radius="sm" pt={0} pb={10} mt={5}>
          <PasswordInput
            mt={10}
            w={500}
            styles={{
              input: {
                border: 'none',
              },
            }}
          />
        </Fieldset>
      </Center>
      <Center>
        <Button mt={20} onClick={next} w={540}>CONTINUE</Button>
      </Center>
      <Center>
        <Button mt={10} variant='outline' w={540}>BACK TO LOGIN</Button>
      </Center>
    </form>
  );
}
