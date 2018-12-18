import React from 'react';
import RegisterEndpoint from '../api/RegisterEndpoint';

import {
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
  Text,
  View,
} from 'react-native';

const content = {
  userGroupNR: "Je zit in groep {3}",
  hText: "Vind je groep en maak samen de stelling af!",
  sText: "Statement |*| van het scherm dat gevuld dient te worden.",
  sWord: "text",
}


export default class StatementScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };



  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headingTextContainer}>
          <Text style={styles.defaultText}>{content.userGroupNR}</Text>
          <Text style={styles.defaultText}>{content.hText}</Text>
        </View>

        <View style={styles.centerTextContainer}>
          <Text style={[styles.defaultText, styles.statementText]}>{content.sText}</Text>

          <Text style={styles.defaultText}>Jou woord is;</Text>
          <Text style={[styles.defaultText, styles.statementText]}>{content.sWord}</Text> 
        </View>
        
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal:50,
    paddingVertical:50,
    //API call voor color van het team
    backgroundColor: '#A42323',
    flex: 1,
  },
  headingTextContainer: {
    alignItems: 'center',
  },
  centerTextContainer: {
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
  }
});



// <View style={styles.centerTextContainer}>
//   /*if leader*/
//   <Text style={[styles.defaultText, styles.statementText]}>{content.sText}</Text>

//   /*else only the word*/
//   <Text style={styles.defaultText}>Jou woord is;</Text>
//   <Text style={[styles.defaultText, styles.statementText]}>{content.sWord}</Text> 
// </View>