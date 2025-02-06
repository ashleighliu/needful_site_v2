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

  const filterTasks = (tasks, activeTag: string) => {
    let tempTasks;
    if (
      activeTag !== "Archived" &&
      activeTag !== "Untagged" &&
      activeTag !== "All"
    ) {
      tempTasks = tasks.filter(
        (task) =>
          (task.label === activeTag &&
            isEqual(
              startOfDay(parseISO(task.dueDate)),
              startOfDay(new Date())
            )) ||
          task.task === ""
      );
    }
    if (activeTag === "All") {
      tempTasks = tasks.filter(
        (task) =>
          isEqual(startOfDay(parseISO(task.dueDate)), startOfDay(new Date())) ||
          task.task === ""
      );
    }
    if (activeTag === "Untagged") {
      tempTasks = tasks.filter(
        (task) =>
          (task.label === null &&
            isEqual(
              startOfDay(parseISO(task.dueDate)),
              startOfDay(new Date())
            )) ||
          task.task === ""
      );
    }
    if (activeTag === "Archived") {
      tempTasks = tasks.filter(
        (task) =>
          startOfDay(parseISO(task.dueDate)).getTime() <
            startOfDay(new Date()).getTime() ||
          task.task === "" ||
          task.dueDate === null
      );
    }
    return tempTasks;
  };

  useEffect(() => {
    const tempFilteredTasks = filterTasks(userTasks, activeTag);
    setFilteredTasks(tempFilteredTasks);
  }, [activeTag, userTasks]);

  const setCurrentTasks = async (email: string) => {
    const currentTasks = await TaskService.getCurrentTasks(email);
    if (currentTasks) {
      dispatch(setUserTasks([...currentTasks]));
    } else {
      console.log("Failed to retrieve tasks");
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

  const handleDueDateChange = async (id: string, dueDate: string | null) => {
    const updatedTasks = userTasks.map((t: TaskEntry) =>
      t.id === id ? { ...t, dueDate } : t
    );

    const updatedTask = updatedTasks.find((t: TaskEntry) => t.id === id);

    if (updatedTask && updatedTask.task.trim() !== "") {
      await updateTasks(updatedTasks);
    }
  };

  const handleTaskValueChange = async (id: string, taskValue: string) => {
    const updatedTasks = userTasks.map((t: TaskEntry) =>
      t.id === id ? { ...t, task: taskValue } : t
    );

    const updatedTask = updatedTasks.find((t: TaskEntry) => t.id === id);

    if (updatedTask && updatedTask.task.trim() !== "") {
      await updateTasks(updatedTasks);
    }
  };

  const handleTaskLabelChange = async (id: string, taskLabel: string) => {
    const updatedTasks = userTasks.map((t: TaskEntry) =>
      t.id === id ? { ...t, label: taskLabel } : t
    );

    const updatedTask = updatedTasks.find((t: TaskEntry) => t.id === id);

    if (updatedTask && updatedTask.task.trim() !== "") {
      await updateTasks(updatedTasks);
    }
  };

  const handleTaskCompleteChange = async (id: string, completed: boolean) => {
    const updatedTasks = userTasks.map((t: TaskEntry) =>
      t.id === id ? { ...t, completed } : t
    );

    const updatedTask = updatedTasks.find((t: TaskEntry) => t.id === id);

    if (updatedTask && updatedTask.task.trim() !== "") {
      await updateTasks(updatedTasks);
    }
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
        {filteredTasks.map((task: TaskEntry) => {
          return (
            <div
              key={task.id}
              className={classes.taskContainer}
              style={{
                position: "relative",
              }}
            >
              <Task
                task={task}
                handleDueDateChange={handleDueDateChange}
                handleTaskValueChange={handleTaskValueChange}
                handleTaskLabelChange={handleTaskLabelChange}
                handleTaskCompleteChange={handleTaskCompleteChange}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
