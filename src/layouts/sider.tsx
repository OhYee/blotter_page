import React from 'react';
import MenuPart from '../components/menu';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { Row, Divider } from 'antd';

import styles from './sider.less';

class SiderPart extends React.Component<{ collapsed: boolean }, {}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className={styles.sider}>
        <Row type="flex" justify="center" className={styles.avatar}>
          <Logo width={100} height={100} style={{ background: 'white', borderRadius: '100px' }} />
        </Row>

        <Divider className={this.props.collapsed ? styles.divider : undefined}>
          <b className={styles.divider}>OhYee</b>
        </Divider>

        <MenuPart />
      </div>
    );
  }
}

export default SiderPart;
