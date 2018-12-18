import React from "react";
import colors from "../config/colors";

import {
  StyleSheet,
  AsyncStorage,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button
} from "react-native";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      color: null
    };

    this.navigateBack = this.navigateBack.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem("color").then(color => {
      this.setState({
        color: color
      });
    });
  }

  navigateBack() {
    this.props.navigation.navigate("App");
  }

  render() {
    const { color } = this.state;
    console.log(this.state);

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
          <Text style={styles.title}>Are you ready?</Text>
          <Text style={styles.paragraph}>
            Go to the 2nd floor and find the light with your color: {color}
          </Text>
          <Text style={styles.paragraph}>
            When you have found your light, get ready, and press the button
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.startGameButton} onPress={this.navigateBack}>
            <Image
              style={styles.image}
              source={require("../assets/ic_arrow_forward.png")}
            />
          </TouchableOpacity>

          <Button
            style={styles.stopButton}
            title="stop"
            onPress={this.navigateBack}
          />
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
  },
  buttonContainer: {
    position: "absolute",
    bottom: 15
  },
  startGameButton: {
    borderWidth: 2,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    width: 65,
    height: 65,
    borderRadius: 100
  },
  stopButton: {
    marginTop: 15
  },
  image: {
    height: 40,
    width: 40
  }
});
