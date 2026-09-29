import { useAppTheme } from "@/hooks/useAppTheme";
import { useOrders } from "@/hooks/useOrders";
import { useRouter } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";

export default function OrderSummaryScreen() {
  const { colors } = useAppTheme();
  const { orders } = useOrders();
  const router = useRouter();

  const order = orders[0];

  if (!order) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          justifyContent: "center",
          alignItems: "center",
          padding: 25,
        }}
      >
        <View
          style={{
            width: 90,
            height: 90,
            borderRadius: 45,
            backgroundColor: colors.card,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Text style={{ fontSize: 42 }}>📦</Text>
        </View>

        <Text
          style={{
            color: colors.text,
            fontSize: 22,
            fontWeight: "800",
          }}
        >
          No order found
        </Text>

        <Text
          style={{
            color: colors.subText,
            textAlign: "center",
            marginTop: 7,
            marginBottom: 22,
          }}
        >
          You haven't placed an order yet.
        </Text>

        <Pressable
          onPress={() => router.replace("/menu")}
          style={{
            backgroundColor: colors.primary,
            paddingVertical: 14,
            paddingHorizontal: 28,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "800",
              fontSize: 16,
            }}
          >
            Browse Menu
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      {/* Header */}
      <View
        style={{
          paddingTop: 55,
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}
      >
        <Pressable
          onPress={() => router.replace("/menu")}
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
            backgroundColor: colors.card,
            borderWidth: 1,
            borderColor: colors.border,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 25,
              marginTop: -2,
            }}
          >
            ‹
          </Text>
        </Pressable>

        {/* Success Icon */}
        <View
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: colors.primary,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 32,
              fontWeight: "bold",
            }}
          >
            ✓
          </Text>
        </View>

        <Text
          style={{
            color: colors.text,
            fontSize: 30,
            fontWeight: "900",
          }}
        >
          Order Placed!
        </Text>

        <Text
          style={{
            color: colors.subText,
            fontSize: 15,
            marginTop: 6,
          }}
        >
          Thank you! Your order has been received.
        </Text>
      </View>

      {/* Order Card */}
      <View
        style={{
          marginHorizontal: 20,
          backgroundColor: colors.card,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: colors.border,
          padding: 17,
          marginBottom: 15,
        }}
      >
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
                fontSize: 13,
              }}
            >
              ORDER NUMBER
            </Text>

            <Text
              style={{
                color: colors.text,
                fontSize: 17,
                fontWeight: "800",
                marginTop: 4,
              }}
            >
              #{order.id}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: colors.primary,
              paddingVertical: 7,
              paddingHorizontal: 12,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "800",
                fontSize: 12,
              }}
            >
              {order.status}
            </Text>
          </View>
        </View>
      </View>

      {/* Items */}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: colors.text,
            fontSize: 20,
            fontWeight: "800",
            marginHorizontal: 20,
            marginBottom: 10,
          }}
        >
          Your Items
        </Text>

        <FlatList
          data={order.items}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 15,
          }}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: colors.card,
                borderRadius: 13,
                borderWidth: 1,
                borderColor: colors.border,
                padding: 14,
                marginBottom: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: colors.text,
                    fontSize: 16,
                    fontWeight: "700",
                  }}
                >
                  {item.name}
                </Text>

                <Text
                  style={{
                    color: colors.subText,
                    marginTop: 4,
                  }}
                >
                  Rs. {item.price} × {item.quantity}
                </Text>
              </View>

              <Text
                style={{
                  color: colors.primary,
                  fontSize: 16,
                  fontWeight: "800",
                }}
              >
                Rs. {item.price * item.quantity}
              </Text>
            </View>
          )}
        />
      </View>

      {/* Bottom Summary */}
      <View
        style={{
          backgroundColor: colors.card,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingHorizontal: 20,
          paddingTop: 18,
          paddingBottom: 25,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 20,
              fontWeight: "800",
            }}
          >
            Total
          </Text>

          <Text
            style={{
              color: colors.primary,
              fontSize: 23,
              fontWeight: "900",
            }}
          >
            Rs. {order.total}
          </Text>
        </View>

        {/* Track Order */}
        <Pressable
          onPress={() => router.push("/order-tracking")}
          style={({ pressed }) => ({
            backgroundColor: colors.primary,
            paddingVertical: 16,
            borderRadius: 13,
            opacity: pressed ? 0.8 : 1,
          })}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontSize: 17,
              fontWeight: "800",
            }}
          >
            Track Order →
          </Text>
        </Pressable>

        {/* Menu */}
        <Pressable
          onPress={() => router.replace("/menu")}
          style={{
            paddingVertical: 12,
            marginTop: 4,
          }}
        >
          <Text
            style={{
              color: colors.primary,
              textAlign: "center",
              fontWeight: "800",
            }}
          >
            Continue Shopping
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
