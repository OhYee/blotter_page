import React, { ComponentProps, CSSProperties } from 'react';
import Link from 'next/link';

import { Map, Marker } from 'react-amap';

import If from '@/components/if';
import { Star, Dots, FullScreen, FullScreenExit } from '@/components/svg';
import Button from '@/components/button';
import Popover from '@/components/popover';
import Loading from '@/components/loading';
import Card from '@/components/card';
import { Flex } from '@/components/container';
import Timeline from '@/components/timeline';
import Drawer from '@/components/drawer';

import moment from '@/utils/moment';
import { Context } from '@/utils/global';

import shadowStyles from '@/styles/shadow.less';

const key = '81533a71a4db0eb8107620d99b954d9d';

interface TravelMapProps extends ComponentProps<'base'> {
  onCreate?: (ins: any) => void;
  cities: Blotter.City[];
  style?: CSSProperties;
}

interface TravelMapState {
  drawer: boolean;
  ins?: any;
  full: boolean;
}

class TravelMap extends React.Component<TravelMapProps, TravelMapState> {
  static contextType = Context;
  context!: React.ContextType<typeof Context>;

  static defaultProps: TravelMapProps = { cities: [] };

  constructor(props: any) {
    super(props);
    this.state = { drawer: false, full: false };
  }

  getZoom = (): number => {
    return typeof this.state.ins === 'undefined' ? 0 : this.state.ins.getZoom();
  };

  getPos = (): { P: number; Q: number; lng: number; lat: number } => {
    return typeof this.state.ins === 'undefined'
      ? { P: 0, Q: 0, lng: 0, lat: 0 }
      : this.state.ins.getCenter();
  };

  render() {
    return (
      <div
        style={
          this.state.full
            ? {
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 500,
                overflow: 'hidden',
              }
            : {
                width: '100%',
                height: '80vh',
                overflow: 'hidden',
                zIndex: 1,
                position: 'relative',
                ...this.props.style,
              }
        }
      >
        <Map
          amapkey={key}
          loading={<Loading />}
          mapStyle={
            this.context.theme === 'default'
              ? 'amap://styles/f5818203233e77c81d9a6555be54758a'
              : 'amap://styles/dark'
          }
          plugins={['MapType', 'Scale', 'ToolBar']}
          events={{
            created: (ins) => {
              this.setState({ ins });
              (window as any).m = ins;
              ins.setCity('中国');
              if (!!this.props.onCreate) this.props.onCreate(ins);
            },
          }}
        >
          <Button
            icon={<Dots />}
            primary
            circle
            style={{ position: 'absolute', left: '10px', top: '10px' }}
            onClick={() => this.setState((state) => ({ drawer: !state.drawer }))}
          />
          <Button
            icon={this.state.full ? <FullScreenExit /> : <FullScreen />}
            circle
            style={{ position: 'absolute', right: '60px', bottom: '30px' }}
            onClick={() => this.setState((state) => ({ full: !state.full }))}
          />
          <Drawer
            onClose={() => this.setState({ drawer: false })}
            show={this.state.drawer}
            placement="left"
            containerStyle={{ position: 'absolute' }}
            style={{ width: '250px' }}
          >
            <Card
              shadow
              style={{
                background: 'var(--background)',
                transition: 'background var(--transition-time)',
                height: '100%',
                overflow: 'auto',
              }}
            >
              <Timeline
                data={this.props.cities
                  .map((item) => {
                    var result: (typeof item & { time: number; link: string })[] = [];
                    item.travels.map((i) => result.push({ ...item, ...i }));
                    return result;
                  })
                  .reduce((a, b) => a.concat(b), [])
                  .sort((a, b) => a.time - b.time)
                  .map((item, idx) => ({
                    time: moment(item.time, 'X').format('YYYY-MM-DD'),
                    name: (
                      <React.Fragment>
                        <a
                          onClick={() => {
                            this.setState({
                              drawer: false,
                            });
                            this.state.ins.setZoomAndCenter(item.zoom, [item.lng, item.lat]);
                          }}
                        >
                          {item.name}
                        </a>
                        <If condition={!!item.link}>
                          {' - '}
                          <Link href="/post/[url]" as={`/post/${item.link}`}>
                            <a>游记</a>
                          </Link>
                        </If>
                      </React.Fragment>
                    ),
                  }))}
              />
            </Card>
          </Drawer>
          {this.props.cities.map((item, idx) => (
            <Marker key={idx} position={{ longitude: item.lng, latitude: item.lat }}>
              <Popover
                placement="top"
                trigger={['click', 'hover']}
                popoverClass={shadowStyles.shadow}
                popoverStyle={
                  {
                    boxShadow: '5px 5px 30px var(--shadow)',
                    ['--popover-backgroud']: 'var(--background)',
                  } as React.CSSProperties
                }
                component={
                  <Card style={{ background: 'var(--background)', maxWidth: 200 }}>
                    <Flex direction="TB" fullWidth>
                      {[
                        <strong key="name">{item.name}</strong>,
                        ...item.travels
                          .sort((a, b) => a.time - b.time)
                          .map((c) => (
                            <Flex key={c.time}>
                              {moment(c.time, 'X').format('YYYY-MM-DD')}
                              <If condition={!!c.link}>
                                <Link href="/post/[url]" as={`/post/${c.link}`}>
                                  <a>游记</a>
                                </Link>
                              </If>
                            </Flex>
                          )),
                      ]}
                    </Flex>
                  </Card>
                }
              >
                <Star
                  style={(() => {
                    const color = this.context.theme === 'default' ? 'red' : 'yellow';
                    const filter = `drop-shadow(0px 0px 10px ${color})`;
                    return {
                      color,
                      filter,
                    };
                  })()}
                />
              </Popover>
            </Marker>
          ))}
        </Map>
      </div>
    );
  }
}

export default TravelMap;
