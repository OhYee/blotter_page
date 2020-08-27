import React, { ComponentProps, CSSProperties } from 'react';
import Head from 'next/head';

import { Avatar, Card, List } from 'antd';
import { Icon } from '@ant-design/compatible';
import Link from 'next/link';

import styles from './apps.less';
import { Context } from '@/utils/global';

const imageSuffix = ['jpg', 'gif', 'jpeg', 'png', 'svg', 'bmp'];

function isImageUrl(url: string): boolean {
  const suffix = url.split('.').slice(-1)[0].toLowerCase();
  return imageSuffix.indexOf(suffix) != -1;
}

interface AppsProps extends ComponentProps<'base'> {
  apps: { name: string; link: string; img?: string; icon?: string; style?: CSSProperties }[];
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
          style: { color: ' #109025' },
        },
        {
          name: '游记',
          link: '/apps/travels',
          icon: 'compass',
          style: { color: ' #f30000' },
        },
      ],
    } as AppsProps;
  }

  render() {
    return (
      <Card>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`应用列表|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <div className={styles.container}>
          {this.props.apps.map((item) => (
            <Link href={item.link} key={item.name}>
              <a className={[styles.wrapper, 'text-color'].join(' ')}>
                <div className={styles.img}>
                  {typeof item.img !== 'undefined' ? (
                    isImageUrl(item.img) ? (
                      <Avatar size={64} src={item.img} style={item.style} />
                    ) : (
                      <Avatar size={64} style={item.style}>
                        {item.img}
                      </Avatar>
                    )
                  ) : (
                    <Avatar size={64} icon={<Icon type={item.icon} />} style={item.style} />
                  )}
                </div>
                <p>{item.name}</p>
              </a>
            </Link>
          ))}
        </div>
      </Card>
    );
  }
}

export default Apps;
