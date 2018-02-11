/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf, action } from '@kadira/react-native-storybook';

import ElasticStack from '../../src';

import Card from './Card/';
import Wrapper from './Wrapper';

const cardWidth = 300;
const cardHeight = 400;

const renderCard = url => <Card image={url} width={cardWidth} height={cardHeight} />;

const items = Array.from({ length: 10 }).map(
  (_, i) => `https://lorempixel.com/640/480/nightlife/?item=${i}`,
);

storiesOf('ElasticStack', module)
  .add('Base', () => (
    <Wrapper
      headerImage={`https://lorempixel.com/640/480/nightlife/?time${Date.now()}`}
      disableScroll
      parallaxHeight={45}
    >
      <ElasticStack
        style={{ alignItems: 'center', justifyContent: 'center' }}
        items={items}
        itemWidth={cardWidth}
        itemHeight={cardHeight}
        onSwipedTop={action('onSwipedTop')}
        onSwipedLeft={action('onSwipedLeft')}
        onStackEnded={action('onStackEnded')}
        onSwipedRight={action('onSwipedRight')}
        onSwipedBottom={action('onSwipedBottom')}
        renderItem={renderCard}
      />
    </Wrapper>
  ))
  .add('Infinite', () => (
    <Wrapper
      headerImage={`https://lorempixel.com/640/480/nightlife/?time${Date.now()}`}
      disableScroll
      parallaxHeight={45}
    >
      <ElasticStack
        items={Array.from({ length: 3 }).map(
          (_, i) => `https://lorempixel.com/640/480/nightlife/?item=${i}`,
        )}
        infinite
        itemWidth={cardWidth}
        itemHeight={cardHeight}
        renderItem={renderCard}
      />
    </Wrapper>
  ))
  .add('Dist of drag is 200', () => (
    <Wrapper
      headerImage={`https://lorempixel.com/640/480/nightlife/?time${Date.now()}`}
      disableScroll
      parallaxHeight={45}
    >
      <ElasticStack
        items={items}
        distDrag={200}
        itemWidth={cardWidth}
        itemHeight={cardHeight}
        renderItem={renderCard}
      />
    </Wrapper>
  ))
  .add('Only horizontal swipes', () => (
    <Wrapper
      headerImage={`https://lorempixel.com/640/480/nightlife/?time${Date.now()}`}
      disableScroll
      parallaxHeight={45}
    >
      <ElasticStack
        items={items}
        itemWidth={cardWidth}
        itemHeight={cardHeight}
        renderItem={renderCard}
        directions={[false, true, false, true]}
      />
    </Wrapper>
  ))
  .add('Only vertical swipes', () => (
    <Wrapper
      headerImage={`https://lorempixel.com/640/480/nightlife/?time${Date.now()}`}
      disableScroll
      parallaxHeight={45}
    >
      <ElasticStack
        items={items}
        itemWidth={cardWidth}
        itemHeight={cardHeight}
        renderItem={renderCard}
        directions={[true, false, true, false]}
      />
    </Wrapper>
  ))
  .add('Reduce scale by 0.1', () => (
    <Wrapper
      headerImage={`https://lorempixel.com/640/480/nightlife/?time${Date.now()}`}
      disableScroll
      parallaxHeight={45}
    >
      <ElasticStack
        items={items}
        itemWidth={cardWidth}
        itemHeight={cardHeight}
        renderItem={renderCard}
        reduceScaleBy={0.1}
      />
    </Wrapper>
  ))
  .add('Elastick range is 0.8', () => (
    <Wrapper
      headerImage={`https://lorempixel.com/640/480/nightlife/?time${Date.now()}`}
      disableScroll
      parallaxHeight={45}
    >
      <ElasticStack
        items={items}
        itemWidth={cardWidth}
        itemHeight={cardHeight}
        renderItem={renderCard}
        elastickRange={0.8}
      />
    </Wrapper>
  ))
  .add('Reduce opanightlife by 0.3', () => (
    <Wrapper
      headerImage={`https://lorempixel.com/640/480/nightlife/?time${Date.now()}`}
      disableScroll
      parallaxHeight={45}
    >
      <ElasticStack
        items={items}
        itemWidth={cardWidth}
        itemHeight={cardHeight}
        renderItem={renderCard}
        reduceOpanightlifeBy={0.3}
      />
    </Wrapper>
  ))
  .add('Active item index is 3', () => (
    <Wrapper
      headerImage={`https://lorempixel.com/640/480/nightlife/?time${Date.now()}`}
      disableScroll
      parallaxHeight={45}
    >
      <ElasticStack
        items={items}
        itemWidth={cardWidth}
        itemHeight={cardHeight}
        renderItem={renderCard}
        activeItemIndex={3}
      />
    </Wrapper>
  ))
  .add('Elastick items count is 5', () => (
    <Wrapper
      headerImage={`https://lorempixel.com/640/480/nightlife/?time${Date.now()}`}
      disableScroll
      parallaxHeight={45}
    >
      <ElasticStack
        items={items}
        itemWidth={cardWidth}
        itemHeight={cardHeight}
        renderItem={renderCard}
        elastickRange={0.9}
        elastickItemsCount={5}
      />
    </Wrapper>
  ))
  .add('With handlers', () => (
    <Wrapper
      headerImage={`https://lorempixel.com/640/480/nightlife/?time${Date.now()}`}
      disableScroll
      parallaxHeight={45}
    >
      <ElasticStack
        items={items}
        onSwiped={action('onSwiped')}
        itemWidth={cardWidth}
        itemHeight={cardHeight}
        renderItem={renderCard}
        onSwipedTop={action('onSwipedTop')}
        onSwipedLeft={action('onSwipedLeft')}
        onStackEnded={action('onStackEnded')}
        onSwipedRight={action('onSwipedRight')}
        onSwipedBottom={action('onSwipedBottom')}
        onPanResponderGrant={action('onPanResponderGrant')}
        onPanResponderRelease={action('onPanResponderRelease')}
      />
    </Wrapper>
  ))
  .add('With big header', () => (
    <Wrapper
      headerImage={`https://lorempixel.com/640/480/nightlife/?time${Date.now()}`}
      disableScroll
      parallaxHeight={250}
    >
      <ElasticStack
        items={items}
        itemWidth={cardWidth}
        itemHeight={cardHeight}
        renderItem={renderCard}
      />
    </Wrapper>
  ))
  .add('With scroll', () => (
    <Wrapper
      headerImage={`https://lorempixel.com/640/480/nightlife/?time${Date.now()}`}
      parallaxHeight={450}
      withPaddingBottom
    >
      <ElasticStack
        items={items}
        itemWidth={cardWidth}
        itemHeight={cardHeight}
        renderItem={renderCard}
      />
    </Wrapper>
  ));
