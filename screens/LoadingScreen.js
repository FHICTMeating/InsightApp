import React from 'react';
import { Permissions, Notifications } from 'expo';
import RegisterEndpoint from '../api/RegisterEndpoint';

import {
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
  Text,
  View,
} from 'react-native';

export default class LoadingScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.registerEndpoint = new RegisterEndpoint();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.centerTextContainer}>
          <Text style={styles.normalText}>INNOVATIONS</Text>
          <Text style={styles.normalText}>INSIGHT</Text>
          <Text style={styles.connectText}>CONNECT</Text>
        </View>

        <ActivityIndicator style={styles.progress} size="large" color="#e6028b" />
      </View>
    );
  }

  async registerForPushNotifications() {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== 'granted') return;
    let token = await Notifications.getExpoPushTokenAsync();
    return Promise.resolve(token)
  }

  async componentDidMount() {
    const userId = await AsyncStorage.getItem('userId');

    if (userId) {
        //Check the session
        this.registerEndpoint.GetDetails(userId).then((result) => {
            console.log(result);
            if(result.status == 204) {
                this.props.navigation.navigate('App');
                return;
            }
        })
        .catch(error => {
            console.log("Le error", error);

            this.registerUser();
        });
    } else {
        this.registerUser();
    }
  }

  async registerUser() {
    const token = await this.registerForPushNotifications();
    console.log('--TOKEN', token);
    this.registerEndpoint.Post({ pushToken: token }).then(async (result) => {
        let parsed = result.data;

        try {
          await AsyncStorage.setItem('color', parsed.data.color);
          await AsyncStorage.setItem('userId', parsed.data._id);
          // console.log(parsed.data.color);
          this.props.navigation.navigate('App');

        } catch (error) {
          // Error saving data
          console.log("Error", error);
        }
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1264',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progress: {
    position: 'absolute',
    bottom: 30
  },
  centerTextContainer: {
    color: '#d6ecfa',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'left'
  },
  normalText: {
    color: '#d6ecfa',
    fontWeight: 'bold',
    fontSize: 38
  },
  connectText: {
    color: '#e6028b',
    fontWeight: 'bold',
    fontSize: 38
  }
});
