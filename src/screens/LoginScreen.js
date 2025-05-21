import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert,} from "react-native";
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword,} from "../../FireConfig";
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();

  const handleAuth = async () => {
    if (isRegistering) {
      if (password !== confirmPassword) {
        Alert.alert("Erro", "As senhas não coincidem.");
        return;
      }
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert("Sucesso", "Conta criada com sucesso!");
        navigation.navigate("Home"); // redireciona após registro
      } catch (error) {
        Alert.alert("Erro", error.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert("Bem-vindo", "Login realizado com sucesso!");
        navigation.navigate("Home"); // redireciona após login
      } catch (error) {
        Alert.alert("Erro", error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.descricao}>
        {isRegistering ? "Criar Conta" : "Login"}
      </Text>

      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        placeholder="E-mail"
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        placeholder="Senha"
        secureTextEntry
        value={password}
      />

{isRegistering && (
        <TextInput
          style={styles.input}
          onChangeText={setConfirmPassword}
          placeholder="Confirmar Senha"
          secureTextEntry
          value={confirmPassword}
        />
      )}

      <TouchableOpacity style={styles.botao} onPress={handleAuth}>
        <Text style={styles.textoBotao}>
          {isRegistering ? "Registrar" : "Entrar"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
        <Text style={styles.alternarTexto}>
          {isRegistering
            ? "Já tem uma conta? Entrar"
            : "Não tem uma conta? Criar conta"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  descricao: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 30,
    alignSelf: "center",
    color: "#333",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    marginBottom: 20,
    borderRadius: 10,
    fontSize: 16,
    color: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  botao: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  alternarTexto: {
    marginTop: 20,
    color: "#007AFF",
    textAlign: "center",
    fontSize: 14,
  },
});
