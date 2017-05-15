[![](https://img.shields.io/npm/dm/react-native-elastic-stack.svg?style=flat-square)](https://www.npmjs.com/package/react-native-elastic-stack)

# react-native-elastic-stack

React Native component that implement [elastic stack effect](https://tympanus.net/Development/ElasticStack/)

## Installation

```
$ npm install react-native-elastic-stack --save
```

## Demo

| ![](./demo/demo-1.gif) | ![](./demo/demo-2.gif) | ![](./demo/demo-3.gif) |

## Basic Usage

```js
import ParallaxScroll from 'react-native-elastic-stack';

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
| `reduceScaleBy` | `number` | `0.05` | The value by which the next item should decrease. |
| `onSwipedRight` | `func` | `(itemIndex) => {}` | Function to be called when a item is swiped right. |
| `elastickRange` | `number` | `0.5` | The value of the elastic of items. |
| `onSwipedBottom` | `func` | `(itemIndex) => {}` | Function to be called when a item is swiped bottom. |
| `reduceOpacityBy` | `number` | `0.2` | The value by which the next item should be more transparent. |
| `activeItemIndex` | `number` | `0` | Default item index. |
| `elastickItemsCount` | `number` | `3` | Count of items rendered at the same time. |
| `onPanResponderGrant` | `func` | `() => {}` | |
| `onPanResponderRelease` | `func` | `() => {}` | |


## Contributing

I welcome contributions! Please open an issues if you have any feature ideas
or find any bugs. I also accept pull requests with open arms. I will
go over the issues when I have time. :)
