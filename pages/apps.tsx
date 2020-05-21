import React, { ComponentProps, CSSProperties } from 'react';
import Head from 'next/head';

import { Avatar, Card, List } from 'antd';
import { LockFilled } from '@ant-design/icons';
import Link from 'next/link';

import styles from './apps.less';
import Container from '@/components/container';
import { Context } from '@/utils/global';

const imageSuffix = ['jpg', 'gif', 'jpeg', 'png', 'svg', 'bmp'];

function isImageUrl(url: string): boolean {
  const suffix = url.split('.').slice(-1)[0].toLowerCase();
  return imageSuffix.indexOf(suffix) != -1;
}

interface AppsProps extends ComponentProps<'base'> {
  apps: { name: string; link: string; img: string | JSX.Element; style?: CSSProperties }[];
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
          name: '在线密码学',
          link: '/apps/crypto',
          img: 'Crypto',
          style: { color: ' #109025', backgroundColor: '#a6d2a8' },
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
                      {typeof item.img === 'string' ? (
                        isImageUrl(item.img) ? (
                          <Avatar size={64} src={item.img} style={item.style} />
                        ) : (
                          <Avatar size={64} style={item.style}>
                            {item.img}
                          </Avatar>
                        )
                      ) : (
                        <Avatar size={64} icon={item.img} style={item.style} />
                      )}
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
