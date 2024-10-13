import { Center, Group } from "@mantine/core";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import classes from './PricingSwitch.module.css';
import { PricingIcon } from "../PricingIcon/PricingIcon";

type Tab = {
  id: string;
  image: string;
  label: string;
}

type PricingSwitchProps = {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  tabs: Tab[];
};

export function PricingSwitch(props: PricingSwitchProps) {
  const { activeTab, setActiveTab, tabs } = props;

  return (
    <Group className={classes.switch}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={classes.tab}
        >
          {activeTab === tab.id && (
            <motion.span
              layoutId="bubble"
              className={classes.motion}
              style={{ borderRadius: 9999 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
            />
          )}
          <Center>
            <Center className={classes.icon}>
              <PricingIcon fill={activeTab === tab.id ? "white" : "#555555"} image={tab.image}/>
            </Center>
            <div style={{ color: `${activeTab === tab.id ? "white" : "#555555"}` }}>
              {tab.label}
            </div>
          </Center>
        </button>
      ))}
    </Group>
  );
}