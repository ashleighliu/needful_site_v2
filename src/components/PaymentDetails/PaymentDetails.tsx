import { useState } from 'react';
import {
  Group,
  Text,
  TextInput,
  Radio,
  Button,
  Center,
  Grid,
  NumberInput,
  Box,
  Image,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { MonthPickerInput } from '@mantine/dates';
import '@mantine/dates/styles.css';
import classes from './PaymentDetails.module.css';
import CreditCards from '../../assets/CreditCards.png';

export function PaymentDetails() {
  const [plan, setPlan] = useState<string>('--');
  const navigate = useNavigate();

  return (
    <form onSubmit={() => {}}>
      <Center>
        <Box w={540}>
          <Text>Enter your payment details</Text>
        </Box>
      </Center>
      <Radio.Group value={plan} onChange={setPlan} mt={5}>
        <Center>
          <Radio.Card className={classes.root} radius="sm" value="$149" w={540}>
            <Grid align="center">
              <Grid.Col span={6}>
                <Group>
                  <Radio.Indicator />
                  <Text className={classes.label}>60 day trial, pay monthly</Text>
                </Group>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text fz="xs" ta="right">
                  $149 monthly
                </Text>
                <Text c="dimmed" fz="xs" ta="right">
                  $149 billed monthly
                </Text>
              </Grid.Col>
            </Grid>
          </Radio.Card>
        </Center>
        <Center mt={10}>
          <Radio.Card className={classes.root} radius="sm" value="$109" w={540}>
            <Grid align="center">
              <Grid.Col span={6}>
                <Group>
                  <Radio.Indicator />
                  <Text className={classes.label}>60 day trial, pay annually</Text>
                </Group>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text fz="xs" ta="right">
                  $109 monthly
                </Text>
                <Text c="dimmed" fz="xs" ta="right">
                  $1308 billed annually
                </Text>
              </Grid.Col>
            </Grid>
          </Radio.Card>
        </Center>
      </Radio.Group>
      <Box mt={5}>
        <Text c="#555555" size="xs">
          Card Number
        </Text>
        <NumberInput
          placeholder="1234 1234 1234 1234"
          styles={{
            input: {
              height: '50px',
            },
            section: {
              width: '100px',
            },
          }}
          hideControls
          allowNegative={false}
          allowDecimal={false}
          mt={0}
          rightSection={<Image src={CreditCards} alt="Credit Cards" />}
        />
      </Box>
      <Grid align="flex-end" mt={5}>
        <Grid.Col span={6}>
          <Box>
            <Text c="#555555" mb={5} size="xs">
              Expiry
            </Text>
            <MonthPickerInput
              valueFormat="MM/YY"
              placeholder="MM/YY"
              styles={{
                input: {
                  height: '50px',
                },
              }}
            />
          </Box>
        </Grid.Col>
        <Grid.Col span={6}>
          <Box>
            <Text c="#555555" mb={5} size="xs">
              Security Code
            </Text>
            <NumberInput
              placeholder="CVC"
              styles={{
                input: {
                  height: '50px',
                },
              }}
              hideControls
              allowNegative={false}
              allowDecimal={false}
            />
          </Box>
        </Grid.Col>
      </Grid>
      <Grid align="flex-end">
        <Grid.Col>
          <Box>
            <Text c="#555555" mb={5} size="xs">
              ZIP/Postal Code
            </Text>
            <TextInput
              placeholder="ZIP/Postal Code"
              styles={{
                input: {
                  height: '50px',
                },
              }}
            />
          </Box>
        </Grid.Col>
      </Grid>
      <Grid align="center" m={15}>
        <Grid.Col span={6}>
          <Text fz="sm">Subtotal</Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text fz="sm" ta="right">
            {plan}
          </Text>
        </Grid.Col>
      </Grid>
      <Center>
        <Text className={classes.divider} />
      </Center>
      <Grid align="center" m={15}>
        <Grid.Col span={6}>
          <Text fz="sm">Total</Text>
          <Text fz="sm" c="dimmed">
            Including $0.00 in taxes
          </Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text fz="lg" ta="right">
            {plan}
          </Text>
        </Grid.Col>
      </Grid>
      <Center>
        <Button mt={20} radius="sm" fullWidth onClick={() => navigate('/welcome')}>
          FINISH
        </Button>
      </Center>
    </form>
  );
}
