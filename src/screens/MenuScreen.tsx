import CategoryChip from "@/components/CategoryChip";
import MenuItemCard from "@/components/MenuItemCard";
import SearchBar from "@/components/SearchBar";
import { categories, menuItems } from "@/data/menu";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function MenuScreen() {
  const { colors, toggleTheme } = useAppTheme();
  const { addItem, totalItems } = useCart();
  const { logout } = useAuth();
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  const filteredItems = menuItems.filter((item) => {
    const matchCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    const matchSearch = item.name
      .toLowerCase()
      .includes(debouncedSearch.trim().toLowerCase());

    return matchCategory && matchSearch;
  });

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            setLoggingOut(true);
            await logout();
            router.replace("/login");
          } catch (error) {
            console.log("Logout Error:", error);
            setLoggingOut(false);
            Alert.alert("Logout Error", "Could not logout. Please try again.");
          }
        },
      },
    ]);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: 18,
          paddingTop: 58,
          paddingBottom: 35,
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Header */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 22,
              }}
            >
              <View>
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: 13,
                    fontWeight: "700",
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    marginBottom: 5,
                  }}
                >
                  Welcome
                </Text>

                <Text
                  style={{
                    color: colors.text,
                    fontSize: 30,
                    fontWeight: "800",
                  }}
                >
                  Our Menu
                </Text>
              </View>

              {/* Cart */}
              <Pressable
                onPress={() => router.push("/cart")}
                style={({ pressed }) => ({
                  backgroundColor: colors.card,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 16,
                  paddingHorizontal: 15,
                  paddingVertical: 11,
                  opacity: pressed ? 0.75 : 1,
                })}
              >
                <Text
                  style={{
                    color: colors.text,
                    fontSize: 14,
                    fontWeight: "700",
                  }}
                >
                  🛒 Cart
                </Text>

                <Text
                  style={{
                    color: colors.primary,
                    fontSize: 12,
                    fontWeight: "800",
                    textAlign: "center",
                    marginTop: 2,
                  }}
                >
                  {totalItems} items
                </Text>
              </Pressable>
            </View>

            {/* Restaurant Banner */}
            <View
              style={{
                backgroundColor: colors.primary,
                borderRadius: 20,
                padding: 20,
                marginBottom: 18,
                overflow: "hidden",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 22,
                  fontWeight: "800",
                  marginBottom: 6,
                }}
              >
                Good food, good mood 🍽️
              </Text>

              <Text
                style={{
                  color: "rgba(255,255,255,0.88)",
                  fontSize: 14,
                  lineHeight: 20,
                  marginBottom: 15,
                }}
              >
                Explore our delicious dishes and reserve your table today.
              </Text>

              <Pressable
                onPress={() => router.push("/reservation")}
                style={({ pressed }) => ({
                  alignSelf: "flex-start",
                  backgroundColor: "#fff",
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 12,
                  opacity: pressed ? 0.8 : 1,
                })}
              >
                <Text
                  style={{
                    color: colors.primary,
                    fontWeight: "800",
                    fontSize: 14,
                  }}
                >
                  Reserve a Table
                </Text>
              </Pressable>
            </View>

            {/* Search */}
            <View style={{ marginBottom: 15 }}>
              <SearchBar value={search} onChangeText={setSearch} />
            </View>

            {/* Categories */}
            <Text
              style={{
                color: colors.text,
                fontSize: 18,
                fontWeight: "800",
                marginBottom: 10,
              }}
            >
              Categories
            </Text>

            <View style={{ marginBottom: 18 }}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingRight: 10,
                }}
              >
                {categories.map((cat) => (
                  <CategoryChip
                    key={cat}
                    label={cat}
                    selected={cat === selectedCategory}
                    onPress={() => setSelectedCategory(cat)}
                  />
                ))}
              </ScrollView>
            </View>

            {/* Section title */}
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
                  fontSize: 20,
                  fontWeight: "800",
                }}
              >
                Popular Dishes
              </Text>

              <Text
                style={{
                  color: colors.subText,
                  fontSize: 13,
                }}
              >
                {filteredItems.length} items
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={{ marginBottom: 12 }}>
            <MenuItemCard
              name={item.name}
              description={item.description}
              price={item.price}
              onAdd={() =>
                addItem({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                })
              }
            />
          </View>
        )}
        ListEmptyComponent={
          <View
            style={{
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 18,
              padding: 30,
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 35, marginBottom: 10 }}>🍽️</Text>

            <Text
              style={{
                color: colors.text,
                fontSize: 17,
                fontWeight: "800",
                marginBottom: 5,
              }}
            >
              No dishes found
            </Text>

            <Text
              style={{
                color: colors.subText,
                textAlign: "center",
              }}
            >
              Try another search or category.
            </Text>
          </View>
        }
      />

      {/* Bottom actions */}
      <View
        style={{
          position: "absolute",
          right: 18,
          bottom: 20,
          flexDirection: "row",
          gap: 10,
        }}
      >
        {/* Theme */}
        <Pressable
          onPress={toggleTheme}
          style={({ pressed }) => ({
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: colors.card,
            borderWidth: 1,
            borderColor: colors.border,
            justifyContent: "center",
            alignItems: "center",
            opacity: pressed ? 0.75 : 1,
          })}
        >
          <Text style={{ fontSize: 19 }}>☀️</Text>
        </Pressable>

        {/* Logout */}
        <Pressable
          onPress={handleLogout}
          disabled={loggingOut}
          style={({ pressed }) => ({
            height: 48,
            paddingHorizontal: 17,
            borderRadius: 24,
            backgroundColor: colors.card,
            borderWidth: 1,
            borderColor: colors.border,
            justifyContent: "center",
            opacity: pressed || loggingOut ? 0.65 : 1,
          })}
        >
          <Text
            style={{
              color: colors.text,
              fontWeight: "800",
              fontSize: 13,
            }}
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
