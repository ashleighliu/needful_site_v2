import { Box, Button, Center, Grid, Group, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';

export function NewsletterSection() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <Grid align='center' mt={100}>
      <Grid.Col span={6}>
        <Center>
          <Box>
            <Title style={{ color: '#404040' }}>
              Stay up to date!
            </Title>
            <Text c='#555555' fw={500} size="sm">
              Subscribe to our newsletter to get inbox notifications
            </Text>
          </Box>
        </Center>
      </Grid.Col>
      <Grid.Col span={6}>
          <Box>
            <Text c='#555555' fw={600} mb={20} size="sm">
              Sign up to our newsletter
            </Text>
            <form onSubmit={() => {}}>
              <Group>
                <TextInput
                  placeholder="Enter your email"
                  key={form.key('email')}
                  {...form.getInputProps('email')}
                  w={350}
                />
                <Button type="submit" h={40} radius='md' w={150}>Subscribe</Button>
              </Group>
            </form>
          </Box>
      </Grid.Col>
    </Grid>
  );
}
