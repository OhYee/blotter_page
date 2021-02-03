import React, { ComponentProps } from 'react';

import Head from 'next/head';
import getConfig from 'next/config';

import Card from '@/components/card';
import { Flex } from '@/components/container';

import { Context } from '@/utils/global';

class Version extends React.Component<{}, { version: string }> {
  render() {
    return (
      <Context.Consumer>
        {(context) => (
          <Card neumorphism>
            <Head>
              <title>{`版本信息|${context.blog_name}`}</title>
            </Head>
            <Flex direction="TB" fullWidth>
              <p>
                <b>前端部署版本</b> {context.front_version}
              </p>
              <p>
                <b>后端编译版本</b> {context.back_version}
              </p>
            </Flex>
          </Card>
        )}
      </Context.Consumer>
    );
  }
}

export default Version;
