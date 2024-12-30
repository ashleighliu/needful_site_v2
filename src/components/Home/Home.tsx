import {
  Text,
  TextInput,
  UnstyledButton,
  Image,
  rem,
  Flex,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import NeedfulLogo from "../../assets/NeedfulLogo.svg";
import BlackTag from "../../assets/BlackTag.svg";
import BlueTag from "../../assets/BlueTag.svg";
import GreenTag from "../../assets/GreenTag.svg";
import MagentaTag from "../../assets/MagentaTag.svg";
import WhiteTag from "../../assets/WhiteTag.svg";
import YellowTag from "../../assets/YellowTag.svg";
import Logo from "../../assets/Logo.svg";
import classes from "./Home.module.css";
import { useEffect, useState } from "react";
import { NavIcon } from "../NavIcon/NavIcon";
import { Taskbook } from "../Taskbook/Taskbook";
import { TaskCalendar } from "../TaskCalendar/TaskCalendar";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setUserTasks, getUserTasks } from "../../store/slices/taskSlice";
import { getUserInfo } from "../../store/slices/userSlice";
import TaskService from "../../services/taskService";
import { Placeholder } from "rsuite";

const links = [
  { icon: "home", label: "Home" },
  { icon: "calendar", label: "Calendar" },
];

export const tags = [
  { icon: Logo, label: "All" },
  { icon: GreenTag, label: "Ideas" },
  { icon: MagentaTag, label: "Actions" },
  { icon: YellowTag, label: "Thoughts" },
  { icon: BlueTag, label: "Projects" },
  { icon: BlackTag, label: "Questions" },
  { icon: WhiteTag, label: "Untagged" },
];

export type TaskEntry = {
  audioPath?: string | null;
  completed: boolean;
  dueDate?: string | null;
  duration?: string | null;
  hasAudio: boolean;
  id: string;
  label: string;
  task: string;
  transcript?: string | null;
};

export function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState("Home");
  const [activeTag, setActiveTag] = useState("All");
  const [activeIcon, setActiveIcon] = useState(Logo);
  const [tasks, setTasks] = useState<TaskEntry[]>([]);

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

  useEffect(() => {
    console.log(
      "Here is the user's email ====================>",
      userInfo.email
    );
    if (userInfo.email) {
      setCurrentTasks(userInfo.email);
    }
  }, []);

  const mainLinks = links.map((link) => (
    <UnstyledButton
      key={link.label}
      className={classes.mainLink}
      data-active={link.label === active || undefined}
      onClick={() => setActive(link.label)}
    >
      <div className={classes.mainLinkInner}>
        <NavIcon
          image={link.icon}
          fill={link.label === active ? "white" : "black"}
        />
        <Text size={"sm"} ml={5} fw={500}>
          {link.label}
        </Text>
      </div>
    </UnstyledButton>
  ));

  return (
    <Flex style={{ width: "100%" }}>
      <div className={classes.mainWrapper}>
        <div className={classes.section}>
          <Image
            src={NeedfulLogo}
            h={40}
            w="auto"
            m={20}
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
        </div>
        <TextInput
          placeholder="Search"
          // size="md"
          leftSection={
            <IconSearch
              style={{ width: rem(20), height: rem(20) }}
              stroke={1.5}
            />
          }
          h={40}
          fw={500}
          styles={{
            section: { pointerEvents: "none" },
          }}
          mb="sm"
        />
        <div className={classes.section}>
          <div className={classes.mainLinks}>{mainLinks}</div>
        </div>
      </div>
      {active === "Home" && <Taskbook />}
      {active === "Calendar" && <TaskCalendar />}
    </Flex>
  );
}
