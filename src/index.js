/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PanResponder, View, Dimensions, Animated } from 'react-native';
/* eslint-enable import/no-extraneous-dependencies */

const emptyFunc = () => {};
const window = Dimensions.get('window');

export default class ElasticStack extends Component {
  static propTypes = {
    style: PropTypes.oneOfType(PropTypes.object),
    items: PropTypes.arrayOf(PropTypes.any).isRequired,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
    onSwiped: PropTypes.func,
    infinite: PropTypes.bool,
    distDrag: PropTypes.number,
    onXChange: PropTypes.func,
    onYChange: PropTypes.func,
    itemWidth: PropTypes.number,
    itemHeight: PropTypes.number,
    directions: PropTypes.arrayOf(PropTypes.bool),
    renderItem: PropTypes.func.isRequired,
    onSwipedTop: PropTypes.func,
    onSwipedLeft: PropTypes.func,
    onStackEnded: PropTypes.func,
    reduceScaleBy: PropTypes.number,
    onSwipedRight: PropTypes.func,
    elastickRange: PropTypes.number,
    onSwipedBottom: PropTypes.func,
    reduceOpacityBy: PropTypes.number,
    activeItemIndex: PropTypes.number,
    elastickItemsCount: PropTypes.number,
    onPanResponderGrant: PropTypes.func,
    onPanResponderRelease: PropTypes.func,
  };

  static defaultProps = {
    style: {},
    children: null,
    infinite: false,
    onSwiped: emptyFunc,
    distDrag: 70,
    onXChange: emptyFunc,
    onYChange: emptyFunc,
    itemWidth: window.width * 0.8,
    itemHeight: window.height * 0.8,
    directions: [true, true, true, true],
    onSwipedTop: emptyFunc,
    onSwipedLeft: emptyFunc,
    reduceScaleBy: 0.05,
    onStackEnded: emptyFunc,
    onSwipedRight: emptyFunc,
    elastickRange: 0.5,
    onSwipedBottom: emptyFunc,
    reduceOpacityBy: 0.2,
    activeItemIndex: 0,
    elastickItemsCount: 3,
    onPanResponderGrant: emptyFunc,
    onPanResponderRelease: emptyFunc,
  };

  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(0),
      opacity: new Animated.Value(0),
      panSwiping: new Animated.ValueXY(),
      directions: {
        top: props.directions[0],
        left: props.directions[1],
        bottom: props.directions[2],
        right: props.directions[3],
      },
      isStackEnded: false,
      activeItemIndex: props.activeItemIndex,
    };

    this.animatedValueX = 0;
    this.animatedValueY = 0;

    this.state.pan.x.addListener(this.onXChange);
    this.state.pan.y.addListener(this.onYChange);

    this.initPanResponder();
  }

  render() {
    return (
      <View
        style={[
          this.props.style,
          {
            position: 'relative',
            width: this.props.itemWidth,
            height: this.props.itemHeight,
          },
        ]}
      >
        {this.renderElastickItems()}

        {this.props.children}
      </View>
    );
  }

  componentWillUnmount() {
    this.state.pan.x.removeAllListeners();
    this.state.pan.y.removeAllListeners();
  }

  renderElastickItems() {
    const { items, itemWidth, itemHeight, infinite, renderItem, elastickItemsCount } = this.props;
    const { isStackEnded, activeItemIndex } = this.state;
    const itemsLength = items.length;

    if (!infinite && isStackEnded) {
      return null;
    }

    return Array.from({ length: elastickItemsCount }).map((_, i) => {
      const itemIndex = ElasticStack.calculateNextItemIndex(itemsLength, activeItemIndex + (i - 1));
      const itemContent = items[itemIndex];

      if (!itemContent || (!infinite && itemIndex < activeItemIndex)) {
        return null;
      }

      const swipableItemStyle = this.calculateSwipableItemStyle(i);
      const handlers = i === 0 ? this.panResponder.panHandlers : {};

      return (
        <Animated.View style={swipableItemStyle} {...handlers} key={`${itemIndex}-${i}`}>
          {renderItem(itemContent, itemWidth, itemHeight)}
        </Animated.View>
      );
    });
  }

  calculateSwipableItemStyle = (itemIndex) => {
    const { pan, panSwiping } = this.state;
    const {
      distDrag,
      itemWidth,
      itemHeight,
      reduceScaleBy,
      elastickRange,
      reduceOpacityBy,
      elastickItemsCount,
    } = this.props;

    const isFirst = itemIndex === 0;
    const currentPan = isFirst ? panSwiping : pan;

    const rotateRange = 8 - 8 / elastickItemsCount * itemIndex;
    const rotate = currentPan.x.interpolate({
      inputRange: [-distDrag, 0, distDrag],
      outputRange: [`-${rotateRange}deg`, '0deg', `${rotateRange}deg`],
    });

    const opacityRange = 1 - reduceOpacityBy * itemIndex;
    const opacity = this.state.opacity.interpolate({
      inputRange: [0, 1],
      outputRange: [isFirst ? 1 : opacityRange, isFirst ? 0 : opacityRange + reduceOpacityBy],
    });

    const scaleRange = 1 - reduceScaleBy * itemIndex;
    const scale = this.state.scale.interpolate({
      inputRange: [0, 1],
      outputRange: [scaleRange, scaleRange + reduceScaleBy],
    });

    const elRange = isFirst ? 1 : elastickRange;
    const translateRange = (1 - 1 / elastickItemsCount * itemIndex) * distDrag * elRange;
    const translateX = currentPan.x.interpolate({
      inputRange: [-distDrag, 0, distDrag],
      outputRange: [-translateRange, 0, translateRange],
    });
    const translateY = currentPan.y.interpolate({
      inputRange: [-distDrag, 0, distDrag],
      outputRange: [-translateRange, 0, translateRange],
    });

    return {
      width: itemWidth,
      height: itemHeight,
      zIndex: elastickItemsCount - itemIndex + 1,
      position: 'absolute',
      opacity,
      transform: [{ scale }, { rotate }, { translateX }, { translateY }],
    };
  };

  initPanResponder = () => {
    this.panResponder = PanResponder.create({
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderGrant: this.onPanResponderGrant,
      onPanResponderRelease: this.onPanResponderRelease,
      onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,
      onStartShouldSetPanResponder: this.onStartShouldSetPanResponder,
      onPanResponderTerminationRequest: this.onPanResponderTerminationRequest,
      onStartShouldSetPanResponderCapture: this.onStartShouldSetPanResponderCapture,
    });
  };

  onXChange = ({ value }) => {
    this.animatedValueX = value;

    this.props.onXChange(value);
  };

  onYChange = ({ value }) => {
    this.animatedValueY = value;

    this.props.onYChange(value);
  };

  onPanResponderMove = (e, { dx, dy }) => {
    this.state.pan.setValue({ x: dx, y: dy });
    this.state.panSwiping.setValue({ x: dx, y: dy });
  };

  onPanResponderGrant = () => {
    this.props.onPanResponderGrant();

    this.state.pan.setValue({ x: 0, y: 0 });
  };

  onPanResponderRelease = () => {
    const { onSwipedTop, onSwipedLeft, onSwipedRight, onSwipedBottom, distDrag } = this.props;
    const animatedValueX = this.animatedValueX;
    const animatedValueY = this.animatedValueY;

    const isSwipingLeft = animatedValueX < -distDrag && this.state.directions.left;
    const isSwipingRight = animatedValueX > distDrag && this.state.directions.right;
    const isSwipingTop = animatedValueY < -distDrag && this.state.directions.top;
    const isSwipingBottom = animatedValueY > distDrag && this.state.directions.bottom;

    this.props.onPanResponderRelease();

    if (isSwipingLeft || isSwipingRight || isSwipingTop || isSwipingBottom) {
      let onSwipeDirectionCallback = onSwipedBottom;

      if (isSwipingRight) {
        onSwipeDirectionCallback = onSwipedRight;
      } else if (isSwipingLeft) {
        onSwipeDirectionCallback = onSwipedLeft;
      } else if (isSwipingTop) {
        onSwipeDirectionCallback = onSwipedTop;
      }

      Animated.parallel([
        Animated.spring(this.state.scale, { toValue: 1 }),
        Animated.spring(this.state.opacity, { toValue: 1 }),
        Animated.spring(this.state.pan, {
          toValue: { x: 0, y: 0 },
        }),
        Animated.spring(this.state.panSwiping, {
          toValue: {
            x: this.animatedValueX * 2,
            y: this.animatedValueY * 2,
          },
        }),
      ]).start(() => {
        this.incrementItemIndex(onSwipeDirectionCallback);
      });
    } else {
      Animated.parallel([
        Animated.spring(this.state.pan, { toValue: { x: 0, y: 0 } }),
        Animated.spring(this.state.panSwiping, { toValue: { x: 0, y: 0 } }),
      ]).start();
    }
  };

  onMoveShouldSetPanResponder = () => true;

  onStartShouldSetPanResponder = () => true;

  onPanResponderTerminationRequest = () => false;

  onStartShouldSetPanResponderCapture = () => true;

  incrementItemIndex = (onSwipedToDirection) => {
    const { activeItemIndex } = this.state;

    let newActiveItemIndex = activeItemIndex + 1;
    let isStackEnded = false;

    if (newActiveItemIndex === this.props.items.length) {
      newActiveItemIndex = 0;
      isStackEnded = true;
    }

    this.resetPanAndScale();
    this.setItemIndex(newActiveItemIndex, onSwipedToDirection, isStackEnded);
  };

  setItemIndex = (activeItemIndex, onSwipedToDirection, isStackEnded) => {
    this.setState({ onSwipedToDirection, isStackEnded, activeItemIndex }, this.onSwipedCallbacks);
  };

  resetPanAndScale = () => {
    this.state.pan.setValue({ x: 0, y: 0 });
    this.state.panSwiping.setValue({ x: 0, y: 0 });

    this.state.scale.setValue(0);
    this.state.opacity.setValue(0);
  };

  onSwipedCallbacks = () => {
    const prevItemIndex = ElasticStack.calculatePreviousItemIndex(
      this.props.items.length,
      this.state.activeItemIndex,
    );

    this.props.onSwiped(prevItemIndex);
    this.state.onSwipedToDirection(prevItemIndex);

    if (this.state.isStackEnded) {
      this.props.onStackEnded();
    }
  };

  static calculateNextItemIndex = (itemsLength, itemIndex) =>
    itemIndex >= itemsLength - 1 ? itemIndex - (itemsLength - 1) : itemIndex + 1;

  static calculatePreviousItemIndex = (itemsLength, activeItemIndex) =>
    activeItemIndex === 0 ? itemsLength - 1 : activeItemIndex - 1;
}
