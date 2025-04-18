import { useEffect, useState } from "react";
import {
  TextInput,
  Title,
  Checkbox,
  Center,
  Flex,
  rem,
  Text,
  UnstyledButton,
  Collapse,
  ActionIcon,
  Box,
  Group,
  Menu,
} from "@mantine/core";
import classes from "./Taskbook.module.css";
import { KeyboardEvent, Dispatch, SetStateAction, useRef } from "react";
import { CustomIcon } from "../CustomIcon/CustomIcon";
import { Task } from "../Task/Task";
import { TaskEntry, tags } from "../Home/Home";
import {
  IconPlus,
  IconDots,
  IconShare,
  IconShare2,
  IconStar,
  IconArchive,
  IconTrash,
  IconBrandAsana,
  IconBrandNotion,
  IconAlignCenter,
} from "@tabler/icons-react";
import { NavIcon } from "../NavIcon/NavIcon";
import LogoWhite from "../../assets/LogoWhite.svg";
import { useDisclosure } from "@mantine/hooks";
import { Button } from "rsuite";
import BlackTag from "../../assets/BlackTag.svg";
import BlueTag from "../../assets/BlueTag.svg";
import GreenTag from "../../assets/GreenTag.svg";
import MagentaTag from "../../assets/MagentaTag.svg";
import WhiteTag from "../../assets/WhiteTag.svg";
import YellowTag from "../../assets/YellowTag.svg";
import Logo from "../../assets/Logo.svg";

import { useDispatch, useSelector } from "react-redux";
import { setUserTasks, getUserTasks } from "../../store/slices/taskSlice";
import { getUserInfo } from "../../store/slices/userSlice";
import TaskService from "../../services/taskService";
import { getCurrentDateFormatted } from "@/utils/dateFormatter";
import { parseISO, startOfDay, isEqual } from "date-fns";

export function Taskbook() {
  const dispatch = useDispatch();
  const newTask = useRef<HTMLInputElement>(null);
  const [activeTag, setActiveTag] = useState("All");
  const { title, showDate } = getTitle();

  const userInfo = useSelector(getUserInfo);
  const userTasks = useSelector(getUserTasks);

  const [filteredTasks, setFilteredTasks] = useState(userTasks);

  const isUntagged = (label: string) => {
    return label === "" || label === null || label === "Untagged";
  };

  const filterTasks = (tasks: TaskEntry[], activeTag: string): TaskEntry[] => {
    let tempTasks: TaskEntry[] = [];

    console.log(tasks);

    if (activeTag === "All") {
      tempTasks = tasks.filter(
        (task: TaskEntry) =>
          task.task.trim() !== "" &&
          (task.dueDate === null ||
            isEqual(
              startOfDay(parseISO(task.dueDate ?? "")),
              startOfDay(new Date())
            ))
      );
    } else if (activeTag === "Untagged") {
      tempTasks = tasks.filter(
        (task: TaskEntry) =>
          isUntagged(task.label) &&
          (task.dueDate === null ||
            isEqual(
              startOfDay(parseISO(task.dueDate ?? "")),
              startOfDay(new Date())
            ))
      );
    } else if (activeTag === "Archived") {
      tempTasks = tasks.filter(
        (task: TaskEntry) =>
          task.dueDate !== null &&
          startOfDay(parseISO(task.dueDate ?? "")).getTime() <
            startOfDay(new Date()).getTime()
      );
    } else {
      tempTasks = tasks.filter(
        (task: TaskEntry) =>
          task.label === activeTag &&
          (task.dueDate === null ||
            isEqual(
              startOfDay(parseISO(task.dueDate ?? "")),
              startOfDay(new Date())
            ))
      );
    }

    return tempTasks;
  };

  useEffect(() => {
    const tempFilteredTasks = filterTasks(userTasks, activeTag);
    setFilteredTasks(tempFilteredTasks);
  }, [activeTag, userTasks]);

  const setCurrentTasks = async (email: string) => {
    const currentTasks: TaskEntry[] | null =
      await TaskService.getCurrentTasks(email);
    if (currentTasks) {
      dispatch(setUserTasks([...currentTasks]));
    } else {
      console.log("Failed to retrieve tasks");
    }
  };

  const updateTasks = async (updatedTasks: TaskEntry[]) => {
    try {
      const nonEmptyTasks: TaskEntry[] = updatedTasks.filter(
        (t: TaskEntry) => t.task && t.task.trim() !== ""
      );

      const currentTasks: TaskEntry[] =
        (await TaskService.updateTasks(nonEmptyTasks, userInfo.email)) ?? [];

      dispatch(setUserTasks(currentTasks));
    } catch (error) {
      console.log("During update the task error occurred:", error);
    }
  };

  const handleDueDateChange = async (id: string, dueDate: string | null) => {
    const updatedTasks: TaskEntry[] = userTasks.map((t: TaskEntry) =>
      t.id === id ? { ...t, dueDate } : t
    );

    const updatedTask: TaskEntry | undefined = updatedTasks.find(
      (t: TaskEntry) => t.id === id
    );

    if (updatedTask && updatedTask.task.trim() !== "") {
      await updateTasks(updatedTasks);
    }
  };

  const handleTaskValueChange = async (id: string, taskValue: string) => {
    const updatedTasks: TaskEntry[] = userTasks.map((t: TaskEntry) =>
      t.id === id ? { ...t, task: taskValue } : t
    );

    const updatedTask: TaskEntry | undefined = updatedTasks.find(
      (t: TaskEntry) => t.id === id
    );

    if (updatedTask && updatedTask.task.trim() !== "") {
      await updateTasks(updatedTasks);
    }
  };

  const handleTaskLabelChange = async (id: string, taskLabel: string) => {
    const updatedTasks: TaskEntry[] = userTasks.map((t: TaskEntry) =>
      t.id === id ? { ...t, label: taskLabel } : t
    );

    const updatedTask: TaskEntry | undefined = updatedTasks.find(
      (t: TaskEntry) => t.id === id
    );

    if (updatedTask && updatedTask.task.trim() !== "") {
      await updateTasks(updatedTasks);
    }
  };

  const handleTaskCompleteChange = async (id: string, completed: boolean) => {
    const updatedTasks: TaskEntry[] = userTasks.map((t: TaskEntry) =>
      t.id === id ? { ...t, completed } : t
    );

    const updatedTask: TaskEntry | undefined = updatedTasks.find(
      (t: TaskEntry) => t.id === id
    );

    if (updatedTask && updatedTask.task.trim() !== "") {
      await updateTasks(updatedTasks);
    }
  };

  const handleTaskDelete = async (id: string) => {
    const updatedTasks: TaskEntry[] = userTasks.filter(
      (t: TaskEntry) => t.id !== id
    );
    await updateTasks(updatedTasks);
  };

  useEffect(() => {
    if (userInfo.email) {
      setCurrentTasks(userInfo.email);
    }
  }, []);

  function focusTask() {
    newTask.current?.focus();
  }

  const mainTags = tags.map((tag) => (
    <UnstyledButton
      key={tag.label}
      className={classes.mainLink}
      data-active={tag.label === activeTag || undefined}
      onClick={() => {
        setActiveTag(tag.label);
      }}
      fz={16}
      fw={500}
    >
      <div className={classes.mainLinkInner}>
        {tag.label === "All" && tag.label === activeTag ? (
          <CustomIcon icon={LogoWhite} />
        ) : (
          <CustomIcon icon={tag.icon} />
        )}
        <span>{tag.label}</span>
      </div>
    </UnstyledButton>
  ));

  function isExceptedTag() {
    return activeTag === "Untagged" || activeTag === "All";
  }

  function getTitle() {
    if (activeTag === "Archived") {
      return { title: "Needfuls to Review", showDate: false };
    }
    return {
      title: `${isExceptedTag() ? activeTag : activeTag.substring(0, activeTag.length - 1)} Needfuls`,
      showDate: true,
    };
  }

  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.section}>
          <div style={{ margin: "10px" }}>
            <UnstyledButton className={classes.addButton} onClick={focusTask}>
              <Center>
                <Flex align="center">
                  <IconPlus
                    style={{
                      width: rem(20),
                      height: rem(20),
                      marginRight: "11px",
                    }}
                    stroke={2.5}
                  />
                  <Text fw={500} fz="sm">
                    New Task
                  </Text>
                </Flex>
              </Center>
            </UnstyledButton>
          </div>
          <Text fz={14} fw={500} c="dimmed" m={10}>
            Tags
          </Text>
          <div className={classes.mainLinks}>{mainTags}</div>
        </div>
        <div className={classes.section}>
          <Text fz={14} fw={500} c="dimmed" m="0 10px 10px 10px">
            More
          </Text>
          <div className={classes.mainLinks}>
            <UnstyledButton
              className={classes.mainLink}
              data-active={"Archived" === activeTag || undefined}
              onClick={() => setActiveTag("Archived")}
              fz={16}
              fw={500}
            >
              <div className={classes.mainLinkInner}>
                <NavIcon
                  image={"archived"}
                  fill={"Archived" === activeTag ? "white" : "black"}
                />
                <span style={{ marginLeft: "5px" }}>Needfuls to Review</span>
              </div>
            </UnstyledButton>
          </div>
        </div>
      </div>
      <div className={classes.taskbook}>
        <Flex justify={"space-between"} align={"center"}>
          <Flex direction="column">
            <Text
              className={classes.title}
              fw={500}
              fz={32}
              style={{ marginBottom: 0 }}
            >
              {title}
            </Text>
            {showDate && (
              <Text
                color="#00A884"
                fz={20}
                style={{ marginTop: 0, marginBottom: 0 }}
              >
                {new Date().toLocaleDateString(undefined, {
                  weekday: "long",
                  // year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            )}
          </Flex>

          <Flex className={classes.title} mr={44} gap={12}>
            {/* Menu buttons */}
          </Flex>
        </Flex>

        <div className={classes.divider} />
        {filteredTasks.map((task: TaskEntry) => (
          <div
            key={task.id}
            className={classes.taskContainer}
            style={{ position: "relative" }}
          >
            <Task
              task={task}
              handleDueDateChange={handleDueDateChange}
              handleTaskValueChange={handleTaskValueChange}
              handleTaskLabelChange={handleTaskLabelChange}
              handleTaskCompleteChange={handleTaskCompleteChange}
              handleTaskDelete={handleTaskDelete}
            />
          </div>
        ))}
        <Checkbox
          disabled
          mt={34}
          label={
            <TextInput
              placeholder="Write a task..."
              styles={{
                input: {
                  border: "none",
                  outline: "none",
                  fontSize: "20px",
                },
              }}
              unstyled
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
