import React, { ComponentProps, Fragment } from 'react';

import { NextPageContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import QuickLogin from '@/components/auth';
import Button from '@/components/button';
import Card from '@/components/card';
import Input, { CheckBox, Hint } from '@/components/input';
import { Modal } from '@/components/popover';
import { Flex } from '@/components/container';
import { User, Lock } from '@/components/svg';
import Async from '@/components/async';

import { Context } from '@/utils/global';
import { checkUsername, register } from '@/utils/api';
import ShowNotification from '@/utils/notification';

interface RegisterProps extends ComponentProps<'base'> {}

interface RegisterState {
  loading: boolean;
  username: string;
  password: string;
  repeat: string;
  checked: boolean;
  goodUsername: boolean;
}

class Register extends React.Component<RegisterProps, RegisterState> {
  static defaultProps = { posts: [] };

  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      username: '',
      password: '',
      repeat: '',
      checked: false,
      goodUsername: false,
    };
  }

  agreement = () => {
    Modal.info({
      children: (
        <div style={{ height: '75vh', overflow: 'auto', fontSize: 16 }}>
          <h1>用户协议</h1>
          <p>
            尊敬的用户您好，欢迎您访问<strong>OhYee博客</strong>
            （以下简称：博客）。在您注册成为博客会员之前，请您务必认真阅读和理解《用户协议》（以下简称：协议）中所有的条款。您须完全同意协议中所有的条款，才可
            <p>
              以注册成为本博客的会员，使用里面的服务。您在博客的注册和操作均将被视为是您对协议所有条款及内容的自愿接受。
            </p>
            <p>
              <h3>第一条 声明</h3>
              <p style={{ marginLeft: '2em' }}>
                <p>（一）博客内部分资源文章所有权归本博客所有。</p>
                <p>
                  （二）您在博客进行注册时，一旦点击“我接受”按钮，即表示为您已自愿接受协议中所有的条款和内容。
                </p>
                <p>（三）协议条款的效力范围仅限于本博客，您在博客的行为均受协议的约束。</p>
                <p>（四）您使用博客服务的行为，即被视为您已知悉本博客的相关公告并同意。</p>
                <p>
                  （五）本博客有权在未提前通知您的情况下修改协议的条款，您每次进入博客在使用服务前，都应先查阅一遍协议。
                </p>
                <p>
                  （六）本博客有权在未提前通知您的情况下修改、暂停博客部分或全部的服务，且不承担由此产生来自您和第三方的任何责任。
                </p>
                <p>
                  （七）本博客提供免费注册服务，您的注册均是自愿行为，注册成功后，您可以得到博客更加完善的服务。
                </p>
                <p>
                  （八）您注册成为会员后账户和密码如有灭失，不会影响到您个人生活，本博客可恢复您的注册账户及相关信息但不承担除此以外的其它任何责任。
                </p>
              </p>
            </p>
            <p>
              <h3> 第二条 用户管理</h3>
              <p style={{ marginLeft: '2em' }}>
                <p>
                  （一）您在本博客的所有行为都须符合中国的法律法规，您不得利用本博客提供的服务制作、复制、发布、传播以下信息：
                </p>
                <p style={{ marginLeft: '2em' }}>
                  <p>1、反对宪法基本原则的； </p>
                  <p>2、危害国家安全、泄露国家秘密、颠覆国家政权、破坏国家统一的；</p>
                  <p>3、损害国家荣誉和利益的； </p>
                  <p>4、煽动民族仇恨、民族歧视、破坏民族团结的；</p>
                  <p>5、破坏国家宗教政策，宣扬邪教和封建迷信的；</p>
                  <p>6、散布谣言、扰乱社会秩序、破坏社会稳定的；</p>
                  <p>7、散布淫秽、色情、赌博、暴力、凶杀、恐怖内容或者教唆犯罪的；</p>
                  <p>8、侮辱或者诽谤他人，侵害他人合法权益的；</p>
                  <p> 9、以及法律、法规禁止的其他内容；</p>
                </p>
                <p>
                  （二）您在本博客的行为，还必须符合其它国家和地区的法律规定以及国际法的有关规定。
                </p>
                <p> （三）不得利用本博客从事以下活动：</p>
                <p style={{ marginLeft: '2em' }}>
                  <p>1、未经允许，进入他人计算机信息网络或者使用他人计算机信息网络的资源；</p>
                  <p>2、未经允许，对他人计算机信息网络的功能进行删除、修改或增加；</p>
                  <p>
                    3、未经允许，对他人计算机信息网络中存储、处理或者传输的数据和应用程序进行删除、修改或者增加；
                  </p>
                  <p>4、制作、故意传播计算机病毒等破坏性程序的；</p>
                  <p> 5、其他危害计算机信息网络安全的行为；</p>
                </p>
                <p>（四）遵守本博客其他规定和程序： </p>
                <p style={{ marginLeft: '2em' }}>
                  <p>1、您对自己在本博客中的行为和操作承担全部责任；</p>
                  <p>
                    2、您承担责任的形式包括但不仅限于，对受到侵害者进行赔偿、在本博客首先承担了因您的行为导致的行政处罚或侵权损害赔偿责任后，您应给予本博客的等额赔偿；
                  </p>
                  <p>
                    3、如果本博客发现您传输的信息含有本协议第二条所列内容之一的，本博客有权在不通知您的情况下采取包括但不仅限于向国家有关机关报告、保存有关记录、删除该内容及链接地址、关闭服务器、暂停您账号的操作权限、停止向您提供服务等措施；
                  </p>
                </p>
              </p>
            </p>
            <p>
              <h3>第三条 注册会员权利和义务 </h3>
              <p style={{ marginLeft: '2em' }}>
                <p>（一）注册会员有权用本博客提供的服务功能。</p>
                <p>
                  （二）注册会员同意遵守包括但不仅限于《中华人民共和国保守国家秘密法》、《中华人民共和国计算机信息系统安全保护条例》、《计算机软件保护条例》、《互联网电子公告服务管理规定》、《互联网信息服务管理办法》等在内的法律、法规。
                </p>
                <p>（三）您注册时有义务提供完整、真实、的个人信息，信息如有变更，应及时更新。</p>
                <p>
                  （四）您成为注册会员须妥善保管用户名和密码，用户登录后进行的一切活动均视为是您本人的行为和意愿，您负全部责任。
                </p>
                <p>（五）您在使用本博客服务时，同意且接受本博客提供的各类信息服务。</p>
                <p> （六）您使用本博客时，禁止有以下行为：</p>
                <p style={{ marginLeft: '2em' }}>
                  <p>
                    1、上载、张贴、发送电子邮件或以其他方式传送含有违反国家法律、法规的信息或资料，这些资料包括但不仅限于资讯、资料、文字、软件、音乐、照片、图形、等（下同）；
                  </p>
                  <p>2、散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的资料；</p>
                  <p>
                    3、冒充任何个人或机构，或以虚伪不实的方式误导他人以为其与任何人或任何机构有关；
                  </p>
                  <p>4、通过本博客干扰、破坏或限制他人计算机软件、硬件或通讯设备功能的行为；</p>
                  <p>5、通过本博客跟踪或以其他方式骚扰他人；</p>
                </p>
              </p>
              <p></p>
              <h3> 第四条 用户隐私</h3>
              <p style={{ marginLeft: '2em' }}>
                <p>
                  我们承诺，对您个人的信息和隐私的安全承担保密义务。未经您授权或同意，本博客不会将您的个人资料信息泄露给第三方，但以下情况除外，且本博客不承担任何责任：
                </p>
                <p>
                  （一）政府单位按照中华人民共和国的法律、行政法规、部门规章、司法解释等规范性法律文件（统称“法律法规”），要求本博客提供的；
                </p>
                <p>（二）由于您将用户和密码告知或泄露给他人，由此导致的个人资料泄露；</p>
                <p>
                  （三）包括但不仅限于黑客攻击、计算机病毒侵入或发作、政府管制等不可抗力而造成的用户个人资料泄露、丢失、被盗用或被篡改等；
                </p>
                <p>
                  （四）您通过本博客链接其他博客造成的个人资料泄露以及由此导致的任何法律争议和后果；
                </p>
                <p>（五）为免除他人正在遭受威胁到其生命、身体或财产等方面的危险，所采取的措施；</p>
                <p>（六）本博客会与其他博客链接，但不对其他博客的隐私政策及内容负责；</p>
                <p>
                  （七）此外，您若发现有任何非法使用您的用户账号或安全漏洞的情况，应立即通告本博客；
                </p>
                <p>（八）由于您自身的疏忽、大意等过错所导致的；</p>
                <p>（九）您在本博客的有关记录有可能成为您违反法律法规和本协议的证据；</p>
              </p>
              <p></p>
              <h3> 第五条 知识产权</h3>
              <p style={{ marginLeft: '2em' }}>
                <p>
                  本博客所有的域名、商号、商标、文字、视像及声音内容、图形及图像均受有关所有权和知识产权法律的保护，未经本博客事先以书面明确允许，任何个人或单位，均不得进行复制和使用。
                </p>
              </p>
            </p>
            <p>
              <h3> 第六条 法律适用</h3>
              <p style={{ marginLeft: '2em' }}>
                <p>
                  （一）协议由本博客的所有人负责修订，并通过本博客公布，您的注册行为即被视为您自愿接受协议的全部条款，受其约束。
                </p>
                <p>（二）协议的生效、履行、解释及争议的解决均适用中华人民共和国法律。</p>
                <p>
                  （三）您使用博客提供的服务如产生争议，原则上双方协商解决，协商不成可向本博客所有人所在的仲裁机构、人民法院进行调解或提起诉讼。
                </p>
                <p>
                  （四）协议的条款如与法律相抵触，本博客可进行重新解析，而其他条款则保持对您产生法律效力和约束
                </p>
              </p>
            </p>
          </p>
        </div>
      ),
    });
  };

  checkUsername = async (username: string) => {
    this.setState({ goodUsername: !(await checkUsername(this.state.username)).existed });
  };

  submit = () => {
    this.setState({ loading: true });
    const { username, password } = this.state;

    register(username, password)
      .then((r) => {
        if (ShowNotification(r)) {
          window.close();
        }
      })
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    return (
      <Card neumorphism>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`注册|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <Flex direction="TB" fullWidth>
          <Input
            label="用户名"
            placeholder="请输入用户名"
            prefix={<User />}
            style={{ width: '100%' }}
            value={this.state.username}
            onChange={(username) => {
              checkUsername(username);
              this.setState({ username });
            }}
            hint={
              this.state.username === '' ? (
                <Hint error>请填写用户名</Hint>
              ) : !this.state.goodUsername ? (
                <Hint error>该用户名已被使用</Hint>
              ) : null
            }
          />
          <Input
            label="密码"
            placeholder="请输入密码"
            prefix={<Lock />}
            type="password"
            style={{ width: '100%' }}
            value={this.state.password}
            onChange={(password) => this.setState({ password })}
            hint={this.state.password === '' ? <Hint error>请输入密码</Hint> : null}
          />
          <Input
            label="再次输入"
            placeholder="请在此输入相同的密码"
            prefix={<Lock />}
            type="password"
            style={{ width: '100%' }}
            value={this.state.repeat}
            onChange={(repeat) => this.setState({ repeat })}
            hint={
              this.state.repeat !== '' && this.state.repeat !== this.state.password ? (
                <Hint error>两次输入的密码不相同</Hint>
              ) : null
            }
          />

          <CheckBox
            value={this.state.checked}
            onChange={(checked) => this.setState({ checked })}
            hint={!this.state.checked ? <Hint error>只有同意用户协议才可以注册</Hint> : null}
          >
            我同意<a onClick={this.agreement}>用户协议</a>
          </CheckBox>

          <QuickLogin />

          <span style={{ float: 'right' }}>
            <Button
              neumorphism
              primary
              loading={this.state.loading}
              onClick={() => this.submit()}
              disabled={
                !this.state.goodUsername ||
                !this.state.checked ||
                this.state.repeat !== this.state.password ||
                this.state.password === '' ||
                this.state.username === ''
              }
            >
              注册
            </Button>
          </span>
        </Flex>
      </Card>
    );
  }
}

export default Register;
