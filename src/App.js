/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, StatusBar, Animated, FlatList, Dimensions } from 'react-native';
import { Button, Icon, Left, View, Container, Header, Footer, Body, Right, Input, Item, Label, List, ListItem, Card, CardItem, Fab, Content } from 'native-base';
import Dialog from "react-native-dialog";
import styles from './styles';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake for dev menu',
});

const dimesions = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width
};

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

export default class App extends Component<Props> {

  todos = [];

  constructor (props) {
    super(props);
    this.state = {
      isLoading: true,
      isModalVisible: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.todos = [
        {
          id: "1",
          task: "task1"
        },
        {
          id: "2",
          task: "task2"
        }
      ];
      this.setState({
        isLoading: false
      })
    }, 1000);
  }

  toggleAddModal = () => {
    this.setState((state) => ({
      isModalVisible: !state.isModalVisible
    }));
  }

  toggleLoader = async () => {
    return this.setState((state) => ({
      isLoading: !state.isLoading
    }));
  }

  addTodo = async (task) => {
    await this.toggleLoader();
    this.todos.push({
      id: this.todos.length.toString(),
      task
    });
    this.toggleAddModal();
    this.toggleLoader();
  }

  removeTodo = async (index) => {
    await this.toggleLoader();
    this.todos.splice(index, 1);
    this.toggleLoader();
  }

  _renderTodos({todo, index}) {
    return (
      <ListItem>
        <View style={{flex: 1, justifyContent: "space-between", flexDirection: "row"}}>
          <Text style={{color: "black", textAlignVertical: "center"}}>{todo.task}</Text>
          <Button transparent onPress={() => this.removeTodo(index)}>
            <Icon name="close" />
          </Button>
        </View>
      </ListItem>
    )
  }

  consoleStuff = (value) => {
    console.warn(value);
  }

  _renderAddModal() {
    let task = null;
    return (
      <View>
        <Dialog.Container visible={this.state.isModalVisible}>
          <Dialog.Title>
            Add Todo
          </Dialog.Title>
          <Dialog.Description>
            Fill in the field(s) and click add
          </Dialog.Description>
          <Dialog.Input onChangeText={(v) => (task = v)} label="Task"></Dialog.Input>
          <Dialog.Button label="Cancel" onPress={this.toggleAddModal} />
          <Dialog.Button label="Add" onPress={() => (task && this.addTodo(task))} />
        </Dialog.Container>
      </View>
    )
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
          {this._renderAddModal()}
        <Content padder>
          <View>
            {
              this.state.isLoading ? <Text>Loading Data...</Text> : 
              <FlatList data={this.todos} keyExtractor={(item) => item.id} renderItem={
                ({item, index}) => this._renderTodos({todo: item, index})
              } />
            }
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
        </Content>
        <Fab
            active={true}
            direction={"up"}
            position="bottomRight"
            containerStyle={{marginBottom: 25}}
            style={{backgroundColor: "#4646dc"}}
            onPress={() => this.toggleAddModal()}
          ><Icon name="add" /></Fab>
        <Footer style={styles.footer}>
        </Footer>
      </Container>
    );
  }
}
