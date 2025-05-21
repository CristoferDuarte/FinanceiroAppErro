import { AntDesign } from "@expo/vector-icons";
import React, { cloneElement, use, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from "react-native";
import {LineChart} from "react-native-chart-kit";
import TransactionList from "./TransactionList";
import { collection, onSnapshot, getDocs, doc } from "firebase/firestore";
import {db} from "../../FireConfig";

const HomeScreen = ({ navigation }) => {
  const [balance, setBalance] = useState([]);
  const [transacoes, setTransations] = useState([]);
  const [receitas, setReceitas] = useState([]);
  const [despesas, setDespesas] = useState([]);
  useEffect(()=>{
    const fetchTransacoes = async()=>{
      try {
        const transacoesRef = collection(db,"transacoes")
        const querySnapshot = await getDocs(transacoesRef)
        const transacoesList = querySnapshot.docs.map(doc => doc.data())
        setTransations(transacoesList)
  
        const receitasTemp = []
        const despesasTemp = []
        transacoesList.forEach((transacao)=>{
          const dataStr = transacao.data.toDate().toLocaleString("pt-BR",{year:"numeric",month:"long"})
          if (transacao.tipo === "receita"){
            receitasTemp.push(transacao.valor)
          }
          else {
            despesasTemp.push(transacao.valor)
          }
        })
        setReceitas(receitasTemp)
        setDespesas(despesasTemp)
        const newBalance = balance + receitasTemp.reduce((a,b)=>a+b,0) - despesasTemp.reduce((a,b)=>a+b,0)
        setBalance(newBalance)
      }
      catch (error){
        console.log(error)
      }
    }
    fetchTransacoes()
  },[])

  return (
    <View style={styles.container}>
      {/* Saldo Total */}
      <Text style={styles.balanceText}>Saldo Total: R${balance}</Text>
      {/* Grafico */}
      <LineChart
       data= {{
        labels:["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],
        datasets:[
          {
            data: receitas,
            color: (opacity = 1)=> `rgba (63, 59, 61, ${opacity})`,
            strokeWidth: 2,         
          },
          {
            data: despesas,
            color: (opacity = 1)=> `rgba (100, 59, 61, ${opacity})`,
            strokeWidth: 2,
          }

        ]
       }}
       width = {Dimensions.get("window").width-20}
       height = {200}
       yAxisLabel = "R$"
       chartConfig={{
        backgroundGradientFrom:"#fff",
        backgroundGradientTo:"#fff",
        decimalPlaces:2,
        color: (opacity = 1) => `rgba(63, 59, 61, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(20, 60, 61, ${opacity})`,
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#FFF"
        }
       }}
       style = {styles.chart}
      />



      {/* Lista de transações com FlatList */}
      <TransactionList  transacoes={transacoes}/> 



      <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Transações")}>
          <AntDesign name="plus" size={50} color={"black"}/>
       </TouchableOpacity>
    </View>
  );
};
    
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  balanceText: {
    textAlign: "center",
    fontSize: 19,
    marginBottom: 0,
    fontWeight: "bold"
  },
  transactionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  transactionText: {
    fontSize: 16,
  },
  category: {
    fontWeight: "bold",
  },
  income: {
    color: "green",
  },
  expense: {
    color: "red",
  },
  chart: {
    borderRadius:15,
    marginVertical:20,
  },
  button: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#808080",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  }
});

export default HomeScreen;