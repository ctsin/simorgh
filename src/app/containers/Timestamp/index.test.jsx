import React from 'react';
import { render } from 'enzyme';
import moment from 'moment-timezone';
import { isNull, shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import timestampGenerator from './helpers/timestampGenerator';
import Timestamp from '.';

const defaultTimestamp = 1539969006000; // 19 October 2018
const noLeadingZeroTimestamp = 1530947227000; // 07 July 2018
const invalidTimestamp = 8640000000000001; // A day holds 86,400,000 milliseconds - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Description

const fifthJan = 1546707084472; // 2019-01-05T16:51:24.472Z
const eighthMarch = 1552009884472; // 2019-03-08T01:51:24.472Z

const shortAlphaNumericRegex = /[0-9]{1,2} \w+ [0-9]{4}/;

const renderedTimestamps = jsx => render(jsx).get(0).children; // helper as output is wrapped in a grid

// eslint-disable-next-line no-unused-vars
const makeDatetimeString = timestamp =>
  moment(timestamp)
    .tz('Europe/London')
    .format('D MMMM YYYY, HH:mm z');

describe('Timestamp', () => {
  describe('with no data', () => {
    isNull('should return null', <Timestamp />);
  });
  shouldMatchSnapshot(
    'should render without a leading zero on the day',
    <Timestamp
      firstPublished={noLeadingZeroTimestamp}
      lastPublished={noLeadingZeroTimestamp}
    />,
  );
  shouldMatchSnapshot(
    'should render correctly',
    <Timestamp
      lastPublished={defaultTimestamp}
      firstPublished={defaultTimestamp}
    />,
  );
  shouldMatchSnapshot(
    'should handle an invalid timestamp',
    <Timestamp
      firstPublished={invalidTimestamp}
      lastPublished={invalidTimestamp}
    />,
  );

  it('should display only one timestamp when published === updated', () => {
    const renderedWrapper = renderedTimestamps(
      <Timestamp firstPublished={fifthJan} lastPublished={fifthJan} />,
    );
    expect(renderedWrapper[0].children[0].data).toEqual('5 January 2019');
    expect(renderedWrapper.length).toEqual(1);
  });

  it('should display one relative timestamp when published < 10 hours ago', () => {
    const sixHoursAgo = timestampGenerator({ hours: 6 });
    const renderedWrapper = renderedTimestamps(
      <Timestamp firstPublished={sixHoursAgo} lastPublished={sixHoursAgo} />,
    );

    expect(renderedWrapper.length).toEqual(1);
    expect(renderedWrapper[0].children[0].data).toEqual('6 hours ago');
  });

  it('should display an absolute timestamp when updated > 24 hours ago', () => {
    const renderedWrapper = renderedTimestamps(
      <Timestamp firstPublished={fifthJan} lastPublished={eighthMarch} />,
    );

    expect(renderedWrapper.length).toEqual(2);
    expect(renderedWrapper[0].children[0].data).toEqual('5 January 2019');
    expect(renderedWrapper[1].children[0].data).toEqual('Updated 8 March 2019');
  });

  it('should render relative time if published < 10 hrs ago', () => {
    const publishedFourHoursAgo = timestampGenerator({ hours: 4 });
    const renderedWrapper = renderedTimestamps(
      <Timestamp
        firstPublished={publishedFourHoursAgo}
        lastPublished={publishedFourHoursAgo}
      />,
    );

    expect(renderedWrapper.length).toEqual(1);
    expect(renderedWrapper[0].children[0].data).toEqual('4 hours ago');
  });

  it('should render relative time for lastPublished if < 10 hrs ago, but absolute time for firstPublished', () => {
    const firstPublishedEightHoursAgo = timestampGenerator({ hours: 8 });
    const lastPublishedFourHoursAgo = timestampGenerator({ hours: 4 });
    const renderedWrapper = renderedTimestamps(
      <Timestamp
        firstPublished={firstPublishedEightHoursAgo}
        lastPublished={lastPublishedFourHoursAgo}
      />,
    );

    expect(renderedWrapper.length).toEqual(2);
    expect(renderedWrapper[0].children[0].data).toMatch(shortAlphaNumericRegex);
    expect(renderedWrapper[1].children[0].data).toEqual('Updated 4 hours ago');
  });

  it('should render absolute time for lastPublished and for firstPublished if > 10 hrs ago', () => {
    const firstPublishedTwelveHoursAgo = timestampGenerator({ hours: 12 });
    const lastPublishedElevenHoursAgo = timestampGenerator({ hours: 11 });
    const renderedWrapper = renderedTimestamps(
      <Timestamp
        firstPublished={firstPublishedTwelveHoursAgo}
        lastPublished={lastPublishedElevenHoursAgo}
      />,
    );

    expect(renderedWrapper.length).toEqual(2);
    expect(renderedWrapper[0].children[0].data).toMatch(shortAlphaNumericRegex);
    expect(renderedWrapper[1].children[0].data).toMatch(
      /Updated [0-9]{1,2} \w+ [0-9]{4}[,] [0-9]{2}[:][0-9]{2} \w+/,
    );
    expect(renderedWrapper[1].children[0].data).toContain('BST');
  });
});
