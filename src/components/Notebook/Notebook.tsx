import { TextInput, Title, Checkbox, Center, Flex, rem, Text, UnstyledButton } from '@mantine/core';
import classes from './Notebook.module.css';
import { KeyboardEvent, Dispatch, SetStateAction, useRef } from 'react';
import { CustomIcon } from '../CustomIcon/CustomIcon';
import { Note } from '../Note/Note';
import { NoteEntry, tags } from '../Home/Home';
import { IconPlus } from '@tabler/icons-react';
import { NavIcon } from '../NavIcon/NavIcon';
import LogoWhite from '../../assets/LogoWhite.svg';
import WhiteTag from '../../assets/WhiteTag.svg';

type NotebookProps = {
  activeIcon: string;
  activeTag: string;
  notes: NoteEntry[];
  setActiveIcon: Dispatch<SetStateAction<string>>;
  setActiveTag: Dispatch<SetStateAction<string>>;
  setNotes: Dispatch<SetStateAction<NoteEntry[]>>;
};

export function Notebook(props: NotebookProps) {
  const { activeIcon, activeTag, notes, setActiveIcon, setActiveTag, setNotes } = props;

  const newTask = useRef<HTMLInputElement>(null);

  function focusTask() {
    newTask.current?.focus();
  }

  const mainTags = tags.map((tag) => (
    <UnstyledButton
      key={tag.label}
      className={classes.mainLink}
      data-active={tag.label === activeTag || undefined}
      onClick={
        () => {
          setActiveTag(tag.label);
          setActiveIcon(tag.icon);
        }
      }
    >
      <div className={classes.mainLinkInner}>
        {tag.label === "All" && tag.label === activeTag ? <CustomIcon icon={LogoWhite}/> : <CustomIcon icon={tag.icon}/>}
        <span>{tag.label}</span>
      </div>
    </UnstyledButton>
  ));

  function isExceptedTag() {
    return activeTag === "Untagged" || activeTag === "All" || activeTag === "Archived"
  }

  function addNote(event: KeyboardEvent) {
    if (event.code !== "Enter") {
      return;
    }
    const input = event.target as HTMLInputElement;
    if (input.value === "") {
      return;
    }
    let exists = false;
    notes.forEach((note) => {
      if (note.text === input.value && note.tag === activeTag) {
        exists = true;
        return;
      }
    });
    if (exists) {
      return;
    }
    const icon = activeTag === "All" ? WhiteTag : activeIcon;
    const tag = activeTag === "All" ? "Untagged" : activeTag;
    const text = input.value;
    setNotes([...notes, { icon, tag, text, deadline: null }]);
    input.value = "";
  }

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.section}>
          <div style={{ margin: "10px" }}>
            <UnstyledButton className={classes.addButton} onClick={focusTask}>
              <Center>
                <Flex align="center">
                  <IconPlus style={{ width: rem(12), height: rem(12), marginRight: "5px" }} stroke={2.5} />
                  <Text fw={550} fz="xs">New Task</Text>
                </Flex>
              </Center>
            </UnstyledButton>
          </div>
          <Text size="xs" fw={700} c="dimmed" m={10}>
            Tags
          </Text>
          <div className={classes.mainLinks}>{mainTags}</div>
        </div>
        <div className={classes.section}>
          <div className={classes.mainLinks}>
            <Text size="xs" fw={700} c="dimmed" m={10}>
              More
            </Text>
            <UnstyledButton
              className={classes.mainLink}
              data-active={"Archived" === activeTag || undefined}
              onClick={() => setActiveTag("Archived")}
            >
            <div className={classes.mainLinkInner}>
              <NavIcon image={"archived"} fill={"Archived" === activeTag ? "white" : "black"}/>
              <span style={{ marginLeft: "5px" }}>{"Archived"}</span>
            </div>
          </UnstyledButton>
          </div>
        </div>
      </div>
      <div className={classes.notebook}>
        <Title className={classes.title} order={2}>
          {`${isExceptedTag() ? activeTag : activeTag.substring(0, activeTag.length - 1)} Needfuls`}
        </Title>
        <div className={classes.divider} />
        <div className={classes.tagIndicator}>
          <CustomIcon icon={activeIcon}/>
          <span>{activeTag}</span>
        </div>
        {notes.map((note) => {
          if (activeTag === "All") {
            return (
              <Note
                icon={note.icon}
                text={note.text}
                notes={notes}
                setNotes={setNotes}
                key={note.text}
                deadline={note.deadline}
              />
            );
          }
          if (activeTag === note.tag) {
            return (
              <Note
                icon={note.icon}
                text={note.text}
                notes={notes}
                setNotes={setNotes}
                key={note.text}
                deadline={note.deadline}
              />
            );
          }
        })}
        <Checkbox
          disabled
          mt={25}
          label={
            <TextInput
              placeholder="Write a task..."
              styles={{
                input: {
                  border: "none",
                  outline: "none",
                },
              }}
              unstyled
              onKeyDown={addNote}
              ref={newTask}
            />
          }
          styles={{
            root: {
              width: "1000px",
            },
          }}
        />
      </div>
    </>
  );
}