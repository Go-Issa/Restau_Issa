import React from 'react';
import {View, StyleSheet, Text, Image, ScrollView} from 'react-native';
import Inputs from '../components/Input';
import Submit from '../components/Submit';
import Database from '../Database';

const db = new Database();

export default class RegisterScreen extends React.Component{

    state = {
        name:'',
        email: '',
        phone:'',
        password: '',
        confirm:''
    };

    onClickCreate = () =>{
        //alert('created successfully');
        
          let data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone,
          }
          db.addUser(data).then((result) => {
            console.log(result);
            this.setState({
              isLoading: false,
            });
            //this.props.navigation.state.params.onNavigateBack;
            //this.props.navigation.goBack();
            alert('created successfully');
          }).catch((err) => {
            console.log(err);
          })
    }


    render(){
        return(
            <ScrollView style={{backgroundColor:'white'}}>
                <View style={styles.container}>
                    <Image
                        source={require('../images/foodapp.png')}
                        resizeMode="center"
                        style={styles.image}
                    />
                    <Text style={styles.textTitle}>Let's Get Started</Text>
                    <Text style={styles.textBody}>Create an account to get all features</Text>
                    <Inputs name="Full Name" icon="user" 
                            onChange={(text) => this.setState({ name : text})}/>
                    <Inputs name="Email" icon="envelope" 
                            onChange={(text) => this.setState({ email : text})}/>
                    <Inputs name="Phone" icon="phone" 
                            onChange={(text) => this.setState({ phone : text})}/>
                    <Inputs name="Password" icon="lock" pass={true} 
                            onChange={(text) => this.setState({ password : text})}/>
                    <Inputs name="Confirm Password" icon="lock" pass={true} 
                            onChange={(text) => this.setState({ confirm : text})}/>
                    <Submit color="#0251ce" title="CREATE" onClick={()=>this.onClickCreate()} />
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.textBody}>Already have an account?</Text>
                        <Text style={[styles.textBody], {color:'blue'}} 
                              onPress={() => this.props.navigation.navigate('Login')}>
                            Log in</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
} 

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    image:{
        width:400,
        height:150,
        marginVertical:10
    },
    textTitle:{
        fontSize:30,
        fontFamily:'foundation',
        marginVertical:5
    },
    textBody:{
        fontSize:16,
        fontFamily:'foundation'
    }
})