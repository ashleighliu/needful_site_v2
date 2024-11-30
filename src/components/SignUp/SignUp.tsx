import { useState } from 'react';
import { Box, Center, Grid, Group, Image, Radio, Stepper, Text } from '@mantine/core';
import NeedfulLogo from '../../assets/NeedfulLogo.svg';
import classes from './SignUp.module.css';
import { TeamsSignUp } from '../TeamsSignUp/TeamsSignUp';
import { IndividualSignUp } from '../IndividualSignUp/IndividualSignUp';
import { SignUpMessage } from '../SignUpMessage/SignUpMessage';
import { useNavigate } from 'react-router-dom';
import { EmailConfirmation } from '../EmailConfirmation/EmailConfirmation';
import { SetPassword } from '../SetPassword/SetPassword';
import { PaymentDetails } from '../PaymentDetails/PaymentDetails';

export function SignUp() {
  const [active, setActive] = useState(0);
  const [type, setType] = useState<string | null>(null);
  const navigate = useNavigate();
  const next = () => setActive((current) => (current < 4 ? current + 1 : current));

  return (
    <Grid>
      <Grid.Col span={8}>
        <Image h={50} m="lg" w="auto" src={NeedfulLogo} onClick={() => navigate('/')} />
        <Stepper active={active} onStepClick={setActive} size="sm" m={20}>
          <Stepper.Step description="Personal Information">
            <Box>
              <Radio.Group value={type} onChange={setType}>
                <Center>
                  <Grid align="flex-end">
                    <Grid.Col span={6}>
                      <Text c="#555555" mb={10} size="sm">
                        Sign up to Needful
                      </Text>
                      <Radio.Card className={classes.root} radius="sm" value="team">
                        <Group wrap="nowrap" align="flex-start">
                          <Radio.Indicator />
                          <Center>
                            <Text className={classes.label}>Team</Text>
                          </Center>
                        </Group>
                      </Radio.Card>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Radio.Card className={classes.root} radius="sm" value="individual">
                        <Group wrap="nowrap" align="flex-start">
                          <Radio.Indicator />
                          <Center>
                            <Text className={classes.label}>Individual</Text>
                          </Center>
                        </Group>
                      </Radio.Card>
                    </Grid.Col>
                  </Grid>
                </Center>
              </Radio.Group>
              <Center>
                {type === 'team' && <TeamsSignUp next={next} />}
                {type === 'individual' && <IndividualSignUp next={next} />}
              </Center>
            </Box>
          </Stepper.Step>
          <Stepper.Step description="Email Confirmation">
            <Center>
              <EmailConfirmation next={next} />
            </Center>
          </Stepper.Step>
          <Stepper.Step description="Set Password">
            <Center>
              <SetPassword next={next} />
            </Center>
          </Stepper.Step>
          <Stepper.Step description="Payment Details">
            <Center>
              <PaymentDetails next={next} />
            </Center>
          </Stepper.Step>
        </Stepper>
      </Grid.Col>
      <Grid.Col span={4} style={{ backgroundColor: '#00A884' }}>
        <SignUpMessage type={type} />
      </Grid.Col>
    </Grid>
  );
}
