import React, { ComponentProps, Fragment } from 'react';
import Head from 'next/head';

import { Card, Spin } from 'antd';

import { Map, Marker } from 'react-amap';

import Container, { Space, TextCenter } from '@/components/container';
import { Context } from '@/utils/global';
import { LoginModal } from '@/components/login';

import { getAll, create } from '@/extensions/queue/api';

import { FormInstance } from 'antd/lib/form';

const key = '81533a71a4db0eb8107620d99b954d9d';

interface QueuesProps extends ComponentProps<'base'> {}

interface QueuesState {}

class Travel extends React.Component<QueuesProps, QueuesState> {
  static contextType = Context;
  context!: React.ContextType<typeof Context>;

  static defaultProps: QueuesProps = {};
  formRef = React.createRef<FormInstance>();

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Container>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`游记|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <Card>
          <div style={{ width: '100%', height: '80vh' }}>
            <Map
              amapkey={key}
              zoom={-50}
              loading={<Spin />}
              events={{
                created: (ins) => {
                  console.log(ins);
                  window.m = ins;
                },
                click: (a, b) => {
                  console.log('click', a, b);
                },
                mapmove: (a, b) => {
                  console.log('move', a, b);
                },
                zoomend: (a, b) => {
                  console.log('zoom', a, b);
                },
              }}
            >
              <Marker />
            </Map>
          </div>
        </Card>
      </Container>
    );
  }
}

export default Travel;
