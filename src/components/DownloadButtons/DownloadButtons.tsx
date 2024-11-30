import { Group, Image } from '@mantine/core';
import AppStore from '../../assets/AppStore.svg';
import GooglePlay from '../../assets/GooglePlay.png';

export function DownloadButtons() {

  return (
    <Group mt="md">
      <Image src={AppStore} onClick={() => {}} h={50}/>
      <Image src={GooglePlay} onClick={() => {}} h={50} />
    </Group>
  );
}
