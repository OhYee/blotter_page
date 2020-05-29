import React, { ComponentProps, Fragment } from 'react';
import Head from 'next/head';

import {
  Card,
  Alert,
  Spin,
  Result,
  Tabs,
  Form,
  Input,
  Button,
  Typography,
  Radio,
  notification,
  InputNumber,
  Progress,
  Divider,
} from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

import Container, { Space, TextCenter } from '@/components/container';
import { Context } from '@/utils/global';
import initialCrypto, { Crypto, HashType } from '@/utils/wasm_crypto';
import { isNull } from 'util';
import { InputProps, TextAreaProps } from 'antd/lib/input';
import Countdown from 'antd/lib/statistic/Countdown';
import Paragraph from 'antd/lib/skeleton/Paragraph';

const CryptoContext = React.createContext({ crypto: undefined as Crypto });

function showError(msg: any) {
  notification.error({ message: '错误', description: `${msg}` });
}

function string2Bytes(input: string) {
  return new Uint8Array(
    input
      .split(',')
      .filter((item) => item != '')
      .map((item) => parseInt(item, 16)),
  );
}

function bytes2string(input: Uint8Array) {
  return Array.from(input)
    .map((item) => `0x${item.toString(16).slice(-2).toUpperCase().padStart(2, '0')}`)
    .join(', ');
}

function bytes2hex(input: Uint8Array) {
  return Array.from(input)
    .map((item) => `${('0' + item.toString(16)).slice(-2).toLowerCase()}`)
    .join('');
}

function hex2Bytes(input: string) {
  if (input.length == 0) {
    return new Uint8Array([]);
  }
  if (input.length & 1) {
    input = '0' + input;
  }
  return new Uint8Array(input.match(/.{1,2}/g).map((item) => parseInt(item, 16)));
}

function TextInput(
  props: TypeTReplaceByU<TextAreaProps, { value: string }> & {
    label?: string;
    closure?: (getter: () => string, setter: (v: string) => void) => void;
  },
) {
  const { value: defaultValue = '', onChange, closure, ...restProps } = props;
  const [value, setValue] = React.useState(defaultValue);
  if (!!closure)
    closure(
      () => value,
      (v: string) => setValue(v),
    );

  return (
    <Space>
      <Input.TextArea
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (!!onChange) onChange(e);
        }}
        {...restProps}
      />
    </Space>
  );
}

function BytesInput(
  props: TypeTReplaceByU<TextAreaProps, { value: Uint8Array }> & {
    label?: string;
    closure?: (getter: () => Uint8Array, setter: (v: Uint8Array) => void) => void;
  },
) {
  const { value: defaultValue = new Uint8Array(), onChange, closure, ...restProps } = props;
  const [inputValue, setInput] = React.useState(bytes2string(defaultValue));
  const [value, setValue] = React.useState(defaultValue);
  const [r, setR] = React.useState(1 as 1 | 2 | 3 | 4);
  const { crypto } = React.useContext(CryptoContext);
  const resetValue = () => {
    var ret = new Uint8Array();
    if (r === 1) ret = string2Bytes(inputValue);
    else if (r === 2) ret = crypto.exports.debase64(inputValue).return;
    else if (r === 3) ret = hex2Bytes(inputValue);
    else ret = new TextEncoder().encode(inputValue);
    setValue(ret);
    return ret;
  };
  const resetInput = (r: 1 | 2 | 3 | 4, v: Uint8Array) => {
    if (r == 1) setInput(bytes2string(v));
    else if (r == 2) setInput(crypto.exports.base64(v).return);
    else if (r == 3) setInput(bytes2hex(v));
    else setInput(new TextDecoder().decode(v));
  };
  if (!!closure)
    closure(
      () => resetValue(),
      (v: Uint8Array) => {
        setValue(v);
        resetInput(r, v);
      },
    );

  return (
    <Space>
      <Input.TextArea
        value={inputValue}
        onChange={(e) => {
          setInput(e.target.value);
          if (!!onChange) onChange(e);
        }}
        {...restProps}
      />
      <Radio.Group
        value={r}
        onChange={(e) => {
          const v = e.target.value;
          resetInput(v, resetValue());
          setR(v);
        }}
      >
        <Radio value={1}>Uint8Array</Radio>
        <Radio value={2}>Base64</Radio>
        <Radio value={3}>16进制字符串</Radio>
        <Radio value={4}>UTF-8</Radio>
      </Radio.Group>
    </Space>
  );
}

function Tab<
  K extends string | Uint8Array,
  O extends string | Uint8Array,
  C extends string | Uint8Array
>(
  props: React.PropsWithChildren<{
    description: JSX.Element;

    keyEnable?: boolean;
    keyLabel?: string;
    keyDefault?: K;
    keyPh?: string;
    keyString?: boolean;

    ordinaryLabel?: string;
    ordinaryDefault?: O;
    ordinaryPh?: string;
    ordinaryString?: boolean;

    codeLabel?: string;
    codeDefault?: C;
    codePh?: string;
    codeString?: boolean;

    encodeLabel?: string;
    decodeLabel?: string;

    encode?: (ordinary: O, key?: K) => C;
    decode?: (code: C, key?: K) => O;
  }>,
): JSX.Element {
  const {
    description = null,

    keyEnable = true,
    keyString = true,
    keyLabel = '密钥',
    keyDefault = keyString ? '' : new Uint8Array(),
    keyPh = '请输入密钥',

    ordinaryString = true,
    ordinaryLabel = '原二进制数组',
    ordinaryDefault = ordinaryString ? '' : new Uint8Array(),
    ordinaryPh = '',

    codeLabel = '编码结果',
    codeString = true,
    codeDefault = codeString ? '' : new Uint8Array(),
    codePh = '',

    encodeLabel = '编码',
    decodeLabel = '解码',

    encode,
    decode,
  } = props;
  var keyGetter: () => K = () => undefined;
  var keySetter: (v: K) => void = (v: K) => {};

  var ordinaryGetter: () => O = () => undefined;
  var ordinarySetter: (v: O) => void = (v: O) => {};

  var codeGetter: () => C = () => undefined;
  var codeSetter: (v: C) => void = (v: C) => {};

  return (
    <Space>
      {description}

      {keyEnable ? (
        <Fragment>
          {keyString ? (
            <TextInput
              label={keyLabel}
              placeholder={keyPh}
              value={keyDefault as string}
              closure={(g, s) => ((keyGetter = g as any), (keySetter = s as any))}
            />
          ) : (
            <BytesInput
              label={keyLabel}
              placeholder={keyPh}
              value={keyDefault as Uint8Array}
              closure={(g, s) => ((keyGetter = g as any), (keySetter = s as any))}
            />
          )}
          <Divider />
        </Fragment>
      ) : null}

      {ordinaryString ? (
        <TextInput
          label={ordinaryLabel}
          placeholder={ordinaryPh}
          value={ordinaryDefault as string}
          closure={(g, s) => ((ordinaryGetter = g as any), (ordinarySetter = s as any))}
        />
      ) : (
        <BytesInput
          label={ordinaryLabel}
          placeholder={ordinaryPh}
          value={ordinaryDefault as Uint8Array}
          closure={(g, s) => ((ordinaryGetter = g as any), (ordinarySetter = s as any))}
        />
      )}

      <Space flexCenter direction="horizontal">
        <Button
          icon={<ArrowDownOutlined />}
          disabled={!encode}
          onClick={() => {
            try {
              const ordinary = ordinaryGetter();
              const key = keyGetter();
              codeSetter(encode(ordinary, key));
            } catch (err) {
              showError(err);
            }
          }}
        >
          {encodeLabel}
        </Button>
        <Button
          icon={<ArrowUpOutlined />}
          disabled={!decode}
          onClick={() => {
            try {
              const code = codeGetter();
              const key = keyGetter();
              ordinarySetter(decode(code, key));
            } catch (err) {
              showError(err);
            }
          }}
        >
          {decodeLabel}
        </Button>
      </Space>

      {codeString ? (
        <TextInput
          label={codeLabel}
          placeholder={codePh}
          value={codeDefault as string}
          closure={(g, s) => ((codeGetter = g as any), (codeSetter = s as any))}
        />
      ) : (
        <BytesInput
          label={codeLabel}
          placeholder={codePh}
          value={codeDefault as Uint8Array}
          closure={(g, s) => ((codeGetter = g as any), (codeSetter = s as any))}
        />
      )}
    </Space>
  );
}

function BytesTab(props: React.PropsWithChildren<{}>): JSX.Element {
  return (
    <Tab<never, Uint8Array, string>
      description={
        <Typography.Paragraph>
          比特数组是可视文本在计算机内部的存储形式(UTF-8)
          <br />
          由于这里使用的输入输出大多都是二进制数组(Uint8Array)，因此要在输入框输入输出，通常都需要在这里将文本转换为可以识别的二进制数组
        </Typography.Paragraph>
      }
      keyEnable={false}
      ordinaryString={false}
      ordinaryPh="0xE4, 0xBD, 0xA0, 0xE5, 0xA5, 0xBD, 0x21"
      codePh="你好!"
      encode={(ordinary: Uint8Array) => new TextDecoder().decode(ordinary)}
      decode={(code: string) => new TextEncoder().encode(code)}
    />
  );
}

function Base64Tab(props: React.PropsWithChildren<{}>): JSX.Element {
  const { crypto } = React.useContext(CryptoContext);
  return (
    <Tab<string, Uint8Array, string>
      description={
        <Typography.Paragraph>
          Base64
          是一种编码算法，将二进制内容编码为可视的字符内容，使用该应用可以同时设置不同于默认的
          Base64 可用字符集(长度必须是64)。
          这里由于所有的密码学内容都使用二进制输入输出(Uint8Array)，因此也可以使用 Base64
          来将其转换为更容易展示的形式
        </Typography.Paragraph>
      }
      keyLabel="Base64 可用字符"
      keyDefault={crypto.exports.defaultBase64Key}
      ordinaryString={false}
      ordinaryPh="0xE4, 0xBD, 0xA0, 0xE5, 0xA5, 0xBD, 0x21"
      codePh="5L2g5aW9IQ=="
      encode={(ordinary: Uint8Array, key?: string) => {
        const ret = crypto.exports.base64(ordinary);
        if (ret.success) {
          return ret.return;
        } else {
          showError(ret.return);
          return '';
        }
      }}
      decode={(code: string, key?: string) => {
        const ret = crypto.exports.debase64(code);
        if (ret.success) {
          return ret.return;
        } else {
          showError(ret.return);
          return new Uint8Array();
        }
      }}
    />
  );
}

function ReplaceTab(props: React.PropsWithChildren<{}>): JSX.Element {
  const { crypto } = React.useContext(CryptoContext);
  return (
    <Tab<string, string, string>
      description={
        <Typography.Paragraph>
          代换密码，按照某种特定的规则（密钥）将字符替换成其他的字符（二进制下为字节的替换）
          <br />
          在这里，使用字符串来作为密钥的输入（只支持字母和数字），按照
          <Typography.Text code>A-Z</Typography.Text>、<Typography.Text code>a-z</Typography.Text>、
          <Typography.Text code>0-9</Typography.Text>
          的顺序来输入其替换的密钥
          <br />
          如传统凯撒密码（+3替换）的密钥为
          <Typography.Text code>{crypto.exports.caesar}</Typography.Text>
        </Typography.Paragraph>
      }
      keyLabel="替换密钥"
      keyDefault={crypto.exports.caesar}
      ordinaryPh="Bupt"
      codePh="Exsw"
      encode={(ordinary: string, key: string) => {
        const ret = crypto.exports.encrypto_replace(ordinary, key);
        if (ret.success) {
          return ret.return;
        } else {
          showError(ret.return);
          return '';
        }
      }}
      decode={(code: string, key: string): string => {
        const ret = crypto.exports.decrypto_replace(code, key);
        if (ret.success) {
          return ret.return;
        } else {
          showError(ret.return);
          return '';
        }
      }}
    />
  );
}

function HashTab(props: React.PropsWithChildren<{}>): JSX.Element {
  const [value, setValue] = React.useState('sha1' as HashType);
  const { crypto } = React.useContext(CryptoContext);
  return (
    <Space>
      <Radio.Group onChange={(v) => setValue(v.target.value as HashType)} value={value}>
        <Radio value={'sha1'}>SHA1</Radio>
        <Radio value={'sha224'}>SHA224</Radio>
        <Radio value={'sha256'}>SHA256</Radio>
        <Radio value={'sha384'}>SHA384</Radio>
        <Radio value={'sha512'}>SHA512</Radio>
      </Radio.Group>
      <Tab<Uint8Array, Uint8Array, Uint8Array>
        description={
          <Typography.Paragraph>
            哈希（散列）算法是一种不可逆的映射函数，在这里输入输出都是比特数组(Uint8Array)。通常应该结合“比特数组转换”和“Base64
            编码”使用
          </Typography.Paragraph>
        }
        keyEnable={false}
        codeLabel="哈希结果"
        ordinaryPh="0xE4, 0xBD, 0xA0, 0xE5, 0xA5, 0xBD, 0x21"
        ordinaryString={false}
        codePh="0xE4, 0xBD, 0xA0, 0xE5, 0xA5, 0xBD, 0x21"
        codeString={false}
        encode={(ordinary: Uint8Array) => {
          const ret = crypto.exports[value](ordinary as Uint8Array);
          if (ret.success) {
            return ret.return;
          } else {
            showError(ret.return);
            return new Uint8Array();
          }
        }}
      />
    </Space>
  );
}

function HmacTab(props: React.PropsWithChildren<{}>): JSX.Element {
  const [value, setValue] = React.useState('sha1' as HashType);
  const { crypto } = React.useContext(CryptoContext);
  return (
    <Space>
      <Radio.Group onChange={(v) => setValue(v.target.value as HashType)} value={value}>
        <Radio value={'sha1'}>SHA1</Radio>
        <Radio value={'sha224'}>SHA224</Radio>
        <Radio value={'sha256'}>SHA256</Radio>
        <Radio value={'sha384'}>SHA384</Radio>
        <Radio value={'sha512'}>SHA512</Radio>
      </Radio.Group>
      <Tab<Uint8Array, Uint8Array, Uint8Array>
        description={
          <Typography.Paragraph>
            哈希消息认证码是一种带有密钥的哈希算法，除去哈希算法提供的完整性，还增加了身份验证的功能
          </Typography.Paragraph>
        }
        codeLabel="哈希消息验证码"
        keyString={false}
        keyPh="0x31, 0x32, 0x33, 0x34"
        ordinaryString={false}
        ordinaryPh="0xE4, 0xBD, 0xA0, 0xE5, 0xA5, 0xBD"
        codeString={false}
        codePh="0xC3, 0x5B, 0x67, 0x90, 0x50, 0x94, 0xA8, 0x6F, 0x35, 0xD7, 0x7B, 0xAB, 0x78, 0x0C, 0x74, 0x8A, 0x66, 0x6D, 0x09, 0x14"
        encode={(ordinary: Uint8Array, key: Uint8Array) => {
          const ret = crypto.exports.hmac(ordinary, key, value);
          if (ret.success) {
            return ret.return;
          } else {
            showError(ret.return);
            return new Uint8Array();
          }
        }}
      />
    </Space>
  );
}

function DESTab(props: React.PropsWithChildren<{}>): JSX.Element {
  const { crypto } = React.useContext(CryptoContext);
  return (
    <Tab<Uint8Array, Uint8Array, Uint8Array>
      description={
        <Typography.Paragraph>
          DES 是一种分组加密算法，在这里是原本的 DES
          实现，未考虑分组加密工作方式，因此要求输入、输出、密钥长度必须是 64 bit
          <br />
          每一轮的输出将会输出到开发者工具(DevTools)
        </Typography.Paragraph>
      }
      keyLabel="DES 密钥"
      keyString={false}
      ordinaryString={false}
      codeString={false}
      encodeLabel="加密"
      decodeLabel="解密"
      encode={(ordinary: Uint8Array, key: Uint8Array) => {
        const ret = crypto.exports.des_encrypto(ordinary, key);
        if (ret.success) {
          return ret.return;
        } else {
          showError(ret.return);
          return new Uint8Array();
        }
      }}
      decode={(code: Uint8Array, key: Uint8Array) => {
        const ret = crypto.exports.des_decrypto(code, key);
        if (ret.success) {
          return ret.return;
        } else {
          showError(ret.return);
          return new Uint8Array();
        }
      }}
    />
  );
}

function TotpTab(props: React.PropsWithChildren<{}>): JSX.Element {
  const { crypto } = React.useContext(CryptoContext);

  const [digit, setDigit] = React.useState(6);
  const [diff, setDiff] = React.useState(30);
  const [code, setCode] = React.useState(0);
  const [left, setLeft] = React.useState(Date.now());

  var keyGetter: () => Uint8Array = () => undefined;
  var keySetter: (v: Uint8Array) => void = (v: Uint8Array) => {};

  const calc = () => {
    const ret = crypto.exports.totp(keyGetter(), diff, digit);
    if (ret.success) {
      const { code, left } = ret.return;
      setCode(code);
      setLeft(Date.now() + left * 1000);
    } else {
      setCode(0);
      setLeft(Date.now() + 30 * 1000);
      showError(ret.return);
    }
  };
  return (
    <Space>
      <Typography.Paragraph>
        基于时间的一次一密算法(TOTP)是一个根据密钥以及时间生成密码的算法，广泛用于各种安全令、二步验证的场景
      </Typography.Paragraph>
      <TextCenter>
        <Countdown
          title={
            <span>
              密码 <strong>{code.toString().padStart(digit, '0')}</strong> 失效时间
            </span>
          }
          value={left}
          format="ss.SSS 秒"
          onFinish={calc}
        />
      </TextCenter>
      <Space direction="horizontal">
        <strong>位数</strong>
        <InputNumber value={digit} min={1} onChange={(v) => setDigit(parseInt(v.toString()))} />
        <strong>时间周期</strong>
        <InputNumber value={diff} min={1} onChange={(v) => setDiff(parseInt(v.toString()))} />
        <Button onClick={(e) => calc()}>刷新</Button>
      </Space>
      <Space>
        <strong>密钥</strong>
        <BytesInput closure={(g, s) => ((keyGetter = g), (keySetter = s))} />
      </Space>
    </Space>
  );
}
interface CryptoAppProps extends ComponentProps<'base'> {}

interface CryptoAppState {
  loading: boolean;
  error: any;
}

class CryptoApp extends React.Component<CryptoAppProps, CryptoAppState> {
  crypto: Crypto;
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      error: undefined,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      this.crypto = await initialCrypto();
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ error });
    }
  }
  componentWillUnmount() {
    if (!!this.crypto) this.crypto.exit();
  }

  renderTabs = () => {
    const tabs = [
      { title: '比特数组转换', child: <BytesTab /> },
      { title: 'Base64 编码', child: <Base64Tab /> },
      { title: '代换密码', child: <ReplaceTab /> },
      { title: 'DES 加密', child: <DESTab /> },
      { title: '基于时间一次一密', child: <TotpTab /> },
      { title: '哈希算法', child: <HashTab /> },
      { title: '哈希消息验证码算法', child: <HmacTab /> },
    ];

    return (
      <Tabs defaultActiveKey="0">
        {tabs.map((item, idx) => (
          <Tabs.TabPane tab={item.title} key={`${idx}`} disabled={isNull(item.child)}>
            {item.child}
          </Tabs.TabPane>
        ))}
      </Tabs>
    );
  };
  render() {
    var getter = () => {
      return new Uint8Array();
    };
    return (
      <Container>
        <Context.Consumer>
          {(context) => (
            <Head>
              <title>{`在线密码工具|${context.blog_name}`}</title>
            </Head>
          )}
        </Context.Consumer>
        <Card>
          <Space>
            <Alert
              showIcon
              message="提示"
              description={
                <Typography.Paragraph>
                  本应用用于实验 WASM 相关技术，加密算法使用 Go WebAssembly
                  实现，可能无法在较老的浏览器运行
                  <br />
                  （看上去这是个前端，其实使用后端写的，但是实际上最花时间的还是前端）
                </Typography.Paragraph>
              }
            />

            {!!this.state.error ? (
              <Result
                status="error"
                title="WebAssembly 加载错误"
                subTitle="或许你需要尝试使用更现代的浏览器"
                extra={`${this.state.error}`}
              ></Result>
            ) : this.state.loading ? (
              <Result icon={<Spin size="large" />} title="正在加载 WebAssembly 模块" />
            ) : (
              <CryptoContext.Provider value={{ crypto: this.crypto }}>
                {this.renderTabs()}
              </CryptoContext.Provider>
            )}
          </Space>
        </Card>
      </Container>
    );
  }
}

export default CryptoApp;
