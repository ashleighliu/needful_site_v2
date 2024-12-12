import {
  TextInput,
  Flex,
  Text,
  UnstyledButton,
  Menu,
  rem,
} from "@mantine/core";
import classes from "./TaskCalendar.module.css";
import {
  useRef,
  useEffect,
  useState,
  SetStateAction,
  Dispatch,
  KeyboardEvent,
} from "react";
import { CustomIcon } from "../CustomIcon/CustomIcon";
import { TaskEntry, tags } from "../Home/Home";
import { Calendar } from "rsuite";
import WhiteTag from "../../assets/WhiteTag.svg";
import { IconCalendar, IconCaretDownFilled } from "@tabler/icons-react";
import { DatePickerInput } from "@mantine/dates";
import "rsuite/Calendar/styles/index.css";

function isSameDay(d1: Date, d2: Date) {
  const y1 = d1.getFullYear();
  const y2 = d2.getFullYear();
  const m1 = d1.getMonth();
  const m2 = d2.getMonth();
  const da1 = d1.getDate();
  const da2 = d2.getDate();
  return y1 === y2 && m1 === m2 && da1 === da2;
}

type TaskCalendarProps = {
  tasks: TaskEntry[];
  setTasks: Dispatch<SetStateAction<TaskEntry[]>>;
};

export function TaskCalendar(props: TaskCalendarProps) {
  const { tasks, setTasks } = props;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [correctedDate, setCorrectedDate] = useState<null | Date>(null);
  const [activeTag, setActiveTag] = useState("Untagged");
  const [activeIcon, setActiveIcon] = useState(WhiteTag);
  const [pass, setPass] = useState(false);
  const calendarRef = useRef(null);

  const min = new Date();

  function onDoubleClick() {
    setPass(true);
  }

  function onSelectDate(date: Date) {
    setCurrentDate(date);
  }

  useEffect(() => {
    if (calendarRef && calendarRef.current) {
      (calendarRef.current as HTMLElement).addEventListener(
        "dblclick",
        onDoubleClick
      );
    }
  }, []);

  function selectTag(icon: string, label: string) {
    setActiveIcon(icon);
    setActiveTag(label);
  }

  function addTask(event: KeyboardEvent) {
    // if (event.code !== "Enter") {
    //   return;
    // }
    // const input = event.target as HTMLInputElement;
    // if (input.value === "") {
    //   return;
    // }
    // let exists = false;
    // tasks.forEach((task) => {
    //   if (task.task === input.value && task.label === activeTag) {
    //     exists = true;
    //     return;
    //   }
    // });
    // if (exists) {
    //   return;
    // }
    // const icon = activeTag === "All" ? WhiteTag : activeIcon;
    // const label = activeTag === "All" ? "Untagged" : activeTag;
    // const task = input.value;
    // setTasks([
    //   {
    //     label,
    //     task,
    //     dueDate: correctedDate?.toISOString() ?? currentDate.toISOString(),
    //   },
    //   ...tasks,
    // ]);
    // input.value = "";
    // setCorrectedDate(null);
    // setPass(false);
  }

  function renderCell(date: Date) {
    const today = tasks.filter(
      (task) => task.dueDate != null && isSameDay(date, new Date(task.dueDate))
    );
    const display = today.filter((_, index) => index < 2);

    const moreCount = today.length - display.length;
    const moreItem = (
      <div>
        <Menu trigger="hover">
          <Menu.Target>
            <div style={{ fontSize: "12px" }}>{`+${moreCount} More`}</div>
          </Menu.Target>
          <Menu.Dropdown>
            {today.map((task) => {
              return (
                <Menu.Item key={task.task} component="div">
                  <Flex>
                    <CustomIcon icon={task.task} />
                    <span style={{ fontSize: "12px" }}>{task.task}</span>
                  </Flex>
                </Menu.Item>
              );
            })}
          </Menu.Dropdown>
        </Menu>
      </div>
    );

    return (
      <Menu
        opened={pass && isSameDay(date, currentDate)}
        styles={{
          item: {
            backgroundColor: "white",
          },
        }}
      >
        <Menu.Target>
          <div>
            {display.map((task) => (
              <div key={task.task}>
                <Flex>
                  <CustomIcon icon={task.task} />
                  <span style={{ fontSize: "12px" }}>{task.task}</span>
                </Flex>
              </div>
            ))}
            {moreCount ? moreItem : null}
          </div>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>
            <Flex>
              <TextInput
                placeholder="Write a task..."
                styles={{
                  input: {
                    border: "none",
                    outline: "none",
                  },
                }}
                unstyled
                onKeyDown={addTask}
              />
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <UnstyledButton>
                    <CustomIcon icon={activeIcon} />
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  {tags.map((tag) => {
                    if (tag.label === "All") {
                      return null;
                    }
                    return (
                      <Menu.Item
                        leftSection={<CustomIcon icon={tag.icon} />}
                        onClick={() => selectTag(tag.icon, tag.label)}
                        key={tag.label}
                      >
                        {tag.label}
                      </Menu.Item>
                    );
                  })}
                </Menu.Dropdown>
              </Menu>
            </Flex>
            <DatePickerInput
              leftSection={
                <IconCalendar
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              }
              rightSection={
                <IconCaretDownFilled
                  style={{ width: rem(12), height: rem(12) }}
                />
              }
              placeholder="Due Date"
              size="xs"
              onChange={(date) => setCorrectedDate(date)}
              styles={{
                input: {
                  border: "none",
                  outline: "none",
                },
              }}
              defaultValue={currentDate}
              minDate={min}
            />
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
  }

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.section}>
          <div style={{ margin: "10px", width: "250px" }}>
            <Calendar compact />
          </div>
          <div className={classes.mainLinks}>
            <Flex align="center">
              <IconCalendar />
              <Text size="md" fw={600} m={10}>
                Today
              </Text>
            </Flex>
            <div>
              <Text className={classes.upcoming} size="xs" fw={550}>
                No upcoming tasks...
              </Text>
            </div>
            <Flex align="center">
              <IconCalendar />
              <Text size="md" fw={600} m={10}>
                Tomorrow
              </Text>
            </Flex>
            <div>
              <Text className={classes.upcoming} size="xs" fw={550}>
                No upcoming tasks...
              </Text>
            </div>
          </div>
        </div>
      </div>
      <Calendar
        onSelect={onSelectDate}
        ref={calendarRef}
        renderCell={renderCell}
      />
    </>
  );
}
