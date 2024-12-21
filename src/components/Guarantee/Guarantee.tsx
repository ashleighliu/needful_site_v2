import { Flex, Image, Text } from '@mantine/core';

type GuaranteeProps = {
  image: string;
  guarantee: string;
  caption: string;
};

export function Guarantee(props: GuaranteeProps) {
  const { image, guarantee, caption } = props;

  return (
    <Flex>
      <Image src={image} h={24} w="auto" mr={10}/>
      <Flex direction="column">
        <Text c='#555555'>
          {guarantee}
        </Text>
        <Text c='#555555'>
          {caption}
        </Text>
      </Flex>
    </Flex>
  );
}