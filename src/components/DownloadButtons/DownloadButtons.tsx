import { Flex, Group, Image } from "@mantine/core";
import AppStore from "../../assets/AppStore.svg";
import GooglePlay from "../../assets/GooglePlay.svg";
import BannerQRCode from "../../assets/BannerQRCode.svg";
import AppStoreQR from "../../assets/AppStoreQR.svg";
import GooglePlayQR from "../../assets/GooglePlayQR.svg";

export function DownloadButtons() {
  return (
    <Group mt="md">
      {/* App Store button with QR Code */}
      <Flex align="center" direction="row" gap="xs">
        <Image src={AppStore} onClick={() => {}} h={50} />
        <Image src={AppStoreQR} alt="QR Code for App Store" h={50} />
      </Flex>

      {/* Google Play button with QR Code */}
      <Flex align="center" direction="row" gap="xs">
        <Image src={GooglePlay} onClick={() => {}} h={50} />
        <Image src={GooglePlayQR} alt="QR Code for Google Play" h={50} />
      </Flex>
    </Group>
  );
}
