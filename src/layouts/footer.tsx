import React from 'react';
import { Divider, Row, Col, Table, Icon } from 'antd';

import Container from '@/components/container';
import Link from 'umi/link';

import styles from './footer.less';
import { requestCallback } from '@/utils/request';

import { ColumnProps } from 'antd/es/table';

type FooterState = {
  view: number;
  beian: string;
};
class FooterPart extends React.Component<{}, FooterState> {
  columns: ColumnProps<Blotter.Site>[] = [
    {
      title: 'k',
      key: 'left',
      dataIndex: 'left',
    },
    {
      title: 'v',
      key: 'right',
      dataIndex: 'right',
    },
  ];
  constructor(props: any) {
    super(props);
    this.state = { view: 0, beian: '' };
  }

  componentDidMount() {
    requestCallback(
      'get',
      '/api/variables',
      { keys: 'view,beian' },
      (data: { beian: string; view: number }) =>
        this.setState({ beian: data.beian, view: data.view }),
    );
  }

//   makeDateSource = () => {
//     var keys: ('view' | 'beian')[] = ['view', 'beian'];
//     var dataSource = [];
//     for (var i = 0; i < keys.length; i++) {
//       dataSource.push({
//         key: i,
//         left: keys[i],
//         right: this.state.site[keys[i]],
//       });
//     }
//     console.log(dataSource);
//     return dataSource;
//   };

  render() {
    return (
      <Container>
        <div className={styles.footer}>
          <p>© 2017 – {new Date().getFullYear()}</p>
          <p>
            <Icon type="eye" style={{ fontSize: '0.75em' }} /> 全站访问量 {this.state.view}
          </p>
          <p>
            <Link to="http://beian.miit.gov.cn/">{this.state.beian}</Link>
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
