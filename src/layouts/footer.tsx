import React from 'react';
import { Divider, Row, Col, Table, Icon } from 'antd';

import Container from '@/components/container';
import Link from 'umi/link';

import styles from './footer.less';
import { requestCallback } from '@/utils/request';

import { ColumnProps } from 'antd/es/table';

type FooterPartProps = {
  view: number;
  beian: string;
};
type FooterPartState = {};

class FooterPart extends React.Component<FooterPartProps, FooterPartState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Container>
        <div className={styles.footer}>
          <p>© 2017 – {new Date().getFullYear()}</p>
          <p>
            <Icon type="eye" style={{ fontSize: '0.75em' }} /> 全站访问量 {this.props.view}
          </p>
          <p>
            <Link to="http://beian.miit.gov.cn/">{this.props.beian}</Link>
          </p>
          <p>
            Powered by <Link to="github.com/OhYee/blotter">Blotter</Link> (Go + React)
          </p>
        </div>
      </Container>
    );
  }
}

export default FooterPart;
