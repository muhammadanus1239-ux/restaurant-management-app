import { useAppTheme } from "@/hooks/useAppTheme";
import { Pressable, Text, TextInput, View } from "react-native";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function SearchBar({ value, onChangeText }: Props) {
  const { colors } = useAppTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 14,
        paddingHorizontal: 14,
        marginBottom: 14,

        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.06,
        shadowRadius: 5,
        elevation: 2,
      }}
    >
      {/* Search Icon */}
      <Text
        style={{
          fontSize: 18,
          marginRight: 9,
          color: colors.subText,
        }}
      >
        🔍
      </Text>

      {/* Input */}
      <TextInput
        placeholder="Search your favorite food..."
        placeholderTextColor={colors.subText}
        value={value}
        onChangeText={onChangeText}
        style={{
          flex: 1,
          color: colors.text,
          fontSize: 15,
          paddingVertical: 13,
        }}
        returnKeyType="search"
      />

      {/* Clear Button */}
      {value.length > 0 && (
        <Pressable
          onPress={() => onChangeText("")}
          hitSlop={8}
          style={({ pressed }) => ({
            width: 28,
            height: 28,
            borderRadius: 14,
            backgroundColor: colors.border,
            alignItems: "center",
            justifyContent: "center",
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            ×
          </Text>
        </Pressable>
      )}
    </View>
  );
}
