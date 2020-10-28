import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';

export default class Submit extends React.Component{
    render(){
        return(
            <TouchableOpacity 
                style={[styles.container, {backgroundColor: this.props.color}]}
                onPress={this.props.onClick}>
                <Text style={styles.submitText}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width:'90%',
        height:50,
        borderColor:'blue',
        borderRadius:10,
        marginVertical:10,
        borderWidth:0
    },
    submitText:{
        fontSize:22,
        fontWeight:'bold',
        color:'white',
        alignSelf:'center',
        marginVertical:10
    }
})