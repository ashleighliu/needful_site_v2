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

export function Taskbook() {
  const dispatch = useDispatch();
  const newTask = useRef<HTMLInputElement>(null);
  const [activeTag, setActiveTag] = useState("All");

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

  const handleDueDateChange = async (id: string, dueDate: string) => {
    const updatedTasks = userTasks.map((t: TaskEntry) =>
      t.id === id ? { ...t, dueDate } : t
    );

    const updatedTask = userTasks.find((t: TaskEntry) => t.id === id);

    if (updatedTask && updatedTask.task.trim() !== "") {
      await updateTasks(updatedTasks);
    }
  };

  const handleTaskValueChange = async (id: string, taskValue: string) => {
    const updatedTasks = userTasks.map((t: TaskEntry) =>
      t.id === id ? { ...t, task: taskValue } : t
    );

    const updatedTask = userTasks.find((t: TaskEntry) => t.id === id);

    if (updatedTask && updatedTask.task.trim() !== "") {
      await updateTasks(updatedTasks);
    }
  };

  const handleTaskLabelChange = async (id: string, taskLabel: string) => {
    const updatedTasks = userTasks.map((t: TaskEntry) =>
      t.id === id ? { ...t, label: taskLabel } : t
    );

    const updatedTask = userTasks.find((t: TaskEntry) => t.id === id);

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
    return (
      activeTag === "Untagged" ||
      activeTag === "All" ||
      activeTag === "Archived"
    );
  }

  // function addTask(event: KeyboardEvent) {
  //   if (event.code !== "Enter") {
  //     return;
  //   }
  //   const input = event.target as HTMLInputElement;
  //   if (input.value === "") {
  //     return;
  //   }
  //   let exists = false;
  //   tasks.forEach((task) => {
  //     if (task.task === input.value && task.label === activeTag) {
  //       exists = true;
  //       return;
  //     }
  //   });
  //   if (exists) {
  //     return;
  //   }
  //   const label = activeTag === "All" ? "Untagged" : activeTag;
  //   const task = input.value;
  //   setTasks([
  //     ...tasks,
  //     {
  //       label,
  //       task,
  //       hasAudio: false,
  //       completed: false,
  //       audioPath: null,
  //       dueDate: null,
  //       duration: null,
  //     },
  //   ]);
  //   input.value = "";
  // }

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
                <span style={{ marginLeft: "5px" }}>Past Needfuls</span>
              </div>
            </UnstyledButton>
          </div>
        </div>
      </div>
      <div className={classes.taskbook}>
        <Flex justify={"space-between"} align={"center"}>
          <Text className={classes.title} fw={500} fz={32}>
            {`${isExceptedTag() ? activeTag : activeTag.substring(0, activeTag.length - 1)} Needfuls`}
          </Text>
          <Flex className={classes.title} mr={44} gap={12}>
            {activeTag === "Archived" ? (
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <ActionIcon size="md" p={3} variant="default" radius="lg">
                    <IconAlignCenter
                      style={{ width: rem(30), height: rem(30) }}
                    />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  {tags.map((tag) => {
                    if (tag.label === "All") return null;
                    return (
                      <Menu.Item
                        leftSection={<CustomIcon icon={tag.icon} />}
                        // onClick={() => handleTagSelect(tag.label)}
                        key={tag.label}
                      >
                        {tag.label}
                      </Menu.Item>
                    );
                  })}
                </Menu.Dropdown>
              </Menu>
            ) : (
              <></>
            )}
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <ActionIcon size="md" p={3} variant="default" radius="lg">
                  <IconShare2 style={{ width: rem(30), height: rem(30) }} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item leftSection={<IconStar size={20} />}>
                  Add to favorites
                </Menu.Item>
                <Menu.Item leftSection={<IconArchive size={20} />}>
                  Archive
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item leftSection={<IconTrash size={20} />} color="red">
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

            <Menu shadow="md" width={200}>
              <Menu.Target>
                <ActionIcon size="md" p={3} variant="default" radius="lg">
                  <IconDots style={{ width: rem(30), height: rem(30) }} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item leftSection={<IconBrandAsana size={20} />}>
                  Import to Asana
                </Menu.Item>
                <Menu.Item leftSection={<IconBrandNotion size={20} />}>
                  Import to Notion
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item leftSection={<IconShare size={20} />}>
                  Share with Team
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        </Flex>
        <div className={classes.divider} />
        {userTasks.map((task: TaskEntry) => {
          if (activeTag === "All") {
            return (
              <Task
                task={task}
                key={task.id}
                handleDueDateChange={handleDueDateChange}
                handleTaskValueChange={handleTaskValueChange}
                handleTaskLabelChange={handleTaskLabelChange}
              />
            );
          }
          if (activeTag === task.label) {
            return (
              <Task
                task={task}
                key={task.id}
                handleDueDateChange={handleDueDateChange}
                handleTaskValueChange={handleTaskValueChange}
                handleTaskLabelChange={handleTaskLabelChange}
              />
            );
          }
          if (activeTag === "Untagged" && !task.label) {
            return (
              <Task
                task={task}
                key={task.id}
                handleDueDateChange={handleDueDateChange}
                handleTaskValueChange={handleTaskValueChange}
                handleTaskLabelChange={handleTaskLabelChange}
              />
            );
          }
          if (
            activeTag === "Archived" &&
            task.dueDate &&
            new Date(task.dueDate) < new Date()
          ) {
            return (
              <Task
                task={task}
                key={task.id}
                handleDueDateChange={handleDueDateChange}
                handleTaskValueChange={handleTaskValueChange}
                handleTaskLabelChange={handleTaskLabelChange}
              />
            );
          }
        })}
      </div>
    </>
  );
}
