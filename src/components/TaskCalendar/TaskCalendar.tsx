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
import { IconCalendar, IconCaretDownFilled } from "@tabler/icons-react";
import { DatePickerInput } from "@mantine/dates";
import "rsuite/Calendar/styles/index.css";

import { useDispatch, useSelector } from "react-redux";
import { setUserTasks, getUserTasks } from "../../store/slices/taskSlice";
import { getUserInfo } from "../../store/slices/userSlice";
import TaskService from "../../services/taskService";

import GreenTag from "../../assets/GreenTag.svg";
import MagentaTag from "../../assets/MagentaTag.svg";
import YellowTag from "../../assets/YellowTag.svg";
import BlueTag from "../../assets/BlueTag.svg";
import BlackTag from "../../assets/BlackTag.svg";
import WhiteTag from "../../assets/WhiteTag.svg";
import Logo from "../../assets/Logo.svg";

function isSameDay(d1: Date, d2: Date) {
  const y1 = d1.getFullYear();
  const y2 = d2.getFullYear();
  const m1 = d1.getMonth();
  const m2 = d2.getMonth();
  const da1 = d1.getDate();
  const da2 = d2.getDate();
  return y1 === y2 && m1 === m2 && da1 === da2;
}

export function TaskCalendar() {
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [correctedDate, setCorrectedDate] = useState<null | Date>(null);
  const [activeTag, setActiveTag] = useState("Untagged");
  const [activeIcon, setActiveIcon] = useState(WhiteTag);
  const [pass, setPass] = useState(false);
  const [taskValue, setTaskValue] = useState("");
  const calendarRef = useRef(null);

  const userInfo = useSelector(getUserInfo);
  const userTasks = useSelector(getUserTasks);

  const today = new Date().toISOString();
  const tomorrow = new Date(
    new Date().setDate(new Date().getDate() + 1)
  ).toISOString();

  const todayTasks = userTasks.filter(
    (userTask: TaskEntry) =>
      userTask.dueDate != null &&
      isSameDay(new Date(today), new Date(userTask.dueDate))
  );

  const tomorrowTasks = userTasks.filter(
    (userTask: TaskEntry) =>
      userTask.dueDate != null &&
      isSameDay(new Date(tomorrow), new Date(userTask.dueDate))
  );

  const getIcons = (label: string | null) => {
    switch (label) {
      case "Ideas":
        return GreenTag;
      case "Actions":
        return MagentaTag;
      case "Thoughts":
        return YellowTag;
      case "Projects":
        return BlueTag;
      case "Questions":
        return BlackTag;
      case "Untagged":
        return WhiteTag;
      case null:
        return WhiteTag;
      default:
        return Logo;
    }
  };

  const setCurrentTasks = async (email: string) => {
    const currentTasks = await TaskService.getCurrentTasks(email);
    console.log(
      "Here is the CurrentTasks =====================> ",
      currentTasks
    );
    if (currentTasks) {
      dispatch(setUserTasks([...currentTasks]));
    } else {
      console.log("Failed to retrieve tasks");
      // dispatch(setIsAudioDownloaded(true));
    }
  };

  const updateTasks = async (updatedTasks: TaskEntry[]) => {
    try {
      const nonEmptyTasks = updatedTasks.filter(
        (t) => t.task && t.task.trim() !== ""
      );

      const currentTasks = await TaskService.updateTasks(
        nonEmptyTasks,
        userInfo.email
      );

      dispatch(setUserTasks(currentTasks));
    } catch (error) {
      console.log("During update the task error occurred:", error);
    }
  };

  const addTask = async (
    id: string,
    taskValue: string,
    selectedData: string | null
  ) => {
    if (taskValue) {
      const newTask = {
        completed: false,
        dueDate: selectedData,
        hasAudio: false,
        id: id,
        label: null,
        task: taskValue,
        audioPath: null,
        transcript: null,
        duration: null,
      };
      const updatedTasks = [...userTasks, newTask];

      const updatedTask = updatedTasks.find((t: TaskEntry) => t.id === id);

      if (updatedTask && updatedTask.task.trim() !== "") {
        await updateTasks(updatedTasks);
        setPass(false);
        setTaskValue("");
      }
    }
  };

  const min = new Date();

  function onDoubleClick() {
    setPass(true);
  }

  function onSelectDate(date: Date) {
    setCurrentDate(date);
  }

  useEffect(() => {
    if (userInfo.email) {
      setCurrentTasks(userInfo.email);
    }
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

  function renderCell(date: Date) {
    const today = userTasks.filter(
      (userTask: TaskEntry) =>
        userTask.dueDate != null && isSameDay(date, new Date(userTask.dueDate))
    );
    const display = today.filter((_: TaskEntry, index: number) => index < 2);

    const moreCount = today.length - display.length;
    const moreItem = (
      <div>
        <Menu trigger="hover">
          <Menu.Target>
            <div style={{ fontSize: "12px" }}>{`+${moreCount} More`}</div>
          </Menu.Target>
          <Menu.Dropdown>
            {today.map((task: TaskEntry) => {
              return (
                <Menu.Item key={task.task} component="div">
                  <Flex>
                    <CustomIcon icon={getIcons(task.label)} />
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
          <Flex
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "end",
              marginBottom: 2,
            }}
          >
            <div>
              {display.map((task: TaskEntry) => (
                <div key={task.task}>
                  <Flex>
                    <CustomIcon icon={getIcons(task.label)} />
                    <span
                      style={{ fontSize: "12px", cursor: "pointer" }}
                      onClick={() => {
                        console.log(task.task);
                      }}
                    >
                      {task.task}
                    </span>
                  </Flex>
                </div>
              ))}
              {moreCount ? moreItem : null}
            </div>
          </Flex>
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
                onChange={(event) => setTaskValue(event.currentTarget.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    addTask(
                      Math.random().toString(36).substr(2, 9),
                      taskValue,
                      currentDate.toISOString()
                    );
                  }
                }}
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
            <div className={classes.upcoming}>
              {todayTasks.length > 0 ? (
                todayTasks.map((task: TaskEntry) => (
                  <div key={task.task} className={classes.taskItem}>
                    <CustomIcon icon={getIcons(task.label)} />
                    <span
                      style={{ fontSize: "12px", cursor: "pointer" }}
                      onClick={() => {
                        console.log(task.task);
                      }}
                    >
                      {task.task}
                    </span>
                  </div>
                ))
              ) : (
                <div className={classes.noTasks}>
                  <Text size="xs" fw={550}>
                    No upcoming tasks...
                  </Text>
                </div>
              )}
            </div>

            <Flex align="center">
              <IconCalendar />
              <Text size="md" fw={600} m={10}>
                Tomorrow
              </Text>
            </Flex>
            <div className={classes.upcoming}>
              {tomorrowTasks.length > 0 ? (
                tomorrowTasks.map((task: TaskEntry) => (
                  <div key={task.task} className={classes.taskItem}>
                    <CustomIcon icon={getIcons(task.label)} />
                    <span
                      style={{ fontSize: "12px", cursor: "pointer" }}
                      onClick={() => {
                        console.log(task.task);
                      }}
                    >
                      {task.task}
                    </span>
                  </div>
                ))
              ) : (
                <div className={classes.noTasks}>
                  <Text size="xs" fw={550}>
                    No upcoming tasks...
                  </Text>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Calendar
        onSelect={onSelectDate}
        ref={calendarRef}
        bordered
        // className={classes.calendar}
        renderCell={renderCell}
        cellClassName={(date) => classes.calendar}
      />
    </>
  );
}
