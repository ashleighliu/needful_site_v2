import { Center, Image } from '@mantine/core';

type CustomIconProps = {
  icon: string;
}

export function CustomIcon(props: CustomIconProps) {
  const { icon } = props;

  return (
    <Center>
      <Image h={16} w={16} mr={8} src={icon}/>
    </Center>
  );
}