import React, { ComponentProps } from 'react';
import Head from 'next/head';

import { Card, List } from 'antd';
import Link from 'next/link';

import styles from './apps.less';
import Container from '@/components/container';
import { Context } from '@/utils/global';

interface AppsProps extends ComponentProps<'base'> {
  apps: { name: string; link: string; img: string }[];
}

interface AppsState {}

class Apps extends React.Component<AppsProps, AppsState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  static async getInitialProps() {
    return {
      apps: [
        {
          name: '动森候机大厅',
          link: '/apps/queue',
          img: 'https://static.oyohyee.com/apps/queue.png',
        },
        {
          name: '动森大头菜股价',
          link: '/apps/turnip',
          img: 'https://n.sinaimg.cn/spider202042/363/w700h463/20200402/8c4c-irtymmv3834811.jpg',
        },
      ],
    } as AppsProps;
  }

  render() {
    return (
      <Container>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`应用列表|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <Card>
          <List
            grid={{ column: 3 }}
            itemLayout="horizontal"
            dataSource={this.props.apps}
            renderItem={(item) => (
              <List.Item key={item.name} className={styles.item}>
                <Link href={item.link}>
                  <a>
                    <div className={styles.img_wrapper}>
                      <img className={styles.img} src={item.img} />
                    </div>
                    {item.name}
                  </a>
                </Link>
              </List.Item>
            )}
          />
        </Card>
      </Container>
    );
  }
}

export default Apps;
