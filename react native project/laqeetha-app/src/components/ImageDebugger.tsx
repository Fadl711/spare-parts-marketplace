import React from "react";
import { View, Image, Text, ScrollView } from "react-native";

// Test component to debug image loading
export const ImageDebugger = ({ imageUrl }: { imageUrl: string }) => {
  const [error, setError] = React.useState<string | null>(null);
  const [loaded, setLoaded] = React.useState(false);

  return (
    <View style={{ padding: 10, margin: 10, backgroundColor: "#f0f0f0" }}>
      <Text style={{ fontSize: 10, marginBottom: 5 }}>Testing URL:</Text>
      <Text style={{ fontSize: 8, marginBottom: 10 }} selectable>
        {imageUrl}
      </Text>

      <Image
        source={{ uri: imageUrl }}
        style={{ width: 100, height: 100, backgroundColor: "#ddd" }}
        onLoad={() => {
          console.log("✓ Image loaded successfully:", imageUrl);
          setLoaded(true);
        }}
        onError={(e) => {
          const errorMsg = e.nativeEvent.error || "Unknown error";
          console.error("✗ Image failed to load:", imageUrl, errorMsg);
          setError(errorMsg.toString());
        }}
      />

      {loaded && <Text style={{ color: "green", fontSize: 10 }}>✓ Loaded</Text>}
      {error && (
        <Text style={{ color: "red", fontSize: 10 }}>✗ Error: {error}</Text>
      )}
    </View>
  );
};

// Test different URL formats
export const ImageTestScreen = () => {
  const testUrls = [
    "http://192.168.8.124:8080/images-proxy/parts/01KF407FPW7FY8635QT8YNQPC5.png",
    "https://via.placeholder.com/150", // Should work
    "http://localhost:8080/images-proxy/parts/01KF407FPW7FY8635QT8YNQPC5.png",
  ];

  return (
    <ScrollView>
      <Text style={{ padding: 20, fontSize: 16, fontWeight: "bold" }}>
        Image Loading Test
      </Text>
      {testUrls.map((url, index) => (
        <ImageDebugger key={index} imageUrl={url} />
      ))}
    </ScrollView>
  );
};
