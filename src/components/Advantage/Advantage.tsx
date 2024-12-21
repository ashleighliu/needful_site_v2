import {
  Box,
  Center,
  Flex,
  Grid,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";

type AdvantageProps = {
  image: string;
  title: string;
  description: string;
};

export function Advantage(props: AdvantageProps) {
  const { image, title, description } = props;

  return (
    <Box>
      <Flex align="center" gap="lg">
        <Box>
          <Image src={image} h="auto" w={100} />
        </Box>
        <Box>
          <Center>
            <Box>
              <Title order={3} style={{ color: "#404040" }}>
                {title}
              </Title>
              <Text c="#555555" size="sm">
                {description}
              </Text>
            </Box>
          </Center>
        </Box>
      </Flex>
    </Box>
  );
}
