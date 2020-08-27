import React, { ComponentProps } from 'react';
import Head from 'next/head';

import { Card } from 'antd';

import TravelMap from '@/components/travel_map';
import { Context } from '@/utils/global';
import { travels_get } from '@/utils/api';

interface TravelProps extends ComponentProps<'base'> {
  cities: Blotter.City[];
}

interface TravelState {}

class Travel extends React.Component<TravelProps, TravelState> {
  static defaultProps: TravelProps = { cities: [] };

  constructor(props: any) {
    super(props);
  }

  static async getInitialProps() {
    const r = await travels_get();
    return { cities: r.travels };
  }

  render() {
    return (
      <Card>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`游记|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <TravelMap cities={this.props.cities} />
      </Card>
    );
  }
}

export default Travel;
