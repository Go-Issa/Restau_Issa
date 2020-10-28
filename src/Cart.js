import React, { Component } from 'react';
import { Text, View, TextInput, Button, ActivityIndicator, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
var { width } = Dimensions.get("window")
// import icons
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modalbox';
import images from "../components/Image";

import Database from '../Database';

const db = new Database();

export default class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
          dataCart:[],
          isOpen: false,
          isDisabled: false,
          swipeToClose: true,
          sliderValue: 0.3,
          name: "",
          tableNumer: "",
          isLoading: false,
        };
    }

    componentDidMount()
    {
      AsyncStorage.getItem('cart').then((cart)=>{
        if (cart !== null) {
          // We have data!!
          const cartfood = JSON.parse(cart)
          this.setState({dataCart:cartfood})
        }
      })
      .catch((err)=>{
        alert(err)
      })
    }

    changeNameHandler = (text) =>
    {
        this.setState({ name: text });
    };
    changeTableNumerHandler = (text) =>
    {
        this.setState({ tableNumer: text });
    };


    onChangeQual(i,type)
  {
    const dataCar = this.state.dataCart
    let cantd = dataCar[i].quantity;

    if (type) {
     cantd = cantd + 1
     dataCar[i].quantity = cantd
     this.setState({dataCart:dataCar})
    }
    else if (type==false&&cantd>=2){
     cantd = cantd - 1
     dataCar[i].quantity = cantd
     this.setState({dataCart:dataCar})
    }
    else if (type==false&&cantd==1){
     dataCar.splice(i,1)
     AsyncStorage.setItem('cart',JSON.stringify(dataCar));
     this.setState({dataCart:dataCar})
    } 
  }

  /*async onPressSendButton()
  {
    
    //alert(this.state.name);
  }*/

  /*saveCommand() {
    this.setState({
      isLoading: true,
    });

    var total = 0;

    this.state.dataCart.map((item,i)=>{
        total += item.price*item.quantity;
    })

    let command = {
      comName: this.state.name,
      comTable : this.state.tableNumer,
      comTotal: total,
      comDate: new Date(),
    }
    db.addCommand(command).then((result) => {
      console.log(result);
      this.state.dataCart.map((item,i)=>{
        let product = {
          comId:result.comId,
          prodName: item.name,
          prodPrice : item.price,
          prodQte: item.quantity,
          prodImage: item.food.image,
        }
        db.addProduct(command).then((result) => {
          console.log(result);
          this.setState({
            isLoading: false,
          });
        }).catch((err) => {
          console.log(err);
          this.setState({
            isLoading: false,
          });
        })
      })
      
    }).catch((err) => {
      console.log(err);
      this.setState({
        isLoading: false,
      });
    })

    AsyncStorage.removeItem('cart');
  }*/
    render() {
        return (
          <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>
             <View style={{height:20}} />
             <Text style={{fontSize:32,fontWeight:"bold",color:"#33c37d"}}>Cart food</Text>
             <View style={{height:10}} />
    
             <View style={{flex:1}}>
    
               <ScrollView>
    
                 {
                   this.state.dataCart.map((item,i)=>{
                     return(
                       <View key={i} style={{width:width-20,margin:10,backgroundColor:'transparent', flexDirection:'row', borderBottomWidth:2, borderColor:"#cccccc", paddingBottom:10}}>
                         <Image resizeMode={"contain"} style={{width:width/3,height:width/3}} source={images[item.food.image]} />
                         <View style={{flex:1, backgroundColor:'trangraysparent', padding:10, justifyContent:"space-between"}}>
                           <View>
                             <Text style={{fontWeight:"bold", fontSize:20}}>{item.food.name}</Text>
                             <Text>Lorem Ipsum de food</Text>
                           </View>
                           <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                             <Text style={{fontWeight:'bold',color:"#33c37d",fontSize:20}}>${item.price*item.quantity}</Text>
                             <View style={{flexDirection:'row', alignItems:'center'}}>
                               <TouchableOpacity onPress={()=>this.onChangeQual(i,false)}>
                                 <Icon name="ios-remove-circle" size={35} color={"#33c37d"} />
                               </TouchableOpacity>
                               <Text style={{paddingHorizontal:8, fontWeight:'bold', fontSize:18}}>{item.quantity}</Text>
                               <TouchableOpacity onPress={()=>this.onChangeQual(i,true)}>
                                 <Icon name="ios-add-circle" size={35} color={"#33c37d"} />
                               </TouchableOpacity>
                             </View>
                           </View>
                         </View>
                       </View>
                     )
                   })
                 }
    
                 <View style={{height:20}} />
    
                 <TouchableOpacity 
                    onPress={() => this.refs.modal3.open()}
                    style={{
                     backgroundColor:"#33c37d",
                     width:width-40,
                     alignItems:'center',
                     padding:10,
                     borderRadius:5,
                     margin:20,
                   }}
                   >
                   <Text style={{
                       fontSize:24,
                       fontWeight:"bold",
                       color:'white'
                     }}>
                     CHECKOUT
                   </Text>
                 </TouchableOpacity>
    
                 <View style={{height:20}} />
               </ScrollView>
    
             </View>


             <Modal style={styles.modal3} 
                    position={"center"} ref={"modal3"} 
                    isDisabled={this.state.isDisabled}
                    backdropPressToClose={false}
                    swipeToClose={false}>
                <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                        <View style={{ alignItems: "flex-start" }}>
                        </View>
                        <View style={{ alignItems: "flex-end" }}>
                            <TouchableOpacity onPress={() => this.refs.modal3.close()} style={{
                                marginLeft: 0, marginTop: 0,
                            }}>
                                <Image resizeMode="contain" 
                                style={{ width: 15, height: 15, marginRight: 17, marginTop: 15 }} 
                                source={require('../images/close.png')}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                </View>
                
                <View style={styles.container}>
                
                <View style={[styles.TextInputView, { marginBottom: 10 }]}>
                    <Icon name="md-person" size={30} color="#000000" style={styles.InputIcon}/>
                    <TextInput style={styles.TextInput}
                        //keyboardType="numeric"
                        placeholder="Nom du client"
                        placeholderTextColor="#000000"
                        underlineColorAndroid="transparent"
                        returnKeyType="next" autoCorrect={false}
                        onChangeText={this.changeNameHandler}
                        //value={this.state.userName}
                        //onSubmitEditing={() => this.refs.txtPassword.focus()}
                    />
                </View>
                <View style={styles.TextInputView}>
                    <Icon name="md-cart" size={30} color="#000000" style={styles.InputIcon}/>
                    <TextInput style={styles.TextInput}
                        placeholder="Numéro de table"
                        keyboardType="numeric"
                        placeholderTextColor="#000000"
                        underlineColorAndroid="transparent"
                        onChangeText={this.changeTableNumerHandler}
                        //returnKeyType="go" secureTextEntry autoCorrect={false}
                    />
                </View>

                <TouchableOpacity style={styles.LoginButton}
                          onPress={() => this.saveCommand()}>
                    <View style={{ alignItems: 'flex-start', flexDirection: 'row' }}>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.TextStyle}>
                            SEND
                    </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end', marginRight: 10, }}>
                      <Icon name="md-send" size={20} color="#ffffff"/>
                    </View>
                </TouchableOpacity>

            </View>

















            </Modal>
    
          </View>
        );
      } 
}

const styles = StyleSheet.create({

  wrapper: {
    paddingTop: 50,
    flex: 1
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  modal2: {
    height: 230,
    backgroundColor: "#3B5998"
  },

  modal3: {
    height: 350,
    width: "90%",
    borderRadius: 20,
    backgroundColor: '#EBEBEB',
  },

  modal4: {
    height: 300
  },

  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  },

  btnModal: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  },

  text: {
    color: "black",
    fontSize: 22
  },
  //
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

},
TextInputView: {
    width: (width * 80) / 100,
    height: 45,
    backgroundColor: '#B8B2B2',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center'
},
InputIcon: {
    justifyContent: "flex-start",
    marginHorizontal: 10,
    color:'#000000'
},
TextInput: {
    flex: 1,
    color: "#3D6AA5",
    paddingRight: 3,
},
LoginButton: {
    backgroundColor: '#33c37d',
    borderRadius: 5,
    height: 45,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: (width * 80) / 100,
},
TextStyle: {
    fontSize: 24,
    fontFamily: "Montserrat_Bold",
    color: "#ffffff"
},

});