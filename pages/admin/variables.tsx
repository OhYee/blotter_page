import React, { ComponentProps } from 'react';

import Head from 'next/head';

import { Card, Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


import { variables, variablesSet } from '@/utils/api';
import { Context } from '@/utils/global';
import DynamicForm from '@/components/dynamic_form';
import ShowNotification from '@/utils/notification';

interface AdminVariablesProps extends ComponentProps<'base'> {}

interface AdminVariablesState {
  loading: boolean;
  variables: { [key: string]: any };
}

class AdminVariables extends React.Component<AdminVariablesProps, AdminVariablesState> {
  static defaultProps: AdminVariablesProps = {};

  constructor(props: AdminVariablesProps) {
    super(props);
    this.state = {
      loading: false,
      variables: [],
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    var r = await variables();
    var obj: { [key: string]: any } = {};
    for (var i in r) {
      obj[r[i].key] = r[i].value;
    }
    this.setState({ variables: obj, loading: false });
  }

  render() {
    return (
      <Card style={{ overflow: 'auto' }}>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`变量列表|后台|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <div style={{ minWidth: 1000 }}>
          <DndProvider backend={HTML5Backend}>
            <DynamicForm
              value={this.state.variables}
              callback={(value) => {
                this.setState({ variables: value });
              }}
            />
          </DndProvider>
        </div>
        <Button
          shape="circle"
          size="large"
          type="primary"
          icon={<SaveOutlined />}
          className="shadow"
          onClick={async () => {
            const v = this.state.variables;
            const data = Object.keys(v).map((key) => ({ key, value: v[key] }));
            var r = await variablesSet(data);
            ShowNotification(r);
          }}
          style={{ position: 'fixed', right: '20px', top: '120px' }}
        />
      </Card>
    );
  }
}

export default AdminVariables;
