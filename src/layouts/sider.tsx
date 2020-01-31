import React from 'react';
import { Row, Divider } from 'antd';

import MenuPart from '@/components/menu';
import { ReactComponent as Logo } from '@/assets/logo.svg';

import styles from './sider.less';

type SiderPartProps = { menus: Blotter.Menu[]; collapsed: boolean };
type SiderPartState = {};

class SiderPart extends React.Component<SiderPartProps, SiderPartState> {
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

        <MenuPart menus={this.props.menus} />
      </div>
    );
  }
}

export default SiderPart;
