import React from 'react';
import {View, StyleSheet, Text, Image, ScrollView} from 'react-native';
import Account from '../components/Account';

import Inputs from '../components/Input';
import Submit from '../components/Submit';
import Database from '../Database';

const db = new Database();

export default class LoginScreen extends React.Component{

    state = {
        email: '',
        password: '',
    };

    onClickSubmit = () => {
        var emailValue = this.state.email;
        var passwordValue = this.state.password;

        db.userByEmail(emailValue).then((data) => {
            console.log(data);
            //user = data;
            if(data.password == passwordValue){
                this.props.navigation.navigate('Home');
            }else{
                alert("Mot de passe incorrect");
            }
        }).catch((err) => {
            console.log(err);
            alert("Identifiant incorrect !");
        })

        //alert("Email : " + emailValue + " Password : "+ passwordValue);
        //this.props.navigation.navigate('Home');
    }

    render(){
        return(
            <ScrollView style={{backgroundColor:'white'}}>
                <View style={styles.container}>
                    <Image 
                        source={require('../images/foodapp.png')} 
                        resizeMode="center" 
                        style={styles.image}/>
                    <Text style={styles.textTitle}>Welcome To FoodApp</Text>
                    <Text style={styles.textBody}>Log in to your existant account</Text>
                    <View style={{marginTop:20}} />
                    <Inputs name="Email" icon="user" 
                        onChange={(text) => this.setState({ email : text})}/>
                    <Inputs name="Password" icon="lock" pass={true} 
                        onChange={(text) => this.setState({ password : text })}/>
                    <View style={{width:'90%'}}>
                        <Text style={[styles.textBody, {alignSelf:'flex-end'}]}>
                            Forgot Password ?</Text>
                    </View>
                    <Submit title="LOG IN" color="#0148a4" onClick={()=>this.onClickSubmit()}/>
                    <Text style={styles.textBody}>Or connect using</Text>
                    <View style={{flexDirection:'row'}}>
                        <Account color="#3b5c8f" icon="facebook" title="Facebook"/>
                        <Account color="#ec482f" icon="google" title="Google" />
                    </View>
                    <View style={{flexDirection:'row', marginVertical:5}}>
                        <Text style={styles.textBody}>Don't have an account ?</Text>
                        <Text style={[styles.textBody, {color:'blue'}]} 
                                onPress={()=>this.props.navigation.navigate('Register')}>
                                    Sign Up</Text>
                    </View>
                </View>
            </ScrollView>
            
        )
    }
} 

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    image:{
        width:400,
        height:150,
        marginVertical:10
    },
    textTitle:{
        fontFamily:'foundation',
        fontSize:30,
        marginVertical:10,
    },
    textBody:{
        fontFamily:'foundation',
        fontSize:16
    }
})