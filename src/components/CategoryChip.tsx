import { useAppTheme } from "@/hooks/useAppTheme";
import { Pressable, Text } from "react-native";

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export default function CategoryChip({ label, selected, onPress }: Props) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: selected ? colors.primary : colors.card,

        borderColor: selected ? colors.primary : colors.border,

        borderWidth: 1,
        borderRadius: 14,

        paddingVertical: 10,
        paddingHorizontal: 18,

        marginRight: 10,

        opacity: pressed ? 0.75 : 1,

        shadowColor: selected ? colors.primary : "#000",
        shadowOffset: {
          width: 0,
          height: selected ? 3 : 1,
        },
        shadowOpacity: selected ? 0.2 : 0.05,
        shadowRadius: 4,
        elevation: selected ? 3 : 1,

        transform: [
          {
            scale: pressed ? 0.96 : 1,
          },
        ],
      })}
    >
      <Text
        style={{
          color: selected ? "#FFFFFF" : colors.text,
          fontSize: 14,
          fontWeight: "700",
          letterSpacing: 0.2,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
