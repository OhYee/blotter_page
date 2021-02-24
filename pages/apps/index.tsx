import React, { ComponentProps, CSSProperties } from 'react';
import Head from 'next/head';

import Card from '@/components/card';
import Avatar from '@/components/avatar';
import SVG, { Compass, IconName, IconNames } from '@/components/svg';
import Button, { A } from '@/components/button';
import Link from 'next/link';
import { Flex } from '@/components/container';

import styles from './apps.module.scss';
import { Context } from '@/utils/global';

const imageSuffix = ['jpg', 'gif', 'jpeg', 'png', 'svg', 'bmp'];

function isImageUrl(url: string): boolean {
  const suffix = url.split('.').slice(-1)[0].toLowerCase();
  return imageSuffix.indexOf(suffix) != -1;
}

interface AppsProps extends ComponentProps<'base'> {
  apps: { name: string; link: string; img?: string; icon?: IconName; style?: CSSProperties }[];
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
        // {
        //   name: '动森候机大厅',
        //   link: '/apps/queue',
        //   img: 'https://static.oyohyee.com/apps/queue.png',
        // },
        {
          name: '在线密码学',
          link: '/apps/crypto',
          icon: 'lock',
          style: { color: ' #109025' },
        },
        {
          name: '游记',
          link: '/apps/travels',
          icon: 'compass',
          style: { color: ' #f30000' },
        },
        {
          name: '席卡族文字编码',
          link: '/apps/sheika',
          icon: 'https://static.oyohyee.com/apps/sheika.svg',
        },
      ],
    } as AppsProps;
  }

  render() {
    return (
      <Card neumorphism>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`应用列表|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <Flex mainAxis="space-around">
          {this.props.apps.map((item) => (
            <Flex key={item.name} direction="TB" fullWidth>
              <Link href={item.link} key={item.name} passHref>
                <A
                  neumorphism
                  icon={
                    typeof item.img !== 'undefined' ? (
                      <Avatar src={item.img} style={{ fontSize: 64, ...item.style }} />
                    ) : (
                      <Avatar style={{ fontSize: 64, ...item.style }}>
                        {IconNames.indexOf(item.icon) === -1 ? (
                          <img src={item.icon} />
                        ) : (
                          <SVG icon={item.icon} />
                        )}
                      </Avatar>
                    )
                  }
                  style={{ fontSize: 64, borderRadius: 10 }}
                />
              </Link>
              <p style={{ textAlign: 'center' }}>{item.name}</p>
            </Flex>
          ))}
        </Flex>
      </Card>
    );
  }
}

export default Apps;
