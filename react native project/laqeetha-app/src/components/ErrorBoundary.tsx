import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.log("ErrorBoundary caught an error:", error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: undefined });
    };

    render() {
        if (this.state.hasError) {
            return (
                <SafeAreaView style={styles.container}>
                    <View style={styles.content}>
                        <Ionicons
                            name="alert-circle-outline"
                            size={80}
                            color="#EF4444"
                        />
                        <Text style={styles.title}>
                            عذراً، حدث خطأ غير متوقع
                        </Text>
                        <Text style={styles.subtitle}>
                            نعتذر عن ذلك، يرجى محاولة إعادة المحاولة أو إعادة
                            تشغيل التطبيق.
                        </Text>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.handleRetry}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.buttonText}>
                                إعادة المحاولة
                            </Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            );
        }

        return this.props.children;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        justifyContent: "center",
    },
    content: {
        alignItems: "center",
        padding: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1F2937",
        marginTop: 16,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#6B7280",
        marginTop: 8,
        marginBottom: 32,
        textAlign: "center",
        lineHeight: 24,
    },
    button: {
        backgroundColor: "#2563EB",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 12,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});
