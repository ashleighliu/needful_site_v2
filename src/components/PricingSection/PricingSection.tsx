import { Center, Box } from '@mantine/core';
import { useState } from 'react';
import { TeamsPricing } from '../TeamsPricing/TeamsPricing';
import { IndividualPricing } from '../IndividualPricing/IndividualPricing';
import { PricingSwitch } from '../PricingSwitch/PricingSwitch';

const tabs = [
  { id: "teams", label: "For Teams", image: "team" },
  { id: "individuals", label: "For Individuals", image: "individual" },
];

export function PricingSection() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <Box mt={200}>
      <Center>
        <PricingSwitch activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      </Center>
      {activeTab === "teams" ? <TeamsPricing /> : <IndividualPricing />}
    </Box>
  );
}