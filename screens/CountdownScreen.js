import React from "react";
import colors from "../config/colors";
import * as Progress from 'react-native-progress';
import { Notifications } from "expo";

import {
  StyleSheet,
  AsyncStorage,
  Text,
  View
} from "react-native";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      color: null,
      countdownTime: "02:00",
      countdownProgress: 0
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

    //Start the timer.
    this.countdownTime();
  }

  handleNotification(notification) {
    const { data } = notification;
    if (data.Type === 'sequence game') {
        console.log("Received a squence game message");

        AsyncStorage.setItem('gameId', notification.data.id);
        this.props.navigation.navigate('game');
    }
    console.log('--NOTIFICATION', notification.data.id);
  }

  countdownTime() {
      return new Promise(async () => {
        let startDate = new Date(await this.props.navigation.getParam("timestamp"));
        let dateNow = new Date();

        let totalTime = startDate - dateNow;

        let currentTime = 0;
        let interval =  100;
        
        let intervalTimer = setInterval(() => {
                let remainingTime = startDate - new Date();
                currentTime += interval;

                let timeToGo = remainingTime - currentTime;
                let ms = timeToGo % 60000;

                let minutes = Math.round((timeToGo - ms)/ 60000);
                let seconds = 0;
                if(ms >= 59500){
                    minutes += 1;
                }else{
                    seconds = Math.round(ms / 1000);
                }

                //Calculate percentage
                let percentage = (1 / totalTime) * timeToGo;

                if(timeToGo < 500) {
                    percentage = 0;
                    clearInterval(intervalTimer);
                }

                let minuteString = minutes < 10 ? "0" + minutes : minutes;
                let secondsString = seconds < 10 ? "0" + seconds : seconds;
                this.setState({
                    countdownTime: minuteString + ":" + secondsString,
                    countdownProgress: percentage
                });
        }, interval)
        
      })
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
          {/* <Progress.Circle style={styles.progress} size={250} progress={this.state.countdownProgress} color={"white"} direction={"counter-clockwise"}>
            <Text style={styles.title}>{this.state.countdownTime}</Text>
          </Progress.Circle> */}
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
    fontSize: 38,
    position: 'absolute'
  },
  progress: {
    justifyContent: 'center',
    alignItems:'center',
    lineHeight: 125
  }
});
