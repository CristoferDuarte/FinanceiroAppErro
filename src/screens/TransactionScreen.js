import React, { use, useState } from "react";
import {  View, Text, StyleSheet, TouchableOpacity, TextInput,} from "react-native";
import { Picker } from "@react-native-picker/picker";
import {db} from "../../FireConfig";
import { collection, addDoc } from "firebase/firestore";

export default function Transaction() {
  const [tipo, setTipo] = useState("receita");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const categorias = ["Salário", "Alimentação", "Transporte", "Lazer","Viagem", "Outros"];
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const salvarTransacao = async ()=> {
    if (!descricao || !valor || !categoriaSelecionada ){
      alert("preencha todos os campos")
      return
    }
    try {
      const valorFloat = parseFloat(valor)
      await addDoc(collection(db,"transacoes"),{
        descricao,
        valor: valorFloat,  
        tipo,
        categoria: categoriaSelecionada,
        data: new Date()
      })  
      if (tipo === "receita"){ 
        setBalance(prevBalance => prevBalance + valorFloat)
      }
      else {
        setBalance(prevBalance => prevBalance - valorFloat)
      }
      alert("transação salva com sucesso!")
      setDescricao("");
      setValor("");
      setCategoriaSelecionada("");
      setTipo("receita")
    }
    catch (error){
      console.log(error)
      alert("erro ao salvar transação!")
    }
  }


  return (
    <View>
      <Text style={styles.descricao}>Descrição</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={(text) => setDescricao(text)}
        placeholder="EX:Compras"
      />   

      <Text style={styles.valor}>Valor(R$)</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={(text) => setValor(text)}
        placeholder="EX:R$20.00"
        keyboardType="numeric"
      />

      <Text style={styles.valor}>Tipo</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.botao1,
            tipo === "receita" && styles.botaoSelecionado,
          ]}
          onPress={() => setTipo("receita")}
        >
          <Text style={styles.textType}>Receita</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.botao1,
            tipo === "despesa" && styles.botaoSelecionado,
          ]}
          onPress={() => setTipo("despesa")}
        >
          <Text style={styles.textType}>Despesa</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.valor}>Categoria</Text>
      <Picker
        style={styles.picker}
        selectedValue={categoriaSelecionada}
        onValueChange={(itemValue, itemIndex) =>
          setCategoriaSelecionada(itemValue)
        }
      >
        <Picker.Item label="Selecione uma categoria" value="" />
        {categorias.map((cat, index) => (
          <Picker.Item key={index} label={cat} value={cat} />
        ))}
      </Picker>
      <TouchableOpacity style= {[styles.botaoSalvar]} onPress={salvarTransacao} >
          <Text style={styles.salvarText}>
            Salvar Transação
          </Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  descricao: {
    paddingLeft: 20,
    paddingTop: 10,
    fontWeight: "bold",
  },
  valor: {
    paddingLeft: 20,
    paddingTop: 10,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  botao1: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#A9A9A9",
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  textType: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  botaoSelecionado: {
    backgroundColor: "green",
  },
  picker: {
    flex: 1,
    alignItems: "center",
    padding: 15,
    borderRadius: 30,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "black",
    fontSize: 15,  
  },
  botaoSalvar: {
    alignItems: "center",
    backgroundColor: "#0000CD",
    padding: 20,
    borderRadius: 20,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "black",
    margin: 40,
  },
  salvarText: {
    fontSize:20,
    fontWeight: "bold",
    color:"white"
  }
  

});
