import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from "react-native";
import { db } from "../../FireConfig"; // Certifique-se de que está importando o db corretamente
import { collection, query, where, onSnapshot } from "firebase/firestore"

export default function TransactionList() {
    const [transacoes, setTransacoes] = useState([]);

    // Efeito para buscar as transações do Firestore
    useEffect(() => {
        const transactionsRef = collection(db, "transacoes");

        // Usando onSnapshot para escutar mudanças em tempo real
        const unsubscribe = onSnapshot(transactionsRef, (snapshot) => {
            const transacoesData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTransacoes(transacoesData);
        });

        // Limpar a inscrição ao desmontar o componente
        return () => unsubscribe();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.descricao}>{item.descricao}</Text>
                <Text style={[styles.valor, item.tipo === 'receita' ? styles.receita : styles.despesa]}>
                    {item.tipo === 'receita' ? '+' : '-'} R${item.valor}
                </Text>
            </View>
            <Text style={styles.categoria}>{item.categoria}</Text>
        </View>
    )
    return (
        <FlatList
            data={transacoes}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={<Text>
                Lista vazia
            </Text>
            }
        />
    )


}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fefefe',
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 20,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 2,
      borderLeftWidth: 4,
      borderLeftColor: '#3498db',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    descricao: {
      fontSize: 17,
      fontWeight: '600',
      color: '#2c3e50',
      maxWidth: '70%',
    },
    valor: {
      fontSize: 17,
      fontWeight: '500',
    },
    receita: {
      color: '#2ecc71',
    },
    despesa: {
      color: '#e74c3c',
    },
    categoria: {
      marginTop: 6,
      fontSize: 13,
      color: '#95a5a6',
      fontStyle: 'italic',
    },
  });