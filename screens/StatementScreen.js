import React from 'react';
import colors from '../config/colors';
import RegisterEndpoint from '../api/RegisterEndpoint';

import {
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';


export default class StatementScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.state = {
      color: null,
      newStatementText: null,
      verifyStatement: null,
      titleText: "Find your group and complete the statement",
      statementText: "{API Statement/Word request}",
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('color').then(color => {
      this.setState({
        color: color
      });
    });


    //Get statement
    // var newText = null //API call to receive Statement text
    // this.setState({ statementText : newText})
  }

  verifyStatement = () => {
    // console.log(this.state.newStatementText)
    
    // change 'verifyStatementText' to true if newStatementText is equal to the (official) statementText
    
    this.setState({ statementText: this.state.newStatementText});
    const verifyStatementText = false;
    // if(this.state.verifyStatementText == false )
    //   return <Text>data</Text>;
    // return null;
  }


  render() {
    const {color} = this.state;
    // console.log(this.state);

    const backgroundStyle = StyleSheet.create({
      container: {
        flex: 1,
        paddingHorizontal: 36,
        paddingVertical: 50,
        // backgroundColor: colors[color],
        backgroundColor: 'red',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }
    });

const retryStatement = <Text> The statement is incorrect, please retry. </Text>;


    return (
      <View style={backgroundStyle.container}>

        <View style={styles.title}>
          <Text style={styles.defaultText}>You are in group {color}</Text>
          <Text style={styles.defaultText}>{this.state.titleText}</Text>
        </View>

        <View style={styles.paragraph}>
          <Text style={[styles.defaultText, styles.statementText]}>{this.state.statementText}</Text>


            {retryStatement} 

          

          <TextInput placeholder='Type the complete statement here' 
          style={styles.inputText} 
          onChangeText={(text) => this.setState({ newStatementText: text })}
          />

          <Button title='Check' onPress={this.verifyStatement} />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    alignItems: 'center',
  },
  paragraph: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  statementText: {
    fontSize: 35,
  },
  inputText: {
    alignSelf: 'stretch',
    height: 200,
    borderWidth: 1,
    padding: 16,
    margin: 50
  }
});

