import { Center, Group, Image, Text, Stack, Grid } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import AppStore from "../../assets/AppStore.svg";
import GooglePlay from "../../assets/GooglePlay.svg";
import QRCode from "../../assets/QRCode.svg";
import classes from "./IndividualSignUp.module.css";

export function IndividualSignUp() {
  const navigate = useNavigate();

  return (
    <Stack align="center" gap="xl" mt={40}>
      <Text size="xl" fw={500}>
        Download our mobile app to get started
      </Text>
      <Grid align="center" justify="center" w="100%" px={100}>
        <Grid.Col offset={2} span={3}>
          <Center>
            <Image
              src={QRCode}
              alt="Scan QR Code"
              style={{ width: 180, height: 180 }}
            />
          </Center>
        </Grid.Col>
        <Grid.Col span={7}>
          <Stack gap="md" pl={60}>
            <Image
              src={AppStore}
              alt="Download on App Store"
              onClick={() =>
                window.open("https://testflight.apple.com/join/NCTUpPCH")
              }
              style={{ cursor: "pointer", width: 200 }}
            />
            <Image
              src={GooglePlay}
              alt="Get it on Google Play"
              onClick={() =>
                window.open(
                  "https://play.google.com/store/apps/details?id=com.needful_app"
                )
              }
              style={{ cursor: "pointer", width: 200 }}
            />
          </Stack>
        </Grid.Col>
      </Grid>
      <Text c="dimmed" size="sm" ta="center">
        Our mobile app provides the best experience for individual users.
        <br />
        Please download the app to continue.
      </Text>
    </Stack>
  );
}
