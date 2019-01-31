/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, StatusBar, Animated, FlatList } from 'react-native';
import { Button, Icon, Left, Container, Header, Footer, Body, Right, Input, Item, Label, List, ListItem } from 'native-base';

import styles from './styles';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake for dev menu',
});

type Props = {};

class DynamicListRow extends Component {

  _defaultTransition  = 250;

  constructor (props) {
    super(props);
    this.state = {
      _rowOpacity: new Animated.Value(0)
    };
  }

  componentDidMount() {
      Animated.timing(this.state._rowOpacity, {
          toValue  : 1,
          duration : this._defaultTransition
      }).start()
  }

  render() {
      return (
          <Animated.View
              style={{opacity: this.state._rowOpacity}}>
              {this.props.children}
          </Animated.View>
      );
  }

}

let data = [
  {
    id: 1,
    task: "task1"
  },
  {
    id: 2,
    task: "task2"
  }
]

export default class App extends Component<Props> {

  idCounter;

  constructor (props) {
    super(props);
    this.state = {
      add: false,
      refreshing: false,
      todoValue: ''
    };
    idCounter = data[data.length - 1].id;
  }

  // rotateAnimation() {
  //   return Animated.timing(
  //     this.state.rotate,
  //     {
  //       toValue: 360,
  //       duration: 1000data
  //     }
  //   );
  // }

  addTodo = (task) => {
    this.idCounter += 1;
    data.push({
      id: this.idCounter,
      task: task
    });
    console.warn(data);
    this.toggleAdd();
  }

  toggleAdd = () => {
    this.setState((state, props) => ({add: !state.add}));
    // rotateAnimation().start();
  }

  _renderList( { item } ) {
    return (
      <DynamicListRow>
        <Text>{item.task}</Text>
      </DynamicListRow>
    );
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Icon name='menu' style={{ color: 'white' }}></Icon>
          </Left>
          <Body style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={{ color: 'white', fontWeight: '500', fontSize: 24 }}>Todo</Text>
          </Body>
          <Right></Right>
        </Header>
          {/* Add picture for Todo */}
        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          {this.state.add ? <Left>
            <Item stackedLabel>
              <Label>Task</Label>
              <Input onChangeText={(v) => this.setState({
                todoValue: v
              })} />
            </Item>
          </Left> : null}
          <Right style={{ padding: 10 }}>
            {!this.state.add ?
              <Button rounded primary onPress={this.toggleAdd}>
                <Icon type="MaterialIcons" name="add" style={{fontSize: 18}}></Icon>
              </Button>
              :
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button rounded secondary onPress={() => this.addTodo(this.state.todoValue)}>
                  <Icon name="check" type="AntDesign" style={{fontSize: 18}}></Icon>
                </Button>
                <Button rounded secondary onPress={this.toggleAdd}>
                  <Icon name="close" />
                </Button>
              </View>}
          </Right>
        </View>
        <View>
         <List dataArray={data} renderRow={
           item => 
           <ListItem>
             <Text>{item.task}</Text>
           </ListItem>
         } />
        </View>
        {/*
        <View style={styles.container}>
           <Text style={styles.welcome}>Welcome to React Native!</Text>
          <Text style={styles.instructions}>To get started, edit App.js</Text>
          <Text style={styles.instructions}>{instructions}</Text>
          <View style={{ flexDirection: 'row', display: 'flex' }}>
            <Button
              style={
                {
                  backgroundColor: 'transparent',
                  padding: 15,
                  justifyContent: 'center',
                  borderRadius: Platform.OS === 'android' ? 5 : 0
                }}>
              <Text>Click Me</Text>
            </Button>
          </View> 
        </View>
        */}
        <Footer style={styles.footer}>
        </Footer>
      </Container>
    );
  }
}
