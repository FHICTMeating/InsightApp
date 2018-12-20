import React from "react";
import colors from "../config/colors";
import {
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
  Text,
  View,
  Button
} from "react-native";
import { Notifications } from "expo";
import { parse } from "qs";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      color: null
    };

    this.handleNotification = this.handleNotification.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem("color").then(color => {
      this.setState({
        color: color
      });
    });

    this.notificationSubscription = Notifications.addListener(this.handleNotification);
  }

  handleNotification(notification) {
    const { data } = notification;
    if (data.gameStart) {
      this.props.navigation.navigate('Game');
    }
    console.log('--NOTIFICATION', notification);
  }

  render() {
    const { color } = this.state;

    const backgroundStyle = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: colors[color],
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }
    });

    return (
      <View style={backgroundStyle.container}>
        <View style={backgroundStyle}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.paragraph}>
            Your color is {color} Remember it well, you will need it later.
          </Text>
          <Text style={styles.paragraph}>
            Enjoy your day, you can close the app for now.
          </Text>

          <Button title="Clear" onPress={() => AsyncStorage.clear()}></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centerTextContainer: {
    color: "#d6ecfa",
    display: "flex",
    justifyContent: "center",
    textAlign: "left"
  },
  title: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 38
  },
  paragraph: {
    color: "#ffffff",
    fontSize: 20,
    marginTop: 20,
    maxWidth: "80%"
  }
});
