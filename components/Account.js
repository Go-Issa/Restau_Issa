import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Account extends React.Component{
    render(){
        return(
            <TouchableOpacity style={[styles.container, {backgroundColor:this.props.color}]}>
                <Icon style={styles.accIcon} name={this.props.icon}/>
                <Text style={styles.textTitle}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        width:135,
        height:45,
        marginHorizontal:10,
        marginVertical:10,
        borderRadius:5
    },
    accIcon:{
        color:'white',
        fontSize:20,
        marginVertical:10,
        marginHorizontal:10
    },
    textTitle:{
        color:'white',
        fontWeight:'bold',
        fontSize:18,
        marginVertical:10,
        marginHorizontal:5
    }
})