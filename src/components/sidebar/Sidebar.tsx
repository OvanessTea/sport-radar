import { useData } from "@/hooks/useData";
import { Tabs } from "@mantine/core";
import {
  IconBallFootball,
  IconBallBasketball,
  IconPin,
  IconBallBaseball,
  IconBallAmericanFootball,
  IconSoccerField
} from "@tabler/icons-react";
import styles from "./Sidebar.module.scss";

const sportIcons: Record<string, React.ComponentType<{ size?: number; color?: string; stroke?: number }>> = {
  All: IconSoccerField,
  Football: IconBallFootball,
  Basketball: IconBallBasketball,
  "Ice Hockey": IconPin,
  Baseball: IconBallBaseball,
  "American Football": IconBallAmericanFootball,
};

export const Sidebar = ({ setSelectedTab, selectedTab, onTabChange }: { setSelectedTab: (tab: string) => void, selectedTab: string, onTabChange?: () => void }) => {
  const { sports } = useData();

  if (sports.length === 0) {
    return null;
  }

  const handleTabChange = (value: string | null) => {
    setSelectedTab(value || 'all');
    onTabChange?.();
  };

  const renderIcon = (name: string, isSelected: boolean) => {
    const IconComponent = sportIcons[name];
    if (!IconComponent) return null;
    return (
      <IconComponent
        size={22}
        color={isSelected ? "#fff" : "#222"}
        stroke={2}
      />
    );
  };

  return (
    <Tabs
      orientation="vertical"
      value={selectedTab}
      onChange={handleTabChange}
      variant="unstyled"
      className={styles.sidebar}
    >
      <Tabs.List className={styles.tabsList}>
        <Tabs.Tab 
          value="all" 
          className={`${styles.tab} ${selectedTab === 'all' ? styles.selected : ''}`}
          onClick={() => handleTabChange('all')}
        >
          {renderIcon('All', selectedTab === 'all')}
          All
        </Tabs.Tab>
        {sports.map((sport) => (
          <Tabs.Tab 
            key={sport.id} 
            value={sport.name} 
            className={`${styles.tab} ${selectedTab === sport.name ? styles.selected : ''}`}
            onClick={() => handleTabChange(sport.name)}
          >
            {renderIcon(sport.name, selectedTab === sport.name)}
            {sport.name}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
}