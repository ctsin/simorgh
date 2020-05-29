/* eslint-disable react/prop-types */
import React from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { StaticRouter } from 'react-router-dom';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import OnDemandTvPage from '.';
import pashtoPageData from '#data/pashto/bbc_pashto_tv/w13xttn4';
import * as analyticsUtils from '#lib/analyticsUtils';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import getInitialData from '#app/routes/onDemandTV/getInitialData';

const Page = ({ pageData, service, isAmp = false }) => (
  <StaticRouter>
    <ToggleContextProvider
      service={service}
      origin="https://www.test.bbc.co.uk"
    >
      <ServiceContextProvider service={service}>
        <RequestContextProvider
          bbcOrigin="https://www.test.bbc.co.uk"
          isAmp={isAmp}
          pageType="media"
          pathname="/pathname"
          service={service}
          statusCode={200}
        >
          <OnDemandTvPage service={service} pageData={pageData} />
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContextProvider>
  </StaticRouter>
);

const renderPage = async ({ pageData, service, isAmp = false }) => {
  let result;
  await act(async () => {
    result = await render(
      <Page pageData={pageData} service={service} isAmp={isAmp} />,
    );
  });

  return result;
};

analyticsUtils.getAtUserId = jest.fn();

jest.mock('../../containers/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

const { env } = process;

describe('OnDemand TV Brand Page ', () => {
  beforeEach(() => {
    process.env = { ...env };
  });

  it('should show the brand title for OnDemand TV Pages', async () => {
    fetch.mockResponse(JSON.stringify(pashtoPageData));

    const { pageData } = await getInitialData('some-ondemand-tv-path');
    const { getByText } = await renderPage({
      pageData,
      service: 'pashto',
    });

    expect(getByText('نړۍ دا وخت')).toBeInTheDocument();
  });
});

it('should show the datestamp correctly for Pashto OnDemand TV Pages', async () => {
  fetch.mockResponse(JSON.stringify(pashtoPageData));

  const { pageData } = await getInitialData('some-ondemand-tv-path');
  const { getByText } = await renderPage({
    pageData,
    service: 'pashto',
  });

  expect(getByText('۲۷ می ۲۰۲۰')).toBeInTheDocument();
});

it('should show the summary for OnDemand TV Pages', async () => {
  fetch.mockResponse(JSON.stringify(pashtoPageData));

  const { pageData } = await getInitialData('some-ondemand-tv-path');
  const { getByText } = await renderPage({
    pageData,
    service: 'pashto',
  });

  expect(
    getByText(
      'د بي بي سي پښتو ټلویزیوني خپرونه چې هره ورځ د افغانستان په شپږ بجو په ژوندۍ بڼه خپرېږي. دلته یې لیدلی شئ.',
    ),
  ).toBeInTheDocument();
});

it('should show the video player on canonical with no live override', async () => {
  process.env.SIMORGH_APP_ENV = 'live';
  fetch.mockResponse(JSON.stringify(pashtoPageData));
  const { pageData } = await getInitialData('some-ondemand-tv-path');
  const { container } = await renderPage({
    pageData,
    service: 'pashto',
  });
  const videoPlayerIframeSrc = container
    .querySelector('iframe')
    .getAttribute('src');

  expect(videoPlayerIframeSrc).toEqual(
    'https://polling.bbc.co.uk/ws/av-embeds/media/pashto/bbc_pashto_tv/w172xcldhhrdqgb/ps',
  );
});

it('should show the video player on amp with no live override', async () => {
  process.env.SIMORGH_APP_ENV = 'live';
  fetch.mockResponse(JSON.stringify(pashtoPageData));
  const { pageData } = await getInitialData('some-ondemand-tv-path');
  const { container } = await renderPage({
    pageData,
    service: 'pashto',
    isAmp: true,
  });
  const videoPlayerIframeSrc = container
    .querySelector('amp-iframe')
    .getAttribute('src');

  expect(videoPlayerIframeSrc).toEqual(
    'https://polling.bbc.co.uk/ws/av-embeds/media/pashto/bbc_pashto_tv/w172xcldhhrdqgb/ps/amp',
  );
});

it('should show the video player on canonical with live override', async () => {
  process.env.SIMORGH_APP_ENV = 'test';
  fetch.mockResponse(JSON.stringify(pashtoPageData));
  const { pageData } = await getInitialData('some-ondemand-tv-path');
  const { container } = await renderPage({
    pageData,
    service: 'pashto',
  });
  const videoPlayerIframeSrc = container
    .querySelector('iframe')
    .getAttribute('src');

  expect(videoPlayerIframeSrc).toEqual(
    'https://polling.test.bbc.co.uk/ws/av-embeds/media/pashto/bbc_pashto_tv/w172xcldhhrdqgb/ps?morph_env=live',
  );
});

it('should show the video player on amp with live override', async () => {
  fetch.mockResponse(JSON.stringify(pashtoPageData));
  const { pageData } = await getInitialData('some-ondemand-tv-path');
  const { container } = await renderPage({
    pageData,
    service: 'pashto',
    isAmp: true,
  });
  const videoPlayerIframeSrc = container
    .querySelector('amp-iframe')
    .getAttribute('src');

  expect(videoPlayerIframeSrc).toEqual(
    'https://polling.test.bbc.co.uk/ws/av-embeds/media/pashto/bbc_pashto_tv/w172xcldhhrdqgb/ps/amp?morph_env=live',
  );
});
