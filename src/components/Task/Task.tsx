// TaskTypes.ts
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

export interface Tag {
  label: string;
  icon: string;
}

// Task.tsx
import { useState, useRef, useEffect } from "react";
import {
  Center,
  Checkbox,
  Collapse,
  Flex,
  Image,
  Menu,
  rem,
  UnstyledButton,
  ActionIcon,
  Text,
  CopyButton,
  Tooltip,
  TextInput,
} from "@mantine/core";
import { CustomIcon } from "../CustomIcon/CustomIcon";
import { IconCopy, IconCheck } from "@tabler/icons-react";
import {
  IconPlayerPlay,
  IconCaretDownFilled,
  IconCaretUpFilled,
  IconCalendar,
  IconPlayerPause,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { DatePickerInput } from "@mantine/dates";
import WaveSurfer from "wavesurfer.js";

// Import assets
import Wavelength from "../../assets/Wavelength.svg";
import testAudio from "./testAudio.mp3";
import GreenTag from "../../assets/GreenTag.svg";
import MagentaTag from "../../assets/MagentaTag.svg";
import YellowTag from "../../assets/YellowTag.svg";
import BlueTag from "../../assets/BlueTag.svg";
import BlackTag from "../../assets/BlackTag.svg";
import WhiteTag from "../../assets/WhiteTag.svg";
import Logo from "../../assets/Logo.svg";

// Define tags array
export const tags: Tag[] = [
  { label: "All", icon: WhiteTag },
  { label: "Ideas", icon: GreenTag },
  { label: "Actions", icon: MagentaTag },
  { label: "Thoughts", icon: YellowTag },
  { label: "Projects", icon: BlueTag },
  { label: "Questions", icon: BlackTag },
  { label: "Untagged", icon: WhiteTag },
];

interface TaskProps {
  task: TaskEntry;
  // onTaskUpdate?: (updatedTask: TaskEntry) => void;
  handleDueDateChange: (id: string, dueDate: string | null) => void;
  handleTaskValueChange: (id: string, taskValue: string) => void;
  handleTaskLabelChange: (id: string, taskLabel: string) => void;
}

export function Task({
  task,
  handleDueDateChange,
  handleTaskValueChange,
  handleTaskLabelChange,
}: TaskProps) {
  // State management
  const [opened, setOpened] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [dueDate, setDueDate] = useState<Date | null>(
    task.dueDate ? new Date(task.dueDate) : null
  );
  const [taskValue, setTaskValue] = useState(task.task);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  const today = new Date();

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

  // Initialize WaveSurfer
  useEffect(() => {
    if (waveformRef.current && !wavesurferRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#000000",
        progressColor: "#00FF00",
        barWidth: 3,
        cursorWidth: 0,
        barRadius: 1,
        barGap: 2,
        url: testAudio,
        height: 70,
        normalize: true,
        width: 600,
        peaks: [
          [
            0.1, 0.2, 0.3, 0.1, 0.5, 0.2, 0.4, 0.1, 0.2, 0.2, 0.1, 0.2, 0.6,
            0.9, 1, 0.8, 0.6, 0.7, 0.4, 0.7, 0.6, 0.4, 0.2, 0.1, 0.4, 0.6, 0.5,
            0.2, 0.6, 0.7, 0.6, 0.3, 0.4, 0.2, 0.1, 0.2, 0.4, 0.7, 0.2, 0.4,
            0.2, 0.1, 0.1, 0.2, 0.1, 0.1, 0.2, 0.3, 0.1, 0.5, 0.2, 0.4, 0.1,
            0.2, 0.2, 0.1, 0.2, 0.6, 0.9, 1, 0.8, 0.6, 0.7, 0.4, 0.7, 0.6, 0.4,
            0.2, 0.1, 0.4, 0.6, 0.5, 0.2, 0.6, 0.7, 0.6, 0.3, 0.4, 0.2, 0.1,
            0.2, 0.4, 0.7, 0.2, 0.4, 0.2, 0.1, 0.1, 0.2, 0.1, 0.1, 0.2, 0.3,
            0.1, 0.5, 0.2, 0.4, 0.1, 0.2, 0.2, 0.1, 0.2, 0.6, 0.9, 1, 0.8, 0.6,
            0.7, 0.4, 0.7, 0.6, 0.4, 0.2, 0.1, 0.4, 0.6, 0.5, 0.2, 0.6, 0.7,
            0.6, 0.3, 0.4, 0.2, 0.1, 0.2, 0.4, 0.7, 0.2, 0.4, 0.2, 0.1, 0.1,
            0.2, 0.1,
          ],
        ],
      });

      // Event listeners
      wavesurferRef.current.on("play", () => setIsPlaying(true));
      wavesurferRef.current.on("pause", () => setIsPlaying(false));
      wavesurferRef.current.on("finish", () => {
        setIsPlaying(false);
        wavesurferRef.current?.setTime(0);
      });
    }

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
      }
    };
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (wavesurferRef.current && containerRef.current) {
        // wavesurferRef.current.setWidth(
        //   containerRef.current.getBoundingClientRect().width
        // );
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle collapse toggle
  useEffect(() => {
    if (opened && wavesurferRef.current && containerRef.current) {
      setTimeout(() => {
        // wavesurferRef.current?.setWidth(
        //   containerRef.current?.getBoundingClientRect().width || "100%"
        // );
        // wavesurferRef.current?.drawBuffer();
      }, 100);
    }
  }, [opened]);

  const handlePlayPause = () => {
    if (wavesurferRef.current) {
      if (isPlaying) {
        wavesurferRef.current.pause();
      } else {
        wavesurferRef.current.play();
      }
    }
  };

  const onLabelChanged = (id: string, label: string) => {
    if (task.label !== label) {
      label === "Untagged"
        ? handleTaskLabelChange(id, "")
        : handleTaskLabelChange(id, label);
    }
  };

  const onDueDateChange = (date: Date | null) => {
    handleDueDateChange(task.id, date ? date.toISOString() : null);
    setDueDate(date);
  };

  const onTaskValueChange = (id: string, taskValue: string) => {
    if (task.task !== taskValue && taskValue) {
      handleTaskValueChange(id, taskValue);
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setChecked(checked);
    setOpened(false);
    // if (onTaskUpdate) {
    //   onTaskUpdate({
    //     ...task,
    //     completed: checked,
    //   });
    // }
  };

  return (
    <Flex direction="column" w="100%">
      <Flex mt={25} gap="xs" align="center" w="100%">
        {/* Main content area (75%) */}
        <Flex
          ref={containerRef}
          style={{ width: "75%" }}
          align="center"
          justify="space-between"
        >
          <Flex gap="lg" align={"center"}>
            <Checkbox
              checked={checked}
              onChange={(event) =>
                handleCheckboxChange(event.currentTarget.checked)
              }
              // label={task.task}
              styles={{
                input: {
                  cursor: "pointer",
                },
              }}
            />
            <TextInput
              variant="unstyled"
              value={taskValue}
              styles={{
                input: {
                  fontSize: "20px",
                  textDecoration: checked ? "line-through" : "none",
                  color: checked ? "#9BA1A6" : "inherit",
                  transition: "all 0.2s ease",
                },
              }}
              onChange={(event) => setTaskValue(event.currentTarget.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onTaskValueChange(task.id, taskValue);
                }
              }}
              onBlur={() => onTaskValueChange(task.id, taskValue)}
              readOnly={checked}
              placeholder={task.task === "" ? "Write a task..." : ""}
            />
            {!checked && task.hasAudio && (
              <UnstyledButton onClick={() => setOpened(!opened)}>
                <Flex gap="4px" align="center">
                  <Image
                    src={Wavelength}
                    style={{
                      opacity: checked ? 0.5 : 1,
                      transition: "opacity 0.2s ease",
                    }}
                  />
                  <Center>
                    {opened ? (
                      <IconCaretUpFilled
                        style={{
                          width: rem(12),
                          height: rem(12),
                          opacity: checked ? 0.5 : 1,
                          transition: "opacity 0.2s ease",
                        }}
                      />
                    ) : (
                      <IconCaretDownFilled
                        style={{
                          width: rem(12),
                          height: rem(12),
                          opacity: checked ? 0.5 : 1,
                          transition: "opacity 0.2s ease",
                        }}
                      />
                    )}
                  </Center>
                </Flex>
              </UnstyledButton>
            )}
          </Flex>
          {checked ? (
            <></>
          ) : (
            <Menu shadow="md" width={160}>
              <Menu.Target>
                <UnstyledButton>
                  <CustomIcon
                    icon={getIcons(task.label)}
                    // styles={{
                    //   opacity: checked ? 0.5 : 1,
                    //   transition: "opacity 0.2s ease",
                    // }}
                  />
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                {tags.map((tag) => {
                  if (tag.label === "All") return null;
                  return (
                    <Menu.Item
                      leftSection={<CustomIcon icon={tag.icon} />}
                      onClick={() => onLabelChanged(task.id, tag.label)}
                      key={tag.label}
                    >
                      {tag.label}
                    </Menu.Item>
                  );
                })}
              </Menu.Dropdown>
            </Menu>
          )}
        </Flex>

        {/* Date picker area (25%) */}
        <Flex style={{ width: "25%" }}>
          {checked ? (
            <></>
          ) : (
            <DatePickerInput
              leftSection={
                <IconCalendar
                  style={{
                    width: rem(18),
                    height: rem(18),
                    opacity: checked ? 0.5 : 1,
                    transition: "opacity 0.2s ease",
                  }}
                  stroke={1.5}
                />
              }
              rightSection={
                <IconCaretDownFilled
                  style={{
                    width: rem(12),
                    height: rem(12),
                    opacity: checked ? 0.5 : 1,
                    transition: "opacity 0.2s ease",
                  }}
                />
              }
              placeholder="Due Date"
              value={dueDate}
              onChange={onDueDateChange}
              size="sm"
              fw={700}
              styles={{
                input: {
                  border: "none",
                  outline: "none",
                  width: "100%",
                  fontSize: "12px",
                  fontWeight: 700,
                  opacity: checked ? 0.5 : 1,
                  transition: "opacity 0.2s ease",
                },
                wrapper: {
                  width: "100%",
                },
              }}
              minDate={today}
            />
          )}
        </Flex>
      </Flex>

      {/* Collapsible audio section */}
      <Flex w="75%">
        <Collapse in={opened} style={{ width: "100%" }}>
          <Flex mt="md" style={{ width: "100%" }} align="center">
            <ActionIcon
              variant="filled"
              size="lg"
              radius="lg"
              aria-label="Settings"
              mr={12}
              onClick={handlePlayPause}
              style={{
                opacity: checked ? 0.5 : 1,
                transition: "opacity 0.2s ease",
              }}
            >
              {isPlaying ? (
                <IconPlayerPause
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              ) : (
                <IconPlayerPlay
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              )}
            </ActionIcon>
            <Flex
              ref={waveformRef}
              style={{
                opacity: checked ? 0.5 : 1,
                transition: "opacity 0.2s ease",
              }}
            />
            <Text
              fz="13px"
              ml={12}
              mr={8}
              style={{
                opacity: checked ? 0.5 : 1,
                transition: "opacity 0.2s ease",
              }}
            >
              {task.duration}
            </Text>
            <CopyButton value={task.transcript || ""} timeout={1500}>
              {({ copied, copy }) => (
                <Tooltip
                  label={copied ? "Copied" : "Copy"}
                  withArrow
                  position="right"
                >
                  <ActionIcon
                    color={copied ? "teal" : "gray"}
                    variant="subtle"
                    onClick={copy}
                    style={{
                      opacity: checked ? 0.5 : 1,
                      transition: "opacity 0.2s ease",
                    }}
                  >
                    {copied ? (
                      <IconCheck style={{ width: rem(20) }} />
                    ) : (
                      <IconCopy style={{ width: rem(20) }} />
                    )}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
          </Flex>
        </Collapse>
      </Flex>
    </Flex>
  );
}
