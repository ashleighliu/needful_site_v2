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
import { Notebook } from "../Notebook/Notebook";
import { TaskCalendar } from "../TaskCalendar/TaskCalendar";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setUserTasks } from "../../store/slices/taskSlice";
import { getUserInfo } from "../../store/slices/userSlice";
import TaskService from "../../services/taskService";
import { Placeholder } from "rsuite";

const links = [
  { icon: "home", label: "Home" },
  { icon: "calendar", label: "Calendar" },
];

export const tags = [
  { icon: Logo, label: "All" },
  { icon: GreenTag, label: "Actions" },
  { icon: MagentaTag, label: "Projects" },
  { icon: YellowTag, label: "Ideas" },
  { icon: BlueTag, label: "Thoughts" },
  { icon: BlackTag, label: "Questions" },
  { icon: WhiteTag, label: "Untagged" },
];

export type NoteEntry = {
  icon: string;
  tag: string;
  text: string;
  deadline: Date | null;
};

export function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState("Home");
  const [activeTag, setActiveTag] = useState("All");
  const [activeIcon, setActiveIcon] = useState(Logo);
  const [notes, setNotes] = useState<NoteEntry[]>([]);

  const userInfo = useSelector(getUserInfo);

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
        <Text size={"sm"} ml={5} fw={700}>
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
          fw={700}
          styles={{
            section: { pointerEvents: "none" },
          }}
          mb="sm"
        />
        <div className={classes.section}>
          <div className={classes.mainLinks}>{mainLinks}</div>
        </div>
      </div>
      {active === "Home" && (
        <Notebook
          activeIcon={activeIcon}
          activeTag={activeTag}
          notes={notes}
          setActiveIcon={setActiveIcon}
          setActiveTag={setActiveTag}
          setNotes={setNotes}
        />
      )}
      {active === "Calendar" && (
        <TaskCalendar notes={notes} setNotes={setNotes} />
      )}
    </Flex>
  );
}
