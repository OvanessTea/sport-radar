import { ChipGroup, Chip } from "@mantine/core";
import {
	IconBallFootball,
	IconBallBasketball,
	IconPin,
	IconBallBaseball,
	IconBallAmericanFootball,
	IconSoccerField
} from "@tabler/icons-react";
import styles from "./Sidebar.module.scss";
import { SportType } from "@/types/sport.type";

interface SidebarProps {
	availableSports: SportType[];
	setSelectedTabs: (tabs: string[]) => void;
	selectedTabs: string[];
}

const sportIcons: Record<string, React.ComponentType<{ size?: number; color?: string; stroke?: number }>> = {
	All: IconSoccerField,
	Football: IconBallFootball,
	Basketball: IconBallBasketball,
	"Ice Hockey": IconPin,
	Baseball: IconBallBaseball,
	"American Football": IconBallAmericanFootball,
};

export const Sidebar = ({ availableSports, setSelectedTabs, selectedTabs }: SidebarProps) => {

	if (availableSports.length === 0) {
		return null;
	}

	const handleTabChange = (value: string | string[]) => {
		const selectedValue = Array.isArray(value) ? value : [value];

		if (selectedValue.length === 0) {
			setSelectedTabs([]);
		} else {
			setSelectedTabs(selectedValue);
		}
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
		<div className={styles.sidebar}>
			<div className={styles.tabsList}>
				<ChipGroup
					value={selectedTabs}
					onChange={handleTabChange}
					multiple={true}
				>
					{availableSports.map((sport) => (
						<Chip
							key={sport.id}
							value={sport.name}
							className={`${styles.tab} ${selectedTabs.includes(sport.name) ? styles.selected : ''}`}
						>
							{renderIcon(sport.name, selectedTabs.includes(sport.name))}
							{sport.name}
						</Chip>
					))}
				</ChipGroup>
			</div>
		</div>
	);
}