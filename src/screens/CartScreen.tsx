import { useAppTheme } from "@/hooks/useAppTheme";
import { useCart } from "@/hooks/useCart";
import { useOrders } from "@/hooks/useOrders";
import { useRouter } from "expo-router";
import { Alert, FlatList, Pressable, Text, View } from "react-native";

export default function CartScreen() {
  const { colors } = useAppTheme();

  const { items, increase, decrease, removeItem, clearCart, totalPrice } =
    useCart();

  const { placeOrder } = useOrders();
  const router = useRouter();

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      Alert.alert("Cart Empty", "Please add some items first.");
      return;
    }

    try {
      placeOrder(items, totalPrice);
      clearCart();
      router.replace("/order-summary");
    } catch (error) {
      console.log("Place Order Error:", error);
      Alert.alert("Error", "Could not place order.");
    }
  };

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
          backgroundColor: colors.background,
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
                fontSize: 24,
                marginTop: -2,
              }}
            >
              ‹
            </Text>
          </Pressable>

          <View>
            <Text
              style={{
                color: colors.text,
                fontSize: 28,
                fontWeight: "800",
              }}
            >
              Your Cart 🛒
            </Text>

            <Text
              style={{
                color: colors.subText,
                marginTop: 3,
              }}
            >
              Review your delicious choices
            </Text>
          </View>
        </View>
      </View>

      {/* Empty Cart */}
      {items.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 30,
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
            <Text style={{ fontSize: 42 }}>🛒</Text>
          </View>

          <Text
            style={{
              color: colors.text,
              fontSize: 22,
              fontWeight: "800",
              marginBottom: 8,
            }}
          >
            Your cart is empty
          </Text>

          <Text
            style={{
              color: colors.subText,
              textAlign: "center",
              lineHeight: 21,
              marginBottom: 22,
            }}
          >
            Looks like you haven't added anything yet.
            {"\n"}Let's find something delicious!
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
      ) : (
        <>
          {/* Items */}
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingBottom: 20,
            }}
            renderItem={({ item }) => {
              const itemTotal = item.price * item.quantity;

              return (
                <View
                  style={{
                    backgroundColor: colors.card,
                    borderRadius: 16,
                    padding: 16,
                    marginBottom: 14,
                    borderWidth: 1,
                    borderColor: colors.border,
                  }}
                >
                  {/* Food Info */}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <View style={{ flex: 1, paddingRight: 10 }}>
                      <Text
                        style={{
                          color: colors.text,
                          fontSize: 18,
                          fontWeight: "800",
                        }}
                      >
                        {item.name}
                      </Text>

                      <Text
                        style={{
                          color: colors.subText,
                          marginTop: 5,
                          fontSize: 14,
                        }}
                      >
                        Rs. {item.price} each
                      </Text>
                    </View>

                    <Text
                      style={{
                        color: colors.primary,
                        fontSize: 17,
                        fontWeight: "800",
                      }}
                    >
                      Rs. {itemTotal}
                    </Text>
                  </View>

                  {/* Quantity */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 16,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: colors.background,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: colors.border,
                        padding: 4,
                      }}
                    >
                      <Pressable
                        onPress={() => decrease(item.id)}
                        style={{
                          width: 38,
                          height: 36,
                          borderRadius: 9,
                          backgroundColor: colors.card,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: colors.primary,
                            fontSize: 22,
                            fontWeight: "bold",
                          }}
                        >
                          −
                        </Text>
                      </Pressable>

                      <Text
                        style={{
                          color: colors.text,
                          fontSize: 17,
                          fontWeight: "800",
                          width: 42,
                          textAlign: "center",
                        }}
                      >
                        {item.quantity}
                      </Text>

                      <Pressable
                        onPress={() => increase(item.id)}
                        style={{
                          width: 38,
                          height: 36,
                          borderRadius: 9,
                          backgroundColor: colors.primary,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: 22,
                            fontWeight: "bold",
                          }}
                        >
                          +
                        </Text>
                      </Pressable>
                    </View>

                    {/* Remove */}
                    <Pressable
                      onPress={() => removeItem(item.id)}
                      style={{
                        paddingVertical: 9,
                        paddingHorizontal: 12,
                        borderRadius: 9,
                        backgroundColor: "#FEE2E2",
                      }}
                    >
                      <Text
                        style={{
                          color: "#DC2626",
                          fontWeight: "700",
                        }}
                      >
                        Remove
                      </Text>
                    </Pressable>
                  </View>
                </View>
              );
            }}
          />

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
                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  color: colors.subText,
                  fontSize: 15,
                }}
              >
                Items
              </Text>

              <Text
                style={{
                  color: colors.text,
                  fontWeight: "700",
                }}
              >
                {items.reduce((total, item) => total + item.quantity, 0)}
              </Text>
            </View>

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
                  fontSize: 21,
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
                Rs. {totalPrice}
              </Text>
            </View>

            {/* Place Order */}
            <Pressable
              onPress={handlePlaceOrder}
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
                Place Order →
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}
