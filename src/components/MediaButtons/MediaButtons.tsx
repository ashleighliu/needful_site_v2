import { Group, Image } from '@mantine/core';
import Facebook from '../../assets/Facebook.svg';
import LinkedIn from '../../assets/LinkedIn.svg';
import X from '../../assets/X.svg';

export function MediaButtons() {
  return (
    <Group mt="md">
      <Image src={LinkedIn} onClick={() => {}}/>
      <Image src={X} onClick={() => {}} />
      <Image src={Facebook} onClick={() => {}} />
    </Group>
  );
}
