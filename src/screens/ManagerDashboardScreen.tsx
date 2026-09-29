import { useReservations } from "@/context/ReservationsContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useAuth } from "@/hooks/useAuth";
import { useOrders } from "@/hooks/useOrders";
import { Order } from "@/reducers/ordersReducer";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function ManagerDashboardScreen() {
  const { user, logout } = useAuth();
  const { orders, updateStatus } = useOrders();
  const { reservations, updateReservationStatus } = useReservations();
  const { colors } = useAppTheme();
  const router = useRouter();

  const getNextStatus = (status: Order["status"]): Order["status"] | null => {
    if (status === "Preparing") return "On the way";
    if (status === "On the way") return "Delivered";
    return null;
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
      contentContainerStyle={{
        padding: 20,
        paddingTop: 60,
        paddingBottom: 50,
      }}
    >
      {/* Header */}
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: colors.text,
        }}
      >
        Manager Dashboard
      </Text>

      <Text
        style={{
          color: colors.subText,
          fontSize: 16,
          marginTop: 6,
          marginBottom: 15,
        }}
      >
        Welcome, {user?.name}
      </Text>

      {/* Logout */}
      <Pressable
        onPress={handleLogout}
        style={{
          backgroundColor: colors.border,
          padding: 12,
          borderRadius: 9,
          marginBottom: 25,
        }}
      >
        <Text
          style={{
            color: colors.text,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Logout
        </Text>
      </Pressable>

      {/* Stats */}
      <View
        style={{
          flexDirection: "row",
          gap: 12,
          marginBottom: 25,
        }}
      >
        {/* Total Orders */}
        <View
          style={{
            flex: 1,
            backgroundColor: colors.card,
            borderRadius: 12,
            padding: 16,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Text style={{ color: colors.subText, fontSize: 14 }}>
            Total Orders
          </Text>

          <Text
            style={{
              color: colors.text,
              fontSize: 26,
              fontWeight: "bold",
              marginTop: 5,
            }}
          >
            {orders.length}
          </Text>
        </View>

        {/* Reservations */}
        <View
          style={{
            flex: 1,
            backgroundColor: colors.card,
            borderRadius: 12,
            padding: 16,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Text style={{ color: colors.subText, fontSize: 14 }}>
            Reservations
          </Text>

          <Text
            style={{
              color: colors.primary,
              fontSize: 26,
              fontWeight: "bold",
              marginTop: 5,
            }}
          >
            {reservations.length}
          </Text>
        </View>
      </View>

      {/* ORDERS */}
      <Text
        style={{
          color: colors.text,
          fontSize: 22,
          fontWeight: "bold",
          marginBottom: 12,
        }}
      >
        Orders
      </Text>

      {orders.length === 0 ? (
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: 12,
            padding: 20,
            borderWidth: 1,
            borderColor: colors.border,
            marginBottom: 30,
          }}
        >
          <Text style={{ color: colors.subText, textAlign: "center" }}>
            No orders yet.
          </Text>
        </View>
      ) : (
        orders.map((order) => {
          const nextStatus = getNextStatus(order.status);

          return (
            <View
              key={order.id}
              style={{
                backgroundColor: colors.card,
                borderRadius: 14,
                padding: 16,
                marginBottom: 14,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    color: colors.text,
                    fontSize: 17,
                    fontWeight: "bold",
                  }}
                >
                  Order #{order.id}
                </Text>

                <Text
                  style={{
                    color: colors.primary,
                    fontWeight: "bold",
                  }}
                >
                  {order.status}
                </Text>
              </View>

              {order.items.map((item) => (
                <Text
                  key={item.id}
                  style={{
                    color: colors.subText,
                    marginBottom: 4,
                  }}
                >
                  {item.name} × {item.quantity}
                </Text>
              ))}

              <Text
                style={{
                  color: colors.text,
                  fontSize: 17,
                  fontWeight: "bold",
                  marginTop: 8,
                  marginBottom: 12,
                }}
              >
                Total: Rs. {order.total}
              </Text>

              {nextStatus ? (
                <Pressable
                  onPress={() => updateStatus(order.id, nextStatus)}
                  style={{
                    backgroundColor: colors.primary,
                    padding: 13,
                    borderRadius: 9,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Mark as {nextStatus}
                  </Text>
                </Pressable>
              ) : (
                <View
                  style={{
                    backgroundColor: colors.border,
                    padding: 13,
                    borderRadius: 9,
                  }}
                >
                  <Text
                    style={{
                      color: colors.subText,
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Order Delivered ✓
                  </Text>
                </View>
              )}
            </View>
          );
        })
      )}

      {/* RESERVATIONS */}
      <Text
        style={{
          color: colors.text,
          fontSize: 22,
          fontWeight: "bold",
          marginBottom: 12,
        }}
      >
        Reservations
      </Text>

      {reservations.length === 0 ? (
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: 12,
            padding: 20,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Text style={{ color: colors.subText, textAlign: "center" }}>
            No reservations yet.
          </Text>
        </View>
      ) : (
        reservations.map((reservation) => (
          <View
            key={reservation.id}
            style={{
              backgroundColor: colors.card,
              borderRadius: 14,
              padding: 16,
              marginBottom: 14,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                {reservation.customerName}
              </Text>

              <Text
                style={{
                  color: colors.primary,
                  fontWeight: "bold",
                }}
              >
                {reservation.status}
              </Text>
            </View>

            <Text style={{ color: colors.subText, marginBottom: 6 }}>
              📅 {reservation.date}
            </Text>

            <Text style={{ color: colors.subText, marginBottom: 6 }}>
              🕐 {reservation.time}
            </Text>

            <Text style={{ color: colors.subText, marginBottom: 6 }}>
              👥 {reservation.guests} guests
            </Text>

            <Text style={{ color: colors.subText, marginBottom: 14 }}>
              🍽️ {reservation.tableName}
            </Text>

            {reservation.status === "Pending" && (
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                <Pressable
                  onPress={() =>
                    updateReservationStatus(reservation.id, "Confirmed")
                  }
                  style={{
                    flex: 1,
                    backgroundColor: colors.primary,
                    padding: 12,
                    borderRadius: 9,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Confirm
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() =>
                    updateReservationStatus(reservation.id, "Cancelled")
                  }
                  style={{
                    flex: 1,
                    backgroundColor: colors.border,
                    padding: 12,
                    borderRadius: 9,
                  }}
                >
                  <Text
                    style={{
                      color: colors.text,
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Cancel
                  </Text>
                </Pressable>
              </View>
            )}

            {reservation.status === "Confirmed" && (
              <Pressable
                onPress={() =>
                  updateReservationStatus(reservation.id, "Completed")
                }
                style={{
                  backgroundColor: colors.primary,
                  padding: 12,
                  borderRadius: 9,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Mark as Completed
                </Text>
              </Pressable>
            )}

            {reservation.status === "Completed" && (
              <View
                style={{
                  backgroundColor: colors.border,
                  padding: 12,
                  borderRadius: 9,
                }}
              >
                <Text
                  style={{
                    color: colors.subText,
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Reservation Completed ✓
                </Text>
              </View>
            )}

            {reservation.status === "Cancelled" && (
              <View
                style={{
                  backgroundColor: colors.border,
                  padding: 12,
                  borderRadius: 9,
                }}
              >
                <Text
                  style={{
                    color: colors.subText,
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Reservation Cancelled
                </Text>
              </View>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}
