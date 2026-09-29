import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    setMessage("");

    const loggedUser = login(email.trim(), password);

    if (!loggedUser) {
      setMessage("Wrong email or password");
      return;
    }

    router.replace(loggedUser.role === "manager" ? "/dashboard" : "/menu");
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: "#FFF9F2",
      }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          padding: 24,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo / Restaurant Icon */}
        <View
          style={{
            width: 76,
            height: 76,
            borderRadius: 24,
            backgroundColor: "#B7791F",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            marginBottom: 22,

            shadowColor: "#B7791F",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.25,
            shadowRadius: 8,
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 36 }}>🍽️</Text>
        </View>

        {/* Heading */}
        <Text
          style={{
            fontSize: 30,
            fontWeight: "800",
            color: "#2B2118",
            textAlign: "center",
            letterSpacing: 0.3,
          }}
        >
          Welcome Back
        </Text>

        <Text
          style={{
            fontSize: 15,
            color: "#786F66",
            textAlign: "center",
            marginTop: 7,
            marginBottom: 30,
          }}
        >
          Sign in to continue to your restaurant
        </Text>

        {/* Login Card */}
        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 20,
            padding: 20,

            borderWidth: 1,
            borderColor: "#E8DED1",

            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 4,
          }}
        >
          {/* Email */}
          <Text
            style={{
              color: "#2B2118",
              fontSize: 14,
              fontWeight: "700",
              marginBottom: 8,
            }}
          >
            Email Address
          </Text>

          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="#A69B91"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setMessage("");
            }}
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
            style={{
              backgroundColor: "#FFF9F2",
              borderWidth: 1,
              borderColor: "#E8DED1",
              borderRadius: 12,
              paddingHorizontal: 14,
              paddingVertical: 13,
              color: "#2B2118",
              fontSize: 15,
              marginBottom: 18,
            }}
          />

          {/* Password */}
          <Text
            style={{
              color: "#2B2118",
              fontSize: 14,
              fontWeight: "700",
              marginBottom: 8,
            }}
          >
            Password
          </Text>

          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#A69B91"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setMessage("");
            }}
            secureTextEntry
            style={{
              backgroundColor: "#FFF9F2",
              borderWidth: 1,
              borderColor: "#E8DED1",
              borderRadius: 12,
              paddingHorizontal: 14,
              paddingVertical: 13,
              color: "#2B2118",
              fontSize: 15,
              marginBottom: 20,
            }}
          />

          {/* Error */}
          {message !== "" && (
            <View
              style={{
                backgroundColor: "#FFF0EE",
                borderRadius: 10,
                padding: 11,
                marginBottom: 15,
              }}
            >
              <Text
                style={{
                  color: "#C0392B",
                  textAlign: "center",
                  fontSize: 13,
                  fontWeight: "600",
                }}
              >
                {message}
              </Text>
            </View>
          )}

          {/* Login Button */}
          <Pressable
            onPress={handleLogin}
            style={({ pressed }) => ({
              backgroundColor: "#B7791F",
              paddingVertical: 14,
              borderRadius: 12,

              shadowColor: "#B7791F",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.25,
              shadowRadius: 6,
              elevation: 4,

              opacity: pressed ? 0.8 : 1,
              transform: [
                {
                  scale: pressed ? 0.98 : 1,
                },
              ],
            })}
          >
            <Text
              style={{
                color: "#FFFFFF",
                textAlign: "center",
                fontSize: 16,
                fontWeight: "800",
              }}
            >
              Login
            </Text>
          </Pressable>
        </View>

        {/* Footer */}
        <Text
          style={{
            color: "#786F66",
            textAlign: "center",
            fontSize: 12,
            marginTop: 22,
          }}
        >
          Welcome to our restaurant
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
