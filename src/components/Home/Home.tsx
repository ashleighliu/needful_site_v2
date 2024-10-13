import {
  TextInput,
  UnstyledButton,
  Image,
  rem,
  Flex,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import NeedfulLogo from '../../assets/NeedfulLogo.svg';
import BlackTag from '../../assets/BlackTag.svg';
import BlueTag from '../../assets/BlueTag.svg';
import GreenTag from '../../assets/GreenTag.svg';
import MagentaTag from '../../assets/MagentaTag.svg';
import WhiteTag from '../../assets/WhiteTag.svg';
import YellowTag from '../../assets/YellowTag.svg';
import Logo from '../../assets/Logo.svg';
import classes from './Home.module.css';
import { useState } from 'react';
import { NavIcon } from '../NavIcon/NavIcon';
import { Notebook } from '../Notebook/Notebook';
import { TaskCalendar } from '../TaskCalendar/TaskCalendar';

const links = [
  { icon: "home", label: 'Home' },
  { icon: "calendar", label: 'Calendar' },
];

export const tags = [
  { icon: Logo, label: 'All' },
  { icon: GreenTag, label: 'Actions' },
  { icon: MagentaTag, label: 'Projects' },
  { icon: YellowTag, label: 'Ideas' },
  { icon: BlueTag, label: 'Thoughts' },
  { icon: BlackTag, label: 'Questions' },
  { icon: WhiteTag, label: 'Untagged' },
];

export type NoteEntry = {
  icon: string;
  tag: string;
  text: string;
  deadline: Date | null;
}

export function Home() {
  const [active, setActive] = useState('Home');
  const [activeTag, setActiveTag] = useState('All');
  const [activeIcon, setActiveIcon] = useState(Logo);
  const [notes, setNotes] = useState<NoteEntry[]>([]);

  const mainLinks = links.map((link) => (
    <UnstyledButton
      key={link.label}
      className={classes.mainLink}
      data-active={link.label === active || undefined}
      onClick={() => setActive(link.label)}
    >
      <div className={classes.mainLinkInner}>
        <NavIcon image={link.icon} fill={link.label === active ? "white" : "black"}/>
        <span style={{ marginLeft: "5px" }}>{link.label}</span>
      </div>
    </UnstyledButton>
  ));

  return (
    <Flex>
      <div className={classes.mainWrapper}>
        <div className={classes.section}>
          <Image src={NeedfulLogo} h={40} w="auto" m={20}/>
        </div>
        <TextInput
          placeholder="Search"
          size="xs"
          leftSection={<IconSearch style={{ width: rem(12), height: rem(12) }} stroke={1.5} />}
          styles={{ section: { pointerEvents: 'none' } }}
          mb="sm"
        />
        <div className={classes.section}>
          <div className={classes.mainLinks}>{mainLinks}</div>
        </div>
      </div>
      {active === "Home" &&
        <Notebook
          activeIcon={activeIcon}
          activeTag={activeTag}
          notes={notes}
          setActiveIcon={setActiveIcon}
          setActiveTag={setActiveTag}
          setNotes={setNotes}
        />
      }
      {active === "Calendar" &&
        <TaskCalendar notes={notes} setNotes={setNotes} />
      }
    </Flex>
  );
}