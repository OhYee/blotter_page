import React, { ComponentProps } from 'react';
import Head from 'next/head';

import moment from 'moment';

import { Card, List, Form, Input, Button, DatePicker, Row, Col, Popconfirm, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';

import TravelMap from '@/components/travel_map';
import Container, { Space } from '@/components/container';
import { Context } from '@/utils/global';
import { posts, tagsSearch, travels_set, travels_get } from '@/utils/api';
import ShowNotification from '@/utils/notification';

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
        <strong>{label}：</strong>
        <Input
          placeholder={label}
          value={this.state.cities[index][name]}
          onChange={(e) => {
            const value = e.target.value;
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
      <List.Item key={index}>
        <Row gutter={[5, 5]}>
          <Col flex={1}>
            <CityInput index={index} name="name" label="地点" />
          </Col>
          <Col flex={1}>
            <CityInput index={index} name="lat" label="经度" />
          </Col>
          <Col flex={1}>
            <CityInput index={index} name="lng" label="纬度" />
          </Col>
          <Col flex={1}>
            <CityInput index={index} name="zoom" label="缩放倍数" />
          </Col>
        </Row>
        <Row gutter={[5, 5]} justify="end">
          <Col>
            <Button
              onClick={() => {
                const name = this.state.cities[index].name;
                this.getPosition(name, (lat, lng) => {
                  this.setCity(index, (pre) => ({ lat, lng }));
                });
              }}
            >
              搜索坐标
            </Button>
          </Col>
          <Col>
            <Popconfirm
              title="确认删除？"
              onConfirm={() => {
                this.setState((state) => ({
                  cities: state.cities.filter((_, idx) => idx != index),
                }));
              }}
            >
              <Button danger>删除</Button>
            </Popconfirm>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => {
                this.setCity(index, (pre) => ({
                  travels: pre.travels
                    .concat({ time: 0, link: '' })
                    .sort((a, b) => a.time - b.time),
                }));
              }}
            >
              新建
            </Button>
          </Col>
        </Row>
        <List
          itemLayout="vertical"
          style={{ marginLeft: 50 }}
          dataSource={city.travels}
          renderItem={(item, index2) => (
            <List.Item>
              <Row gutter={[5, 5]} justify="end">
                <Col flex={1}>
                  <Row justify="space-between">
                    <Col>
                      <strong>日期： </strong>
                    </Col>
                    <Col flex="1 1 auto">
                      <DatePicker
                        value={moment(item.time, 'X')}
                        style={{ width: '100%' }}
                        onChange={(e) => {
                          const time = !!e ? e.unix() : 0;
                          this.setTravel(index, index2, (pre) => ({ ...pre, time }));
                        }}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col flex={1}>
                  <Row justify="space-between">
                    <Col>
                      <strong>文章： </strong>
                    </Col>
                    <Col flex="1 1 auto">
                      <Select
                        showSearch
                        autoFocus={true}
                        placeholder="搜索游记文章"
                        style={{ width: '100%' }}
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        filterOption={false}
                        onSearch={onSearch}
                        onChange={(e) =>
                          this.setTravel(index, index2, (pre) => ({
                            ...pre,
                            link: e.toString(),
                          }))
                        }
                        notFoundContent={null}
                      >
                        {this.state.search.map((post) => (
                          <Select.Option key={post.url} value={post.url}>
                            {post.title}
                          </Select.Option>
                        ))}
                      </Select>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Popconfirm
                    title="确认删除？"
                    onConfirm={() => {
                      this.setCity(index, (pre) => ({
                        travels: pre.travels.filter((_, idx) => idx != index2),
                      }));
                    }}
                  >
                    <Button danger>删除</Button>
                  </Popconfirm>
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </List.Item>
    );
  };

  render() {
    return (
      <Container>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`游记编辑|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <Card>
          <Space>
            <TravelMap cities={this.state.cities} onCreate={(ins) => this.setState({ ins })} />
            <Row justify="end">
              <Col>
                <Row gutter={[10, 10]}>
                  <Col>
                    <Button
                      type="primary"
                      loading={this.state.loading}
                      onClick={async () => {
                        this.setState({ loading: true });
                        travels_set(this.state.cities)
                          .then(ShowNotification)
                          .catch(console.error)
                          .finally(() => this.setState({ loading: false }));
                      }}
                    >
                      保存
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      type="primary"
                      onClick={() =>
                        this.setState((state) => ({
                          cities: [
                            { name: '', lng: 0, lat: 0, zoom: 15, travels: [] },
                            ...state.cities,
                          ],
                        }))
                      }
                    >
                      新建城市
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <List
              renderItem={this.renderCity}
              dataSource={this.state.cities}
              itemLayout="vertical"
              loading={this.state.loading}
            />
          </Space>
        </Card>
      </Container>
    );
  }
}

export default Travel;
