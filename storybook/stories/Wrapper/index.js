/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image, Platform, Dimensions, StyleSheet } from 'react-native';
import ParallaxScroll from '@monterosa/react-native-parallax-scroll';
/* eslint-enable import/no-extraneous-dependencies */

import bg from './bg.png';

const ANDROID_STATUS_BAR_HEIGHT = 24;

const IS_IOS = Platform.OS === 'ios';

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.8,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: null,
    height: null,
  },
  contentContainerStyle: {
    width: window.width,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
});

const height = window.height - (IS_IOS ? 0 : ANDROID_STATUS_BAR_HEIGHT);

export default function Wrapper({
  children,
  headerImage,
  disableScroll,
  parallaxHeight,
  withPaddingBottom,
}) {
  const contentContainerStyle = {
    minHeight: height - parallaxHeight,
  };

  return (
    <View>
      <Image style={styles.background} source={bg} />

      <ParallaxScroll
        style={styles.wrapper}
        height={height}
        renderHeader={() => (
          <View style={styles.header}>
            <Text style={styles.headerText}>Welcome to RN Elastic Stack</Text>
          </View>
        )}
        scrollEnabled={!disableScroll}
        parallaxHeight={parallaxHeight}
        useNativeDriver
        headerBackgroundColor={'rgba(51, 51, 51, 0.6)'}
        contentContainerStyle={[
          styles.contentContainerStyle,
          contentContainerStyle,
          { paddingBottom: withPaddingBottom ? 200 : 0 },
        ]}
        directionalLockEnabled
        renderParallaxBackground={() => (
          <Image style={styles.image} source={{ uri: headerImage }} />
        )}
        headerFixedBackgroundColor={'rgba(51, 51, 51, 1)'}
        parallaxBackgroundScrollSpeed={withPaddingBottom ? 0.5 : 5}
      >

        {children}
      </ParallaxScroll>
    </View>
  );
}

Wrapper.defaultProps = {
  disableScroll: false,
  withPaddingBottom: false,
};

Wrapper.propTypes = {
  children: PropTypes.element.isRequired,
  headerImage: PropTypes.string.isRequired,
  disableScroll: PropTypes.bool,
  parallaxHeight: PropTypes.number.isRequired,
  withPaddingBottom: PropTypes.bool,
};
