[![](https://img.shields.io/npm/dm/@monterosa/react-native-elastic-stack.svg?style=flat-square)](https://www.npmjs.com/package/@monterosa/react-native-elastic-stack)

# react-native-elastic-stack

React Native component that implements [elastic stack effect](https://tympanus.net/Development/ElasticStack/)

## Installation

```
$ npm install @monterosa/react-native-elastic-stack --save
```

## Demo

| ![](./demo/ios-demo-1.gif) | ![](./demo/ios-demo-2.gif) | ![](./demo/ios-demo-3.gif) | ![](./demo/ios-demo-4.gif) |

## Basic Usage

```js
import ElasticStack from '@monterosa/react-native-elastic-stack';

// Inside of a component's render() method:
render() {
  return (
    <ElasticStack
      items={Array.from({ length: 5 }).map(
        (_, i) => `http://lorempixel.com/640/480/city/?item=${i}`,
      )}
      itemWidth={itemWidth}
      itemHeight={itemHeight}
      renderItem={url => <Item image={url} width={itemWidth} height={itemHeight} />}
      elastickRange={0.9}
      elastickItemsCount={5}
    />
  );
}
```

## Examples

Please clone the repo and run `npm run storybook` or `yarn storybook` to show examples of usages.

## Usage (API)

onPanResponderGrant: PropTypes.func,
onPanResponderRelease: PropTypes.func,

| Property | Type | Defaut | Description |
| -------- | ---- | -------- | ----------- |
| `style` | `object` | `{}` | Component's styles. |
| `items` | `array` | `[]` | Array of data for the items to be rendered. |
| `onSwiped` | `func` | `(itemIndex) => {}` | Function to be called when a item is swiped. |
| `infinite` | `bool` | `false` | Keep swiping indefinitely. |
| `distDrag` | `number` | `70` | If the user stops dragging the image in a area that does not exceed for either x or y then the image goes back to the stack. |
| `onXChange` | `func` | `() => {)` | Function to be called when `x` of current item changed. |
| `onYChange` | `func` | `() => {}` | Function to be called when `y` of current item changed |
| `itemWidth` | `number` | `Dimensions.get('window').width * 0.8` | This is the width of the item. |
| `itemHeight` | `number` | `Dimensions.get('window').height * 0.8` | This is the width of the item. |
| `directions` | `array` | `[true, true, true, true]` | Supported directions([top, right, bottom, left]) in which items can swipe out. |
| `renderItem` | `func` | `(itemData, itemWidth, itemHeight) => {}` | Function to render the item based on the data. |
| `onSwipedTop` | `func` | `(itemIndex) => {}` | Function to be called when a item is swiped top. |
| `onSwipedLeft` | `func` | `(itemIndex) => {}` | Function to be called when a item is swiped left. |
| `onStackEnded` | `func` | `() => {}` | Function to be called when stack is ended. |
| `rotateDegree` | `number` | `10` | The value by which items should rotate. |
| `reduceScaleBy` | `number` | `0.05` | The value by which the next items should decrease. |
| `onSwipedRight` | `func` | `(itemIndex) => {}` | Function to be called when a item is swiped right. |
| `reduceDegreeBy` | `number` | `0.65` | The value by which the next items should reduce rotate. |
| `onSwipedBottom` | `func` | `(itemIndex) => {}` | Function to be called when a item is swiped bottom. |
| `reduceOpacityBy` | `number` | `0.2` | The value by which the next item should be more transparent. |
| `activeItemIndex` | `number` | `0` | Default item index. |
| `stackEffectHeight` | `number` | `5` | The height of the stack effect. |
| `reduceTransformBy` | `number` | `0.7` | The value by which the next items should reduce transforms. |
| `elastickItemsCount` | `number` | `3` | Count of items rendered at the same time. |
| `onPanResponderGrant` | `func` | `() => {}` | |
| `onPanResponderRelease` | `func` | `() => {}` | |

## Latest changelog

All changes [here](./CHANGELOG.md)

### 1.3.1 - 2018-02-13

#### Fixed

* replaced `**` with `Math.pow`

### 1.3.0 - 2018-02-11

#### Added

* stack effect, now you can see the next curds
* new props: `rotateDegree`, `reduceDegreeBy`, `stackEffectHeight`

#### Changed

* the props `elastickRange` changed to `reduceTransformBy`

## Contributing

I welcome contributions! Please open an issue if you have any feature ideas
or find any bugs. I also accept pull requests with open arms. I will
go over the issues when I have time. :)
