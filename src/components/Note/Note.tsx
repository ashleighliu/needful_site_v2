import { Center, Checkbox, Collapse, Flex, Image, Menu, rem, UnstyledButton } from '@mantine/core';
import { CustomIcon } from '../CustomIcon/CustomIcon';
import { IconCaretDownFilled, IconCaretUpFilled, IconCalendar } from '@tabler/icons-react';
import Wavelength from '../../assets/Wavelength.svg';
import VoiceMemo from '../../assets/VoiceMemo.png';
import { useDisclosure } from '@mantine/hooks';
import { DatePickerInput, DateValue } from '@mantine/dates';
import { NoteEntry, tags } from '../Home/Home';

type NoteProps = {
  icon: string;
  text: string;
  notes: NoteEntry[];
  deadline: Date | null;
  setNotes: React.Dispatch<React.SetStateAction<NoteEntry[]>>;
}

export function Note(props: NoteProps) {
  const { icon, text, notes, setNotes, deadline } = props;

  const [opened, { toggle }] = useDisclosure(false);

  const today = new Date();

  function selectTag(selectedIcon: string, label: string) {
    const i = notes.findIndex((note) => {
      return note.icon === icon && note.text === text;
    });
    const former = notes.slice(0, i);
    const latter = notes.slice(i + 1);
    const edited = { icon: selectedIcon, tag: label, text, deadline };
    setNotes([...former, edited, ...latter ]);
  }

  function setDeadline(date: DateValue) {
    const i = notes.findIndex((note) => {
      return note.icon === icon && note.text === text;
    });
    const former = notes.slice(0, i);
    const latter = notes.slice(i + 1);
    const edited = { icon, tag: notes[i].tag, text, deadline: date };
    setNotes([...former, edited, ...latter ]);
  }

  return (
    <>
      <Flex mt={25} gap="xs" align="center">
        <Checkbox label={text} />
        <UnstyledButton onClick={toggle}>
          <Flex>
            <Image src={Wavelength}/>
            <Center>
              {opened ?
                <IconCaretUpFilled style={{ width: rem(12), height: rem(12) }} /> :
                <IconCaretDownFilled style={{ width: rem(12), height: rem(12) }} />}
            </Center>
          </Flex>
        </UnstyledButton>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <UnstyledButton>
              <CustomIcon icon={icon}/>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            {tags.map((tag) => {
              if (tag.label === "All") {
                return null;
              }
              return <Menu.Item leftSection={<CustomIcon icon={tag.icon}/>} onClick={() => selectTag(tag.icon, tag.label)} key={tag.label}>
                {tag.label}
              </Menu.Item>
            })}
          </Menu.Dropdown>
        </Menu>
        <DatePickerInput
          leftSection={<IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
          rightSection={<IconCaretDownFilled style={{ width: rem(12), height: rem(12) }} />}
          placeholder="Due Date"
          value={deadline}
          size="xs"
          onChange={setDeadline}
          styles={{
            input: {
              border: "none",
              outline: "none",
            },
          }}
          minDate={today}
        />
      </Flex>
      <Collapse in={opened}>
        <Image h={100} src={VoiceMemo} w="auto"/>
      </Collapse>
    </>
  );
}