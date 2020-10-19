import React from 'react';

import Input, { InputNumber } from '../';
import Popover from '@/components/popover';
import Card from '@/components/card';
import { Flex } from '@/components/container';
import Button from '@/components/button';
import { Close, Left } from '@/components/svg';

import { concat, ComponentProps } from '@/utils/component';

import styles from './datepicker.module.scss';

export declare type DatePickerProps = ComponentProps<{
  value?: number;
  defaultValue?: number;
  onChange?: (datetime: number) => void;
  type?: 'date' | 'time' | 'datetime';
  label?: string;
  lablePlacement?: 'left' | 'top';
  placeholder?: string;
}>;

export default function DatePicker(props: DatePickerProps) {
  const {
    defaultValue,
    value,
    onChange,
    type = 'datetime',
    label,
    lablePlacement,
    placeholder,
    ...restProps
  } = props;
  const defaultDatetime = React.useMemo(
    () =>
      typeof value !== 'undefined'
        ? new Date(value)
        : typeof defaultValue !== 'undefined'
        ? new Date(defaultValue)
        : new Date(),
    [],
  );

  const [date, setDate] = React.useState<DateObject>({
    Y: defaultDatetime.getFullYear(),
    M: defaultDatetime.getMonth() + 1,
    D: defaultDatetime.getDate(),
  });
  const [time, setTime] = React.useState<TimeObject>({
    H: defaultDatetime.getHours(),
    M: defaultDatetime.getMinutes(),
    S: defaultDatetime.getSeconds(),
  });

  const { _date, _time } = React.useMemo(() => {
    if (typeof value === 'undefined') return { _date: date, _time: time };
    const datetime = new Date(value);
    return {
      _date: {
        Y: datetime.getFullYear(),
        M: datetime.getMonth() + 1,
        D: datetime.getDate(),
      },
      _time: {
        H: datetime.getHours(),
        M: datetime.getMinutes(),
        S: datetime.getSeconds(),
      },
    };
  }, [value, date, time]);

  const callback = React.useCallback(
    (date: DateObject, time: TimeObject) => {
      if (!!onChange) {
        switch (type) {
          case 'datetime':
            return onChange(new Date(date.Y, date.M - 1, date.D, time.H, time.M, time.S).getTime());
          case 'date':
            return onChange(new Date(date.Y, date.M - 1, date.D).getTime());
          case 'time':
            return onChange(new Date(1970, 0, 1, time.H, time.M, time.S).getTime());
        }
      }
    },
    [onChange],
  );

  const dateFormat = React.useMemo(
    () =>
      `${_date.Y}-${_date.M.toString().padStart(2, '0')}-${_date.D.toString().padStart(2, '0')}`,
    [_date],
  );
  const timeFormat = React.useMemo(
    () =>
      `${_time.H.toString().padStart(2, '0')}:${_time.M.toString().padStart(
        2,
        '0',
      )}:${_time.S.toString().padStart(2, '0')}`,
    [_time],
  );

  const format = React.useMemo(
    () =>
      type === 'datetime'
        ? `${dateFormat} ${timeFormat}`
        : type === 'date'
        ? dateFormat
        : timeFormat,
    [dateFormat, timeFormat, type],
  );

  return (
    <div {...restProps}>
      <Popover
        card
        shadow
        placement="bottom"
        component={
          <Card>
            <Flex direction="TB" wrap={false}>
              {(type === 'datetime' || type === 'date') && (
                <DatePart
                  date={_date}
                  onChange={(d) => {
                    callback(d, _time);
                    setDate(d);
                  }}
                />
              )}
              {(type === 'datetime' || type === 'time') && (
                <TimePart
                  time={_time}
                  onChange={(t) => {
                    callback(_date, t);
                    setTime(t);
                  }}
                />
              )}
            </Flex>
          </Card>
        }
      >
        <Input
          label={label}
          lablePlacement={lablePlacement}
          placeholder={placeholder}
          value={format}
          editable={!!onChange}
          onChange={(value) => {
            const datetime = new Date(value);
            if (!!onChange && !isNaN(datetime.getTime())) onChange(datetime.getTime());
          }}
        />
      </Popover>
    </div>
  );
}

type DateObject = {
  Y: number;
  M: number;
  D: number;
};

function DatePart(props: { date: DateObject; onChange?: (d: DateObject) => void }) {
  const { date, onChange = () => {} } = props;
  const [selectYear, setSelectYear] = React.useState(false);
  const [selectMonth, setSelectMonth] = React.useState(false);
  const [state, setState] = React.useState(date);
  React.useEffect(() => setState(date), [date]);

  return selectYear ? (
    <Flex direction="TB" mainSize="small" subAxis="flex-end">
      <Close onClick={() => setSelectYear(false)} />
      <YearSelect
        year={state.Y}
        onSelect={(y) => {
          setSelectYear(false);
          setState({ ...state, Y: y });
        }}
      />
    </Flex>
  ) : selectMonth ? (
    <Flex direction="TB" mainSize="small" subAxis="flex-end">
      <Close onClick={() => setSelectMonth(false)} />
      <MonthSelect
        month={state.M}
        onSelect={(m) => {
          setSelectMonth(false);
          setState({ ...state, M: m });
        }}
      />
    </Flex>
  ) : (
    <Flex direction="TB" mainSize="small">
      <Flex mainAxis="space-around">
        <Button
          icon={<Left />}
          onClick={() =>
            setState({
              ...state,
              Y: state.Y - 1,
            })
          }
        />
        <Button onClick={() => setSelectYear(true)}>{state.Y}</Button>
        <Button
          icon={<Left style={{ transform: 'rotate(180deg)' }} />}
          onClick={() =>
            setState({
              ...state,
              Y: state.Y + 1,
            })
          }
        />
      </Flex>
      <Flex mainAxis="space-around">
        <Button
          icon={<Left />}
          onClick={() =>
            setState({
              ...state,
              M: state.M - 1 === 0 ? 12 : state.M - 1,
              Y: state.M - 1 === 0 ? state.Y - 1 : state.Y,
            })
          }
        />
        <Button onClick={() => setSelectMonth(true)}>{state.M}月</Button>
        <Button
          icon={<Left style={{ transform: 'rotate(180deg)' }} />}
          onClick={() =>
            setState({
              ...state,
              M: state.M + 1 === 13 ? 1 : state.M + 1,
              Y: state.M + 1 === 13 ? state.Y + 1 : state.Y,
            })
          }
        />
      </Flex>
      <DateSelect year={state.Y} month={state.M} date={date} onChange={(date) => onChange(date)} />
    </Flex>
  );
}

const yRange = 25;
const yRangeHalf = 12;
function YearSelect(props: { year: number; onSelect: (year: number) => void }) {
  const { year, onSelect } = props;
  const [y, setY] = React.useState(year);
  return (
    <div className={styles.yearSelect}>
      <Flex mainAxis="space-around">
        <Button icon={<Left />} onClick={() => setY(y - yRange)} />
        {year}
        <Button
          icon={<Left style={{ transform: 'rotate(180deg)' }} />}
          onClick={() => setY(y + yRange)}
        />
      </Flex>
      <div className={styles.body}>
        {Array(yRange)
          .fill(0)
          .map((_, idx) => (
            <div
              key={idx}
              className={idx + y - yRangeHalf === year ? styles.active : ''}
              onClick={() => onSelect(idx + y - yRangeHalf)}
            >
              {idx + y - yRangeHalf}
            </div>
          ))}
      </div>
    </div>
  );
}

const M12 = Array(12)
  .fill(0)
  .map((_, i) => i);
function MonthSelect(props: { month: number; onSelect: (month: number) => void }) {
  const { month, onSelect } = props;
  return (
    <div className={styles.monthSelect}>
      {M12.map((i) => (
        <div
          key={i}
          className={i + 1 === month ? styles.active : ''}
          onClick={() => onSelect(i + 1)}
        >{`${i + 1}月`}</div>
      ))}
    </div>
  );
}

const D7 = ['日', '一', '二', '三', '四', '五', '六'];
function DateSelect(props: {
  year: number;
  month: number;
  date: DateObject;
  onChange?: (date: DateObject) => void;
}) {
  const { year, month, date, onChange = () => {} } = props;
  const now = new Date();
  const today = React.useMemo(() => new Date(now.getFullYear(), now.getMonth(), now.getDate()), [
    now,
  ]);

  const activeDate = React.useMemo(() => (date.Y === year && date.M === month ? date.D : -1), [
    date,
    year,
    month,
  ]);
  const todayDate = React.useMemo(
    () => (today.getFullYear() === year && today.getMonth() + 1 == month ? today.getDate() : -1),
    [today, year, month],
  );

  const { calendar, weekDay, maxDay } = React.useMemo(() => {
    const weekDay = new Date(year, month - 1, 1).getDay();
    const maxDay = new Date(year, month, 0).getDate();
    const afterDay = 7 - ((weekDay + maxDay) % 7);
    var calendar: number[] = Array(weekDay + maxDay + afterDay).fill(0);
    for (var i = 0; i < weekDay; i++) {
      calendar[i] = new Date(year, month - 1, i - weekDay + 1).getDate();
    }
    for (var i = 1; i <= maxDay; i++) {
      calendar[i + weekDay - 1] = i;
    }
    for (var i = 0; i < afterDay; i++) {
      calendar[maxDay + weekDay + i] = i + 1;
    }
    return { calendar, weekDay, maxDay };
  }, [date, year, month]);

  return (
    <Flex direction="TB" subAxis="flex-end" mainSize="small" className={styles.date_select}>
      <div className={styles.body}>
        {D7.map((i) => (
          <strong key={i}>{i}</strong>
        ))}
        {calendar.map((i, idx) => (
          <div
            key={idx}
            className={concat(
              idx < weekDay || idx >= weekDay + maxDay
                ? styles.disabled
                : i === activeDate
                ? styles.active
                : i === todayDate
                ? styles.today
                : '',
            )}
            onClick={() => onChange({ Y: year, M: month, D: i })}
          >
            {i}
          </div>
        ))}
      </div>
      <Button
        size="small"
        onClick={() =>
          onChange({ Y: today.getFullYear(), M: today.getMonth() + 1, D: today.getDate() })
        }
      >
        今天
      </Button>
    </Flex>
  );
}

interface TimeObject {
  H: number;
  M: number;
  S: number;
}

function TimePart(props: { time: TimeObject; onChange: (time: TimeObject) => void }) {
  const { time, onChange } = props;
  const [state, setState] = React.useState(time);
  React.useEffect(() => {
    setState(time);
  }, [time]);
  return (
    <Flex direction="TB">
      <InputNumber
        label="时"
        value={state.H}
        min={0}
        max={23}
        onChange={(v) => setState({ ...state, H: v })}
        size="small"
      />
      <InputNumber
        label="分"
        value={state.M}
        min={0}
        max={59}
        onChange={(v) => setState({ ...state, M: v })}
        size="small"
      />
      <InputNumber
        label="秒"
        value={state.S}
        min={0}
        max={59}
        onChange={(v) => setState({ ...state, S: v })}
        size="small"
      />
      <Flex>
        <Button
          onClick={() => {
            const now = new Date();
            setState({ H: now.getHours(), M: now.getMinutes(), S: now.getSeconds() });
          }}
          size="small"
        >
          当前时间
        </Button>
        <Button primary onClick={() => onChange(state)} size="small">
          确定
        </Button>
      </Flex>
    </Flex>
  );
}
