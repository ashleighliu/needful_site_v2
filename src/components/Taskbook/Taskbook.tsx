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

export function Taskbook() {
  const dispatch = useDispatch();
  const newTask = useRef<HTMLInputElement>(null);
  const [activeTag, setActiveTag] = useState("All");
  const { title, showDate } = getTitle();

  const userInfo = useSelector(getUserInfo);
  const userTasks = useSelector(getUserTasks);

  const setCurrentTasks = async (email: string) => {
    const currentTasks = await TaskService.getCurrentTasks(email);
    console.log(
      "Here is the CurrentTasks =====================> ",
      currentTasks
    );
    if (currentTasks) {
      // dispatch(setIsAudioDownloaded(false));

      // currentTasks.map(async (item: Task) => {
      //   if (item.hasAudio) {
      //     await TaskService.downloadAudio(item.audioPath);
      //   }
      // });

      // dispatch(setIsAudioDownloaded(true));

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

  const handleDeleteTask = async (id: string) => {
    try {
      const updatedTasks = userTasks.filter(
        (task: TaskEntry) => task.id !== id
      ); // Specify type for task
      await updateTasks(updatedTasks);
    } catch (error) {
      console.log("Error deleting task:", error);
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
    console.log("========================>", completed);
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
        {userTasks.map((task: TaskEntry) => {
          if (
            activeTag === "All" ||
            activeTag === task.label ||
            (activeTag === "Untagged" && !task.label) ||
            (activeTag === "Archived" &&
              task.dueDate &&
              new Date(task.dueDate) < new Date(getCurrentDateFormatted()))
          ) {
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
          }
        })}
      </div>
    </>
  );
}
