import { useAppTheme } from "@/hooks/useAppTheme";
import { useOrders } from "@/hooks/useOrders";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function OrderTrackingScreen() {
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
          padding: 24,
        }}
      >
        <View
          style={{
            width: 90,
            height: 90,
            borderRadius: 45,
            backgroundColor: colors.card,
            borderWidth: 1,
            borderColor: colors.border,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 42 }}>📦</Text>
        </View>

        <Text
          style={{
            color: colors.text,
            fontSize: 23,
            fontWeight: "800",
            marginBottom: 8,
          }}
        >
          No Order Found
        </Text>

        <Text
          style={{
            color: colors.subText,
            textAlign: "center",
            lineHeight: 21,
            marginBottom: 24,
          }}
        >
          You don't have any recent order to track.
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
              fontSize: 16,
              fontWeight: "800",
            }}
          >
            Browse Menu
          </Text>
        </Pressable>
      </View>
    );
  }

  const steps = [
    {
      title: "Order Placed",
      description: "Your order has been received.",
      icon: "📝",
      completed: true,
    },
    {
      title: "Preparing",
      description: "Our kitchen is preparing your food.",
      icon: "👨‍🍳",
      completed:
        order.status === "Preparing" ||
        order.status === "On the way" ||
        order.status === "Delivered",
    },
    {
      title: "On the Way",
      description: "Your order is on its way to you.",
      icon: "🛵",
      completed: order.status === "On the way" || order.status === "Delivered",
    },
    {
      title: "Delivered",
      description: "Enjoy your delicious meal!",
      icon: "✅",
      completed: order.status === "Delivered",
    },
  ];

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
          paddingBottom: 18,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Pressable
            onPress={() => router.back()}
            style={{
              width: 42,
              height: 42,
              borderRadius: 21,
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 14,
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontSize: 27,
                marginTop: -3,
              }}
            >
              ‹
            </Text>
          </Pressable>

          <View>
            <Text
              style={{
                color: colors.text,
                fontSize: 27,
                fontWeight: "900",
              }}
            >
              Track Order 📦
            </Text>

            <Text
              style={{
                color: colors.subText,
                marginTop: 3,
              }}
            >
              Order #{order.id}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 40,
        }}
      >
        {/* Current Status Card */}
        <View
          style={{
            backgroundColor: colors.primary,
            borderRadius: 18,
            padding: 20,
            marginBottom: 24,
          }}
        >
          <Text
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: 14,
              fontWeight: "700",
              marginBottom: 7,
            }}
          >
            CURRENT STATUS
          </Text>

          <Text
            style={{
              color: "#fff",
              fontSize: 27,
              fontWeight: "900",
              marginBottom: 7,
            }}
          >
            {order.status}
          </Text>

          <Text
            style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: 14,
              lineHeight: 20,
            }}
          >
            {order.status === "Preparing"
              ? "Your food is being freshly prepared."
              : order.status === "On the way"
                ? "Your order is on the way."
                : order.status === "Delivered"
                  ? "Your order has been delivered. Enjoy your meal! 🎉"
                  : "Your order has been received and is being processed."}
          </Text>
        </View>

        {/* Progress */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: colors.border,
            padding: 20,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 21,
              fontWeight: "900",
              marginBottom: 20,
            }}
          >
            Order Progress
          </Text>

          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;

            return (
              <View
                key={step.title}
                style={{
                  flexDirection: "row",
                  minHeight: isLast ? 65 : 85,
                }}
              >
                {/* Timeline */}
                <View
                  style={{
                    width: 44,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: step.completed
                        ? colors.primary
                        : colors.background,
                      borderWidth: 1,
                      borderColor: step.completed
                        ? colors.primary
                        : colors.border,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: 19 }}>{step.icon}</Text>
                  </View>

                  {!isLast && (
                    <View
                      style={{
                        width: 2,
                        flex: 1,
                        backgroundColor: step.completed
                          ? colors.primary
                          : colors.border,
                        marginVertical: 4,
                      }}
                    />
                  )}
                </View>

                {/* Step Content */}
                <View
                  style={{
                    flex: 1,
                    paddingLeft: 14,
                    paddingBottom: isLast ? 0 : 18,
                  }}
                >
                  <Text
                    style={{
                      color: step.completed ? colors.text : colors.subText,
                      fontSize: 17,
                      fontWeight: "800",
                      marginBottom: 4,
                    }}
                  >
                    {step.title}
                  </Text>

                  <Text
                    style={{
                      color: colors.subText,
                      fontSize: 13,
                      lineHeight: 19,
                    }}
                  >
                    {step.description}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Order Details */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: colors.border,
            padding: 20,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 21,
              fontWeight: "900",
              marginBottom: 16,
            }}
          >
            Order Details
          </Text>

          {order.items.map((item) => (
            <View
              key={item.id}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              }}
            >
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text
                  style={{
                    color: colors.text,
                    fontSize: 15,
                    fontWeight: "700",
                  }}
                >
                  {item.name}
                </Text>

                <Text
                  style={{
                    color: colors.subText,
                    marginTop: 3,
                  }}
                >
                  Qty: {item.quantity}
                </Text>
              </View>

              <Text
                style={{
                  color: colors.primary,
                  fontWeight: "800",
                }}
              >
                Rs. {item.price * item.quantity}
              </Text>
            </View>
          ))}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 16,
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontSize: 18,
                fontWeight: "900",
              }}
            >
              Total
            </Text>

            <Text
              style={{
                color: colors.primary,
                fontSize: 21,
                fontWeight: "900",
              }}
            >
              Rs. {order.total}
            </Text>
          </View>
        </View>

        {/* Back to Menu */}
        <Pressable
          onPress={() => router.replace("/menu")}
          style={({ pressed }) => ({
            backgroundColor: colors.primary,
            paddingVertical: 15,
            borderRadius: 13,
            opacity: pressed ? 0.8 : 1,
          })}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontSize: 16,
              fontWeight: "800",
            }}
          >
            Back to Menu
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
