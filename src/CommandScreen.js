import React, { Component } from 'react';
import { StyleSheet, FlatList, ActivityIndicator, View, Text } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import Database from '../Database';

const db = new Database();

export default class CommandScreen extends Component{
    constructor() {
        super();
        this.state = {
          isLoading: true,
          commands: [],
          notFound: 'Command not found.\nPlease click (+) button to add it.'
        };
    }

    componentDidMount() {
        this.getCommands();
    }

    getCommands() {
        let commands = [];
        db.listCommand().then((data) => {
          commands = data;
          this.setState({
            commands,
            isLoading: false,
          });
        }).catch((err) => {
          console.log(err);
          this.setState = {
            isLoading: false
          }
        })
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
        <ListItem
          title={item.comName}
          leftAvatar={{
            title: item.comName[0]
          }}
          chevron
          bottomDivider
        />
    )

    render() {
        if(this.state.isLoading){
          return(
            <View style={styles.activity}>
              <ActivityIndicator size="large" color="#0000ff"/>
            </View>
          )
        }
        if(this.state.commands.length === 0){
          return(
            <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.message}>{this.state.notFound}</Text>
            </View>
          )
        }
        return (
            <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>
              
              <ScrollView>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.commands}
                        renderItem={this.renderItem}
                    />
                </ScrollView>
              
            </View>
          
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingBottom: 22
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    activity: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    message: {
      padding: 16,
      fontSize: 18,
      color: 'red'
    }
  });