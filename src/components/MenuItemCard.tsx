import { useAppTheme } from "@/hooks/useAppTheme";
import { Pressable, Text, View } from "react-native";

type Props = {
  name: string;
  description: string;
  price: number;
  onAdd: () => void;
};

export default function MenuItemCard({
  name,
  description,
  price,
  onAdd,
}: Props) {
  const { colors } = useAppTheme();

  return (
    <View
      style={{
        backgroundColor: colors.card,
        borderRadius: 18,
        padding: 18,
        marginBottom: 14,

        // Premium card border
        borderWidth: 1,
        borderColor: colors.border,

        // Subtle shadow
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      {/* Top Section */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <View style={{ flex: 1, paddingRight: 12 }}>
          <Text
            style={{
              fontSize: 19,
              fontWeight: "800",
              color: colors.text,
              letterSpacing: 0.2,
            }}
          >
            {name}
          </Text>

          <Text
            style={{
              color: colors.subText,
              fontSize: 14,
              lineHeight: 20,
              marginTop: 7,
            }}
          >
            {description}
          </Text>
        </View>

        {/* Price */}
        <View
          style={{
            backgroundColor: colors.primary + "15",
            paddingHorizontal: 10,
            paddingVertical: 7,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: colors.primary,
              fontSize: 15,
              fontWeight: "800",
            }}
          >
            Rs. {price}
          </Text>
        </View>
      </View>

      {/* Divider */}
      <View
        style={{
          height: 1,
          backgroundColor: colors.border,
          marginVertical: 15,
        }}
      />

      {/* Bottom Section */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              color: colors.subText,
              fontSize: 12,
              fontWeight: "600",
            }}
          >
            PRICE
          </Text>

          <Text
            style={{
              color: colors.text,
              fontSize: 18,
              fontWeight: "800",
              marginTop: 2,
            }}
          >
            Rs. {price}
          </Text>
        </View>

        {/* Add Button */}
        <Pressable
          onPress={onAdd}
          style={({ pressed }) => ({
            backgroundColor: colors.primary,
            paddingVertical: 11,
            paddingHorizontal: 20,
            borderRadius: 12,

            shadowColor: colors.primary,
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.25,
            shadowRadius: 5,
            elevation: 3,

            opacity: pressed ? 0.75 : 1,
            transform: [{ scale: pressed ? 0.97 : 1 }],
          })}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 15,
              fontWeight: "800",
            }}
          >
            + Add
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
