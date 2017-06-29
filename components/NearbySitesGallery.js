import React from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
  LayoutAnimation,
} from 'react-native';
import Touchable from 'react-native-platform-touchable';

import { Colors, Fonts, Images, Layout } from '../constants';
import openExternalMapApp from '../utilities/openExternalMapApp';
const NearbySites = require('../data/nearby.json');
const NearbySiteNames = Object.keys(NearbySites);

export default class NearbySitesGallery extends React.PureComponent {
  state = {
    activeTab: NearbySiteNames[0],
    shouldRenderTabs: false,
  };

  componentWillMount() {
    requestIdleCallback(() => {
      this.setState({ shouldRenderTabs: true });
    });
  }

  // todo(brentvatne): improve perf of switching tabs here
  render() {
    const { activeTab } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.tabs}>
          {NearbySiteNames.map(t => this._renderTab(t))}
        </View>

        <View style={styles.gallery}>
          {NearbySites[activeTab].map(this._renderItem)}
        </View>
      </View>
    );
  }

  _setActiveTab = tab => {
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.linear,
      duration: 250,
    });

    this.setState({ activeTab: tab });
  };

  _renderTab = tab => {
    const { activeTab } = this.state;
    const isActive = activeTab === tab;

    return (
      <TouchableOpacity
        key={tab}
        style={[styles.tab, isActive && styles.activeTab]}
        onPress={() => this._setActiveTab(tab)}>
        <Text style={[styles.tabText, isActive && styles.activeTabText]}>
          {tab}
        </Text>
      </TouchableOpacity>
    );
  };

  _renderItem = data => {
    const { name, image, address } = data;

    return (
      <Touchable
        useForeground={Touchable.canUseNativeForeground()}
        key={name}
        style={styles.item}
        onPress={() => this._handlePress(address)}>
        <Image
          source={Images[image]}
          resizeMode={'cover'}
          style={styles.itemImage}
        />
        <View style={styles.itemDetail}>
          <Text style={styles.itemTitle}>
            {name}
          </Text>
          <Text style={styles.itemAction}>
            Directions&nbsp;
            <Image source={Images.purpleArrowIcon} />
          </Text>
        </View>
      </Touchable>
    );
  };

  _handlePress = address => {
    openExternalMapApp(address.replace(/\s/, '+'));
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabs: {
    flexDirection: 'row',
    marginTop: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(253,229,255,0.5)',
    padding: 5,
  },
  tabText: {
    fontFamily: Fonts.type.base,
    fontSize: 15,
    lineHeight: 23,
    letterSpacing: 0.47,
    color: 'rgba(253,229,255,0.5)',
  },
  activeTab: {
    borderBottomColor: Colors.snow,
  },
  activeTabText: {
    color: Colors.snow,
  },
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 35,
  },
  item: {
    margin: 5,
    borderWidth: 1,
    borderColor: Colors.snow,
    width: Layout.screenWidth / 2 - 10,
  },
  itemImage: {
    width: Layout.screenWidth / 2 - 10 - 2,
  },
  itemDetail: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: Colors.snow,
  },
  itemTitle: {
    fontFamily: Fonts.type.semiBold,
    fontSize: 15,
    letterSpacing: 0,
    minHeight: 40,
    color: Colors.darkPurple,
  },
  itemAction: {
    fontFamily: Fonts.type.medium,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
    color: Colors.darkPurple,
  },
});
