import { Flex, Image, Text } from '@mantine/core';
import Check from '../../assets/Check.svg';
import Checkmark from '../../assets/Checkmark.svg';

type BulletProps = {
  text: string;
  alternate?: boolean;
};

export function Bullet(props: BulletProps) {
  const { text, alternate } = props;

  return (
    <Flex align="flex-start">
      <Image src={alternate ? Checkmark : Check} h={alternate ? 20 : 25} w="auto" mt={3} mr={10}/>
      <Text c={alternate ? "#FFFFFF" : "#555555"} fz={alternate ? "sm" : "md"}>
        {text}
      </Text>
    </Flex>
  );
}