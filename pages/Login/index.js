import React, {useState} from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'
//Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

        const Login = ({navigation}) => {

            const [email, setEmail] = useState('');
            const [senha, setSenha] = useState('');

            const salvarToken = async (value) => {
                try {
                  await AsyncStorage.setItem('@jwt', value)
                } 
                catch (error) {
                    console.log(error);
                }
              }


        const Entrar = () =>{

            fetch("http://192.168.5.85:5000/api/account/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                senha: senha
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.status !== 404) {
                alert("Login Efetuado")
                salvarToken(data.token)
                navigation.push("Autenticado")

            }
            else 
                alert("Email ou senha inválidos!");
        })
        .catch(err => console.log(err));

        }


    return(
        <View style={styles.container}>
            <Text>Login</Text>

        <TextInput
            style = {styles.input}
            onChangeText = {text => setEmail(text)}
            value = {email}
            placeholder="Digite seu Email..."
        />

            <TextInput 
                style={styles.input} 
                value={senha} 
                onChangeText={text=>setSenha(text)} 
                secureTextEntry={true}
                placeholder="Digite sua senha..."
           /> 
            
            <TouchableOpacity
                style={styles.button}
                onPress={Entrar}
            >
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>


        </View>
    )
}

const styles = StyleSheet.create({
       container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input : {
        width : '90%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 6,
        padding: 10
    },
    button : {

        backgroundColor : 'black',
        padding: 10,
        borderRadius: 6,
        width: "90%",
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText : {
        color : 'white'
    }


});

export default Login;