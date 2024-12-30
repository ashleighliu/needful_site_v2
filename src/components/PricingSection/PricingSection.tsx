import { Center, Box, Image } from "@mantine/core";
import { useState } from "react";
import { TeamsPricing } from "../TeamsPricing/TeamsPricing";
import { IndividualPricing } from "../IndividualPricing/IndividualPricing";
import { PricingSwitch } from "../PricingSwitch/PricingSwitch";
import RedBubbles from "../../assets/RedBubbles.svg";
import classes from "./PricingSection.module.css";

const tabs = [
  { id: "teams", label: "For Teams", image: "team" },
  { id: "individuals", label: "For Individuals", image: "individual" },
];

export function PricingSection() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <Box mt={200} style={{ position: "relative", overflow: "hidden" }}>
      {/* Pricing Content */}
      <Center>
        <PricingSwitch
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={tabs}
        />
      </Center>
      {activeTab === "teams" ? <TeamsPricing /> : <IndividualPricing />}
    </Box>
  );
}
