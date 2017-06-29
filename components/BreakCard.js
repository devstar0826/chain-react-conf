import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { withNavigation } from 'react-navigation';

import Fonts from '../constants/Fonts';
import Images from '../constants/Images';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';

@withNavigation
export default class BreakCard extends React.PureComponent {
  render() {
    const { details } = this.props;
    const containerStyles = [styles.container];

    return (
      <TouchableWithoutFeedback onPress={this._handlePressCard}>
        <View style={containerStyles}>
          <Image
            source={Images[`${details.type}Break`]}
            style={[styles.background, { width: null, height: null }]}
          />
          <View style={styles.contentContainer}>
            <View style={styles.content}>
              <Text style={styles.heading}>
                {details.title}
              </Text>
              <Text style={styles.duration}>
                {details.timeframe}
              </Text>
            </View>
            {this._renderSponsor()}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _handlePressCard = () => {
    this.props.navigation.navigate('BreakDetail', {
      details: this.props.details,
    });
  };

  _renderSponsor() {
    const { details } = this.props;

    if (details.type === 'coffee') {
      return (
        <View style={styles.sponsor}>
          <Image source={Images.sponsor} />
          <Text style={styles.sponsorText}>by Qlik Playground</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Layout.baseMargin,
    marginHorizontal: Layout.doubleBaseMargin,
    height: Layout.breakHeight,
    borderRadius: 5,
  },
  currentDay: {
    marginLeft: 16,
    marginRight: 24,
  },
  active: {
    marginLeft: 6,
    marginRight: 34,
    borderRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 5,
    shadowColor: Colors.redShadow,
    shadowOpacity: 1,
  },
  background: {
    resizeMode: 'cover',
    borderRadius: 5,
    backgroundColor: Colors.snow,
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sponsor: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  sponsorText: {
    marginTop: 4,
    fontFamily: Fonts.type.base,
    fontSize: 11,
    letterSpacing: 0,
    backgroundColor: Colors.transparent,
    color: Colors.snow,
  },
  content: {
    justifyContent: 'center',
    marginLeft: 15,
  },
  heading: {
    fontFamily: Fonts.type.semiBold,
    fontSize: 18,
    letterSpacing: -0.2,
    lineHeight: 27,
    backgroundColor: Colors.transparent,
    color: Colors.snow,
  },
  duration: {
    fontFamily: Fonts.type.semiBold,
    fontSize: 16,
    letterSpacing: -0.19,
    backgroundColor: Colors.transparent,
    color: Colors.snow,
  },
});
