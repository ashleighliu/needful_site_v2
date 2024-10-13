import { Group, Image } from "@mantine/core";
import Facebook from "../../assets/Facebook.svg";
import LinkedIn from "../../assets/LinkedIn.svg";
import X from "../../assets/X.svg";
import Instagram from "../../assets/Instagram.svg";
import Youtube from "../../assets/Youtube.svg";

export function MediaButtons() {
  return (
    <Group mt="md">
      <Image
        src={LinkedIn}
        onClick={() =>
          window.open("https://www.linkedin.com/company/needfulapp", "_blank")
        }
      />

      <Image
        src={X}
        onClick={() => window.open("https://twitter.com/needfulapp", "_blank")}
      />
      <Image
        src={Facebook}
        onClick={() =>
          window.open("https://www.facebook.com/needfulapp", "_blank")
        }
      />
      <Image
        src={Instagram}
        onClick={() => window.open("https://www.instagram.com/needful.app/")}
      />
      <Image
        src={Youtube}
        onClick={() => window.open("https://youtube.com/needfulapp/", "_blank")}
      />
    </Group>
  );
}
