import React from 'react';
import { shouldMatchSnapshot } from '../../../testHelpers';
import {
  Grid,
  GridWithPadding,
  GhostGrid,
  GhostGridWithPadding,
  GridItemConstrainedSmall,
  GridItemConstrainedMedium,
  GridItemConstrainedLarge,
  GridItemConstrainedLargeNoMargin,
  NestedGridItemSmall,
  NestedGridItemMedium,
  NestedGridItemLarge,
  PopOutGridItemMedium,
} from '.';

describe('Styled Grid items', () => {
  describe('Grid', () => {
    shouldMatchSnapshot('should render correctly', <Grid />);
  });
  describe('GridWithPadding', () => {
    shouldMatchSnapshot('should render correctly', <GridWithPadding />);
  });
  describe('GhostGrid', () => {
    shouldMatchSnapshot('should render correctly', <GhostGrid />);
  });
  describe('GhostGridWithPadding', () => {
    shouldMatchSnapshot('should render correctly', <GhostGridWithPadding />);
  });

  describe('GridItemConstrainedSmall', () => {
    shouldMatchSnapshot(
      'should start at column 1 & span 1',
      <Grid>
        <GridItemConstrainedSmall>
          <NestedGridItemSmall gridColumnStart="1" gridSpan={{ default: '1' }}>
            <div>1/4 or 1/5 or 1/8</div>
          </NestedGridItemSmall>
        </GridItemConstrainedSmall>
      </Grid>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span 8',
      <Grid>
        <GridItemConstrainedSmall>
          <NestedGridItemSmall gridColumnStart="1" gridSpan={{ default: '6' }}>
            <div>4/4 or 5/5 or 8/8</div>
          </NestedGridItemSmall>
        </GridItemConstrainedSmall>
      </Grid>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span columns depending on breakpoint',
      <Grid>
        <GridItemConstrainedSmall>
          <NestedGridItemSmall
            gridColumnStart="1"
            gridSpan={{
              group1: '1',
              group2: '2',
              group3: '3',
              group4: '4',
              group5: '5',
            }}
          >
            <div>
              {'Spanning a various number of columns depending on breakpoint'}
            </div>
          </NestedGridItemSmall>
        </GridItemConstrainedSmall>
      </Grid>,
    );
  });

  describe('GridItemConstrainedMedium', () => {
    shouldMatchSnapshot(
      'should start at column 1 & span 1',
      <Grid>
        <GridItemConstrainedMedium>
          <NestedGridItemMedium gridColumnStart="1" gridSpan={{ default: '1' }}>
            <div>1/4 or 1/5 or 1/8</div>
          </NestedGridItemMedium>
        </GridItemConstrainedMedium>
      </Grid>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span 8',
      <Grid>
        <GridItemConstrainedMedium>
          <NestedGridItemMedium gridColumnStart="1" gridSpan={{ default: '8' }}>
            <div>4/4 or 5/5 or 8/8</div>
          </NestedGridItemMedium>
        </GridItemConstrainedMedium>
      </Grid>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span columns depending on breakpoint',
      <Grid>
        <GridItemConstrainedMedium>
          <NestedGridItemMedium
            gridColumnStart="1"
            gridSpan={{
              group1: '1',
              group2: '2',
              group3: '3',
              group4: '4',
              group5: '5',
            }}
          >
            <div>
              {'Spanning a various number of columns depending on breakpoint'}
            </div>
          </NestedGridItemMedium>
        </GridItemConstrainedMedium>
      </Grid>,
    );
  });

  describe('GridItemConstrainedLarge', () => {
    shouldMatchSnapshot(
      'should start at column 1 & span 1',
      <Grid>
        <GridItemConstrainedLarge>
          <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '1' }}>
            <div>1/4 or 1/5 or 1/8</div>
          </NestedGridItemLarge>
        </GridItemConstrainedLarge>
      </Grid>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span 8',
      <Grid>
        <GridItemConstrainedLarge>
          <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '8' }}>
            <div>4/4 or 5/5 or 8/8</div>
          </NestedGridItemLarge>
        </GridItemConstrainedLarge>
      </Grid>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span columns depending on breakpoint',
      <Grid>
        <GridItemConstrainedLarge>
          <NestedGridItemLarge
            gridColumnStart="1"
            gridSpan={{
              group1: '1',
              group2: '2',
              group3: '3',
              group4: '4',
              group5: '5',
            }}
          >
            <div>
              {'Spanning a various number of columns depending on breakpoint'}
            </div>
          </NestedGridItemLarge>
        </GridItemConstrainedLarge>
      </Grid>,
    );
  });

  describe('GridItemConstrainedLargeNoMargin', () => {
    shouldMatchSnapshot(
      'should start at column 1 & span 1',
      <Grid>
        <GridItemConstrainedLargeNoMargin>
          <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '1' }}>
            <div>1/4 or 1/5 or 1/8</div>
          </NestedGridItemLarge>
        </GridItemConstrainedLargeNoMargin>
      </Grid>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span 8',
      <Grid>
        <GridItemConstrainedLargeNoMargin>
          <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '20' }}>
            <div>4/4 or 5/5 or 8/8</div>
          </NestedGridItemLarge>
        </GridItemConstrainedLargeNoMargin>
      </Grid>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span columns depending on breakpoint',
      <Grid>
        <GridItemConstrainedLargeNoMargin>
          <NestedGridItemLarge
            gridColumnStart="1"
            gridSpan={{
              group1: '1',
              group2: '2',
              group3: '3',
              group4: '4',
              group5: '5',
            }}
          >
            <div>
              {'Spanning a various number of columns depending on breakpoint'}
            </div>
          </NestedGridItemLarge>
        </GridItemConstrainedLargeNoMargin>
      </Grid>,
    );
    shouldMatchSnapshot(
      'should pop out of grid at Group 5 breakpoint',
      <Grid>
        <PopOutGridItemMedium>Group 5 pop out grid.</PopOutGridItemMedium>
      </Grid>,
    );
  });
});
