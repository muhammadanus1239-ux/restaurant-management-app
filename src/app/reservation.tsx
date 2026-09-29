import { useReservations } from "@/context/ReservationsContext";
import { tables } from "@/data/tables";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";

export default function ReservationScreen() {
  const { colors } = useAppTheme();
  const { addReservation, isTableAvailable } = useReservations();
  const router = useRouter();

  const [customerName, setCustomerName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2");
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const selectedTableData = tables.find((table) => table.id === selectedTable);

  const handleReservation = async () => {
    if (!customerName.trim()) {
      Alert.alert("Missing Name", "Please enter your name.");
      return;
    }

    if (!date.trim()) {
      Alert.alert("Missing Date", "Please enter a reservation date.");
      return;
    }

    if (!time.trim()) {
      Alert.alert("Missing Time", "Please enter a reservation time.");
      return;
    }

    const guestCount = Number(guests);

    if (!guestCount || guestCount < 1) {
      Alert.alert("Invalid Guests", "Please enter a valid number of guests.");
      return;
    }

    if (!selectedTableData) {
      Alert.alert("Select Table", "Please select a table.");
      return;
    }

    if (guestCount > selectedTableData.seats) {
      Alert.alert(
        "Table Too Small",
        `This table has ${selectedTableData.seats} seats.`,
      );
      return;
    }

    const available = isTableAvailable(
      selectedTableData.id,
      date.trim(),
      time.trim(),
    );

    if (!available) {
      Alert.alert(
        "Table Unavailable",
        `${selectedTableData.name} is already booked for ${date} at ${time}.`,
      );

      setSelectedTable(null);
      return;
    }

    try {
      setLoading(true);

      await addReservation({
        customerName: customerName.trim(),
        date: date.trim(),
        time: time.trim(),
        guests: guestCount,
        tableId: selectedTableData.id,
        tableName: selectedTableData.name,
      });

      Alert.alert(
        "Reservation Confirmed 🎉",
        `Your reservation for ${selectedTableData.name} has been created.`,
        [
          {
            text: "Done",
            onPress: () => router.replace("/menu"),
          },
        ],
      );
    } catch (error) {
      console.log("Reservation Error:", error);

      Alert.alert(
        "Table Unavailable",
        "This table has already been reserved for the selected date and time.",
      );

      setSelectedTable(null);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    backgroundColor: colors.card,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingTop: 58,
        paddingBottom: 45,
      }}
    >
      {/* Header */}
      <View style={{ marginBottom: 28 }}>
        <Text
          style={{
            color: colors.primary,
            fontSize: 14,
            fontWeight: "700",
            letterSpacing: 1,
            marginBottom: 7,
          }}
        >
          RESTAURANT
        </Text>

        <Text
          style={{
            color: colors.text,
            fontSize: 31,
            fontWeight: "800",
          }}
        >
          Reserve a Table
        </Text>

        <Text
          style={{
            color: colors.subText,
            fontSize: 15,
            lineHeight: 22,
            marginTop: 7,
          }}
        >
          Choose your preferred date, time and table for a comfortable dining
          experience.
        </Text>
      </View>

      {/* Booking Details Card */}
      <View
        style={{
          backgroundColor: colors.card,
          borderRadius: 20,
          padding: 18,
          borderWidth: 1,
          borderColor: colors.border,
          marginBottom: 24,
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: 20,
            fontWeight: "800",
            marginBottom: 18,
          }}
        >
          Booking Details
        </Text>

        {/* Name */}
        <Text
          style={{
            color: colors.text,
            fontSize: 14,
            fontWeight: "700",
            marginBottom: 8,
          }}
        >
          Your Name
        </Text>

        <TextInput
          value={customerName}
          onChangeText={setCustomerName}
          placeholder="Enter your name"
          placeholderTextColor={colors.subText}
          style={{
            ...inputStyle,
            marginBottom: 17,
          }}
        />

        {/* Date */}
        <Text
          style={{
            color: colors.text,
            fontSize: 14,
            fontWeight: "700",
            marginBottom: 8,
          }}
        >
          Date
        </Text>

        <TextInput
          value={date}
          onChangeText={(value) => {
            setDate(value);
            setSelectedTable(null);
          }}
          placeholder="e.g. 30 Sep 2026"
          placeholderTextColor={colors.subText}
          style={{
            ...inputStyle,
            marginBottom: 17,
          }}
        />

        {/* Time */}
        <Text
          style={{
            color: colors.text,
            fontSize: 14,
            fontWeight: "700",
            marginBottom: 8,
          }}
        >
          Time
        </Text>

        <TextInput
          value={time}
          onChangeText={(value) => {
            setTime(value);
            setSelectedTable(null);
          }}
          placeholder="e.g. 8:00 PM"
          placeholderTextColor={colors.subText}
          style={{
            ...inputStyle,
            marginBottom: 17,
          }}
        />

        {/* Guests */}
        <Text
          style={{
            color: colors.text,
            fontSize: 14,
            fontWeight: "700",
            marginBottom: 8,
          }}
        >
          Number of Guests
        </Text>

        <TextInput
          value={guests}
          onChangeText={setGuests}
          keyboardType="number-pad"
          placeholder="2"
          placeholderTextColor={colors.subText}
          style={inputStyle}
        />
      </View>

      {/* Table Heading */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 14,
        }}
      >
        <View>
          <Text
            style={{
              color: colors.text,
              fontSize: 21,
              fontWeight: "800",
            }}
          >
            Choose Your Table
          </Text>

          <Text
            style={{
              color: colors.subText,
              marginTop: 4,
              fontSize: 13,
            }}
          >
            Select a table that suits your group.
          </Text>
        </View>
      </View>

      {/* Tables */}
      {tables.map((table) => {
        const selected = selectedTable === table.id;

        const available =
          date.trim() !== "" && time.trim() !== ""
            ? isTableAvailable(table.id, date.trim(), time.trim())
            : true;

        const guestCount = Number(guests);

        const tooSmall = guestCount > 0 && guestCount > table.seats;

        return (
          <Pressable
            key={table.id}
            disabled={!available || tooSmall}
            onPress={() => setSelectedTable(table.id)}
            style={{
              backgroundColor: selected ? colors.primary : colors.card,
              borderWidth: 1.5,
              borderColor: !available
                ? "#D9534F"
                : selected
                  ? colors.primary
                  : colors.border,
              borderRadius: 18,
              padding: 17,
              marginBottom: 12,
              opacity: !available || tooSmall ? 0.5 : 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {/* Table Icon */}
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  backgroundColor: selected
                    ? "rgba(255,255,255,0.18)"
                    : colors.background,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 13,
                }}
              >
                <Text style={{ fontSize: 23 }}>🍽️</Text>
              </View>

              {/* Table Info */}
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: selected ? "#fff" : colors.text,
                    fontSize: 17,
                    fontWeight: "800",
                  }}
                >
                  {table.name}
                </Text>

                <Text
                  style={{
                    color: selected ? "rgba(255,255,255,0.8)" : colors.subText,
                    marginTop: 4,
                    fontSize: 13,
                  }}
                >
                  {table.seats} seats • {table.location}
                </Text>
              </View>

              {/* Status */}
              <View
                style={{
                  backgroundColor: !available
                    ? "rgba(217,83,79,0.12)"
                    : selected
                      ? "rgba(255,255,255,0.18)"
                      : "rgba(40,167,69,0.12)",
                  paddingHorizontal: 9,
                  paddingVertical: 6,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    color: !available
                      ? "#D9534F"
                      : selected
                        ? "#fff"
                        : "#299447",
                    fontSize: 11,
                    fontWeight: "800",
                  }}
                >
                  {!available
                    ? "BOOKED"
                    : tooSmall
                      ? "TOO SMALL"
                      : selected
                        ? "SELECTED"
                        : "AVAILABLE"}
                </Text>
              </View>
            </View>

            {!available && (
              <Text
                style={{
                  color: "#D9534F",
                  fontSize: 12,
                  fontWeight: "700",
                  marginTop: 11,
                  marginLeft: 61,
                }}
              >
                This table is already booked for your selected time.
              </Text>
            )}

            {tooSmall && available && (
              <Text
                style={{
                  color: colors.subText,
                  fontSize: 12,
                  fontWeight: "600",
                  marginTop: 11,
                  marginLeft: 61,
                }}
              >
                This table has only {table.seats} seats.
              </Text>
            )}
          </Pressable>
        );
      })}

      {/* Selected Summary */}
      {selectedTableData && (
        <View
          style={{
            backgroundColor: colors.card,
            borderWidth: 1,
            borderColor: colors.primary,
            borderRadius: 18,
            padding: 16,
            marginTop: 8,
            marginBottom: 18,
          }}
        >
          <Text
            style={{
              color: colors.primary,
              fontSize: 12,
              fontWeight: "800",
              letterSpacing: 0.5,
            }}
          >
            YOUR SELECTION
          </Text>

          <Text
            style={{
              color: colors.text,
              fontSize: 18,
              fontWeight: "800",
              marginTop: 5,
            }}
          >
            {selectedTableData.name}
          </Text>

          <Text
            style={{
              color: colors.subText,
              marginTop: 3,
            }}
          >
            {date} • {time} • {guests} guests
          </Text>
        </View>
      )}

      {/* Confirm */}
      <Pressable
        onPress={handleReservation}
        disabled={loading}
        style={{
          backgroundColor: loading ? colors.border : colors.primary,
          paddingVertical: 16,
          borderRadius: 15,
          marginTop: 5,
          shadowColor: colors.primary,
          shadowOpacity: loading ? 0 : 0.22,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 5 },
          elevation: loading ? 0 : 4,
        }}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontWeight: "800",
            fontSize: 16,
          }}
        >
          {loading ? "Booking Your Table..." : "Confirm Reservation"}
        </Text>
      </Pressable>

      {/* Back */}
      <Pressable
        onPress={() => router.back()}
        style={{
          paddingVertical: 15,
          marginTop: 5,
        }}
      >
        <Text
          style={{
            color: colors.subText,
            textAlign: "center",
            fontWeight: "700",
            fontSize: 14,
          }}
        >
          ← Back to Menu
        </Text>
      </Pressable>
    </ScrollView>
  );
}
