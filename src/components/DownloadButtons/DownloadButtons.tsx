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
        <Image
          src={AppStore}
          onClick={() =>
            window.open(
              "https://apps.apple.com/ca/app/needful-meditate-achieve/id6737121769",
              "_blank"
            )
          }
          h={50}
        />
        <Image src={AppStoreQR} alt="QR Code for App Store" h={50} />
      </Flex>

      {/* Google Play button with QR Code */}
      <Flex align="center" direction="row" gap="xs">
        <Image
          src={GooglePlay}
          onClick={() =>
            window.open(
              "https://play.google.com/store/apps/details?id=com.needful_app",
              "_blank"
            )
          }
          h={50}
          style={{ cursor: "pointer" }}
        />
        <Image src={GooglePlayQR} alt="QR Code for Google Play" h={50} />
      </Flex>
    </Group>
  );
}
