import React, { ComponentProps, Fragment } from 'react';
import Head from 'next/head';

import { Card, Spin, InputNumber, Timeline, Drawer, Button } from 'antd';
import { StarFilled, MoreOutlined } from '@ant-design/icons';

import { Map, Marker } from 'react-amap';
import moment from 'moment';

import Container, { Space, TextCenter } from '@/components/container';
import { Context } from '@/utils/global';
import { LoginModal } from '@/components/login';

import { getAll, create } from '@/extensions/queue/api';

import { FormInstance } from 'antd/lib/form';
import { waitUntil } from '@/utils/debounce';

const key = '81533a71a4db0eb8107620d99b954d9d';

interface TravelProps extends ComponentProps<'base'> {
  cities: {
    name: string;
    lng: number;
    lat: number;
    time: number;
  }[];
}

interface TravelState {
  lng: number;
  lat: number;
  zoom: number;
  drawer: boolean;
  ins?: any;
}

class Travel extends React.Component<TravelProps, TravelState> {
  static contextType = Context;
  context!: React.ContextType<typeof Context>;

  static defaultProps: TravelProps = { cities: [] };
  formRef = React.createRef<FormInstance>();

  constructor(props: any) {
    super(props);
    this.state = { lng: 108, lat: 34, zoom: 4, drawer: false };
  }

  static getInitialProps(): TravelProps {
    return {
      cities: [
        { name: '扬州', time: 1491235200, lng: 119.430412, lat: 32.401369 },
        { name: '苏州', time: 1556640000, lng: 120.629989, lat: 31.323712 },
        { name: '庐江', time: 1515686400, lng: 120.629989, lat: 31.323712 },
        { name: '西安', time: 1525363200, lng: 109.285212, lat: 34.385087 },
        { name: '乌镇', time: 1593043200, lng: 120.498308, lat: 30.735381 },
        { name: '西塘', time: 1593187200, lng: 120.890814, lat: 30.944785 },
      ],
    };
  }

  componentDidMount() {}

  getZoom = () => {
    return typeof this.state.ins === 'undefined' ? 0 : this.state.ins.view.Ge.zoom;
  };

  getPos = () => {
    return typeof this.state.ins === 'undefined'
      ? { lng: 0, lat: 0 }
      : {
          lng: this.state.ins.view.Ge.center.lng,
          lat: this.state.ins.view.Ge.center.lat,
        };
  };

  render() {
    const Input = (props: React.PropsWithoutRef<{ name: TypeUInT<TravelState, number> }>) => {
      return (
        <InputNumber
          value={this.state[props.name]}
          onChange={(v) => {
            waitUntil(
              `map_input_${props.name}`,
              () => {
                const num = parseFloat(v.toString());
                const obj = { [props.name]: isNaN(num) ? 0 : num };
                this.setState((state) => ({ ...state, ...obj }));
              },
              200,
            );
          }}
        />
      );
    };
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
          <Input name="lng" />
          <Input name="lat" />
          <Input name="zoom" />

          <div style={{ width: '100%', height: '80vh', overflow: 'hidden' }}>
            <Map
              amapkey={key}
              zoom={this.state.zoom}
              center={{ lng: this.state.lng, lat: this.state.lat }}
              loading={<Spin />}
              mapStyle={
                this.context.theme === 'default' ? 'amap://styles/normal' : 'amap://styles/dark'
              }
              events={
                {
                  // created: (ins) => {
                  //   console.log(ins);
                  //   this.setState({ ins });
                  //   //   window.m = ins;
                  // },
                  // click: (a, b) => {
                  //   console.log('click', a, b);
                  // },
                  // mapmove: (a, b) => {
                  //   waitUntil(
                  //     'map_move',
                  //     () => {
                  //       console.log('move', a, b, this.state.ins.view.Ge);
                  //       this.setState(this.getPos());
                  //     },
                  //     200,
                  //   );
                  // },
                  // zoomend: (a, b) => {
                  //   waitUntil(
                  //     'map_move',
                  //     () => {
                  //       console.log('zoom', a, b);
                  //       this.setState({
                  //         zoom: this.getZoom(),
                  //       });
                  //     },
                  //     200,
                  //   );
                  // },
                }
              }
            >
              <Button
                icon={<MoreOutlined />}
                type="primary"
                shape="circle"
                style={{ position: 'absolute', left: '10px', top: '10px' }}
                onClick={() => this.setState((state) => ({ drawer: !state.drawer }))}
              />
              <Drawer
                getContainer={false}
                closable={false}
                onClose={() => this.setState({ drawer: false })}
                visible={this.state.drawer}
                placement="left"
                style={{ position: 'absolute' }}
              >
                <Timeline mode={'left'}>
                  {this.props.cities.map((item) => (
                    <Timeline.Item label={moment(item.time, 'X').format('YYYY-MM-DD')}>
                      {item.name}
                    </Timeline.Item>
                  ))}
                </Timeline>
              </Drawer>
              {this.props.cities.map((item) => (
                <Marker
                  position={{ longitude: item.lng, latitude: item.lat }}
                  title={`${item.name}-${moment(item.time, 'X').format('YYYY-MM-DD')}`}
                >
                  <StarFilled
                    style={(() => {
                      const color = this.context.theme === 'default' ? 'red' : 'yellow';
                      const filter = `drop-shadow(0px 0px 10px ${color})`;
                      return {
                        color,
                        filter: `${filter} ${filter}`,
                      };
                    })()}
                  />
                </Marker>
              ))}
            </Map>
          </div>
        </Card>
      </Container>
    );
  }
}

export default Travel;
