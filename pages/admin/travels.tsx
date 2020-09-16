import React, { ComponentProps } from 'react';
import Head from 'next/head';

import moment from '@/utils/moment';

import Card from '@/components/card';
import Input, { DatePicker } from '@/components/input';
import Popover from '@/components/popover';

import { Plus, Delete, Save } from '@/components/svg';
import TravelMap from '@/components/travel_map';
import { Context } from '@/utils/global';
import { posts, tagsSearch, travels_set, travels_get } from '@/utils/api';
import ShowNotification from '@/utils/notification';
import { Flex } from '@/components/container';
import Button from '@/components/button';
import Loading from '@/components/loading';

type setStateCallback<T> = (pre: T) => Partial<T>;

interface TravelProps extends ComponentProps<'base'> {}

interface TravelState {
  ins?: any;
  cities: Blotter.City[];
  search: Blotter.PostCard[];
  tagID?: string;
  loading: boolean;
}

class Travel extends React.Component<TravelProps, TravelState> {
  geocoder?: any;

  constructor(props: any) {
    super(props);
    this.state = {
      ins: undefined,
      search: [],
      tagID: undefined,
      loading: false,
      cities: [],
    };
  }
  async componentDidMount() {
    tagsSearch('游记')
      .then((r) => {
        const tags = r.tags.filter((item) => item.name === '游记' && item.short === 'travels');
        if (tags.length > 0) this.setState({ tagID: tags[0].id });
      })
      .catch(console.error);
    this.setState({ loading: true });
    travels_get()
      .then((r) => this.setState({ cities: r.travels }))
      .catch(console.error)
      .finally(() => this.setState({ loading: false }));
  }

  getPosition = (value: string, callback: (lat: number, lng: number) => void) => {
    const AMap = (window as any).AMap;
    const ins = this.state.ins;
    if (!this.geocoder) {
      if (!AMap) {
        ShowNotification({ success: false, title: '发生错误', content: '请等待地图组件加载完毕' });
        throw 'Amap not initial.';
      }
      AMap.plugin('AMap.Geocoder', () => {
        this.geocoder = new AMap.Geocoder({});
      });
    }
    this!.geocoder.getLocation(value, function (status, result) {
      if (status === 'complete' && result.geocodes.length) {
        const { lng, lat } = result.geocodes[0].location;
        callback(lat, lng);
        ins.setZoomAndCenter(15, [lng, lat]);
      } else {
        ShowNotification({ success: false, title: '发生错误', content: '未找到对应地址' });
      }
    });
  };

  getIns = () => {
    if (!!this.state.ins) return this.state.ins;
    ShowNotification({ success: false, title: '发生错误', content: '请等待地图组件加载完毕' });
    throw 'Amap not initial.';
  };

  CityInput: React.FC<{
    index: number;
    name: TypeUInT<Blotter.City, string | number>;
    label: string;
  }> = (props) => {
    const { index, name, label } = props;
    return (
      <div>
        <Input
          label={label}
          placeholder={label}
          value={this.state.cities[index][name].toString()}
          onChange={(value) => {
            this.setCity(index, (pre) => ({
              ...pre,
              [name]: name === 'name' ? value : parseFloat(value),
            }));
          }}
        />
      </div>
    );
  };

  setCity = (index: number, callback: setStateCallback<Blotter.City>) => {
    this.setState((state) => {
      var { cities } = state;
      cities[index] = { ...cities[index], ...callback(cities[index]) };
      return { cities };
    });
  };
  setTravel = (
    index: number,
    index2: number,
    callback: setStateCallback<{
      time: number;
      link: string;
    }>,
  ) => {
    this.setCity(index, (city) => {
      city.travels[index2] = { ...city.travels[index2], ...callback(city.travels[index2]) };
      return city;
    });
  };

  renderCity = (city: Blotter.City, index: number) => {
    const CityInput = this.CityInput;
    const onSearch = async (value: string) => {
      const r = await posts({ search: value, search_fields: 'title', with_tags: this.state.tagID });
      this.setState({ search: r.posts });
    };
    return (
      <Flex key={index} direction="TB" fullWidth>
        <Flex>
          <CityInput index={index} name="name" label="地点" />
          <CityInput index={index} name="lat" label="经度" />
          <CityInput index={index} name="lng" label="纬度" />
          <CityInput index={index} name="zoom" label="缩放倍数" />

          <Button
            neumorphism
            size="small"
            onClick={() => {
              const name = this.state.cities[index].name;
              this.getPosition(name, (lat, lng) => {
                this.setCity(index, (pre) => ({ lat, lng }));
              });
            }}
          >
            搜索坐标
          </Button>

          <Popover
            card
            shadow
            trigger={['click']}
            component={
              <Card>
                <Flex>
                  确认删除？
                  <Button
                    danger
                    primary
                    neumorphism
                    size="small"
                    onClick={() => {
                      this.setState((state) => ({
                        cities: state.cities.filter((_, idx) => idx != index),
                      }));
                    }}
                  >
                    删除
                  </Button>
                </Flex>
              </Card>
            }
          >
            <Button danger neumorphism size="small" prefix={<Delete />}>
              删除
            </Button>
          </Popover>
          <Button
            neumorphism
            size="small"
            prefix={<Plus />}
            onClick={() => {
              this.setCity(index, (pre) => ({
                travels: pre.travels.concat({ time: 0, link: '' }).sort((a, b) => a.time - b.time),
              }));
            }}
          >
            新建
          </Button>
        </Flex>
        <Flex direction="TB" fullWidth>
          {city.travels.map((item, index2) => (
            <Flex key={index2} style={{ marginLeft: 50 }}>
              <DatePicker
                label="日期"
                value={item.time * 1000}
                style={{ width: '100%' }}
                onChange={(time) => {
                  this.setTravel(index, index2, (pre) => ({ ...pre, time: time / 1000 }));
                }}
                type="date"
              />

              <Input<string>
                label="文章"
                placeholder="搜索游记文章"
                value={item.link}
                style={{ width: '100%' }}
                onChange={onSearch}
                onSelect={(key, value) =>
                  this.setTravel(index, index2, (pre) => ({
                    ...pre,
                    link: value,
                  }))
                }
                options={this.state.search.map((item) => ({ key: item.title, value: item.url }))}
              />

              <Popover
                card
                shadow
                trigger={['click']}
                component={
                  <Card>
                    <Flex>
                      确认删除？
                      <Button
                        danger
                        primary
                        neumorphism
                        size="small"
                        onClick={() => {
                          this.setCity(index, (pre) => ({
                            travels: pre.travels.filter((_, idx) => idx != index2),
                          }));
                        }}
                      >
                        删除
                      </Button>
                    </Flex>
                  </Card>
                }
              >
                <Button danger neumorphism size="small">
                  删除
                </Button>
              </Popover>
            </Flex>
          ))}
        </Flex>
      </Flex>
    );
  };

  render() {
    return (
      <Card>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`游记编辑|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <Flex direction="TB" fullWidth mainAxis="flex-end">
          <TravelMap cities={this.state.cities} onCreate={(ins) => this.setState({ ins })} />
          <Flex mainAxis="space-around">
            <Button
              neumorphism
              loading={this.state.loading}
              onClick={async () => {
                this.setState({ loading: true });
                travels_set(this.state.cities)
                  .then(ShowNotification)
                  .catch(console.error)
                  .finally(() => this.setState({ loading: false }));
              }}
              prefix={<Save />}
            >
              保存
            </Button>

            <Button
              primary
              neumorphism
              onClick={() =>
                this.setState((state) => ({
                  cities: [{ name: '', lng: 0, lat: 0, zoom: 15, travels: [] }, ...state.cities],
                }))
              }
              prefix={<Plus />}
            >
              新建城市
            </Button>
          </Flex>

          <Loading loading={this.state.loading}>
            <Flex direction="TB" fullWidth>
              {this.state.cities.map(this.renderCity)}
            </Flex>
          </Loading>
        </Flex>
      </Card>
    );
  }
}

export default Travel;
