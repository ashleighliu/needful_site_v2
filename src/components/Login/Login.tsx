import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import {
  Box,
  Button,
  Center,
  Checkbox,
  Grid,
  Group,
  Image,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconArrowRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import Apple from '../../assets/Apple.svg';
import FacebookBlue from '../../assets/FacebookBlue.svg';
import Google from '../../assets/Google.svg';
import NeedfulLogo from '../../assets/NeedfulLogo.svg';
import Slogan from '../../assets/Slogan.svg';
import classes from './Login.module.css';

type LoginFormFields = {
  email: string;
  password: string;
  keep: boolean;
};

export function Login() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
      keep: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const navigate = useNavigate();

  // Initialize Firebase Authentication and get a reference to the service
  const auth = getAuth();

  const [formError, setFormError] = useState(false);

  function logUserIn(values: LoginFormFields) {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(userCredential);
        navigate('/');
      })
      .catch(() => {
        setFormError(true);
      });
  }

  return (
    <Box>
      <Grid align="center">
        <Grid.Col span={5}>
          <Image h={50} m="lg" w="auto" src={NeedfulLogo} onClick={() => navigate('/')} />
          <Center style={{ height: '80vh' }}>
            <Box>
              <Center>
                <form onSubmit={form.onSubmit((values) => logUserIn(values))}>
                  <Text c="#555555" fw={600} mb={10} size="sm">
                    Sign in
                  </Text>
                  <TextInput
                    placeholder="Email Address"
                    key={form.key('email')}
                    w={300}
                    {...form.getInputProps('email')}
                    error={formError}
                  />
                  <PasswordInput
                    placeholder="Password"
                    key={form.key('password')}
                    mt={10}
                    w={300}
                    {...form.getInputProps('password')}
                    error={
                      formError ? 'Your email or password was incorrect. Please try again.' : false
                    }
                  />
                  <Checkbox
                    label="Keep me logged in"
                    key={form.key('keep')}
                    mt={10}
                    {...form.getInputProps('keep')}
                  />
                  <Group mt={10}>
                    <Button type="submit" radius="sm" w={150} rightSection={<IconArrowRight />}>
                      LOGIN
                    </Button>
                    <Text fz="xs">Forgot your password?</Text>
                  </Group>
                  <Center>
                    <Button
                      mt={20}
                      radius="sm"
                      variant="outline"
                      w={300}
                      onClick={() => navigate('/signup')}
                    >
                      CREATE NEW ACCOUNT
                    </Button>
                  </Center>
                </form>
              </Center>
              <Center mt={40}>
                <Text className={classes.divider}>
                  <Text inherit component="span" className={classes.dividerText} fz="sm">
                    or continue with
                  </Text>
                </Text>
              </Center>
              <Center>
                <Group mt={40} gap="xl">
                  <Image src={Apple} onClick={() => {}} />
                  <Image src={FacebookBlue} onClick={() => {}} />
                  <Image src={Google} onClick={() => {}} />
                </Group>
              </Center>
              <Center>
                <Button
                  mt={20}
                  radius="sm"
                  variant="outline"
                  w={300}
                  onClick={() => navigate('/sso-login')}
                >
                  LOG IN WITH SSO
                </Button>
              </Center>
              <Center mt={20}>
                <Text>
                  Need an account?{' '}
                  <Text<'a'>
                    c="#00A884"
                    className={classes.link}
                    component="a"
                    fw={600}
                    onClick={() => navigate('/signup')}
                  >
                    Create one
                  </Text>
                </Text>
              </Center>
            </Box>
          </Center>
        </Grid.Col>
        <Grid.Col
          span={7}
          style={{
            backgroundColor: 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))',
          }}
        >
          <Center style={{ height: '100vh' }}>
            <Box>
              <Center>
                <Image src={Slogan} />
              </Center>
            </Box>
          </Center>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
