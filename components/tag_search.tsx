import React, { ComponentProps, Ref } from 'react';

import PostList from '@/components/post_list';

import { tagsSearch } from '@/utils/api';
import { Select, Tag } from 'antd';
import { Icon } from '@ant-design/compatible';
import { waitUntil } from '@/utils/debounce';
import TagPart from '@/components/tag';

type TagSearchProps = {
  onAdd: (tag: Blotter.Tag) => void;
  onDelete: (tag: Blotter.Tag) => void;
  tags: Blotter.Tag[];
};

type TagSearchState = {
  inputVisible: boolean;
  options: Blotter.Tag[];
};

class TagSearch extends React.Component<TagSearchProps & ComponentProps<'base'>, TagSearchState> {
  constructor(props: any) {
    super(props);
    this.state = {
      inputVisible: false,
      options: [],
    };
  }

  onClick = () => {
    this.setState({ inputVisible: true });
  };
  onChange = (value: string) => {
    var tag = this.state.options.find(tag => tag.short == value);
    if (typeof tag != 'undefined') {
      this.add(tag);
    }
  };
  onSearch = (value: string) => {
    if (value != '') {
      waitUntil(
        'search_tags',
        async () => {
          var r = await tagsSearch(value);
          this.setState({ options: r.tags });
        },
        1000,
      );
    }
  };
  add = (tag: Blotter.Tag) => {
    this.props.onAdd(tag);
    this.setState({ inputVisible: false, options: [] });
  };
  onBlur = () => {
    this.setState({ inputVisible: false });
  };

  renderInput = () => {
    return this.state.inputVisible ? (
      <Select
        showSearch
        autoFocus={true}
        placeholder="搜索标签"
        style={{ width: '150px' }}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={this.onSearch}
        onChange={this.onChange}
        onBlur={this.onBlur}
        notFoundContent={null}
        size="small"
      >
        {this.state.options.map(tag => (
          <Select.Option key={tag.short} value={tag.short}>
            {tag.name}
          </Select.Option>
        ))}
      </Select>
    ) : (
      <Tag onClick={this.onClick} style={{ background: '#fff', borderStyle: 'dashed' }}>
        <Icon type="plus" /> 新标签
      </Tag>
    );
  };

  render() {
    return (
      <div>
        {this.props.tags.map(tag => (
          <TagPart key={tag.short} tag={tag} closable={true} onClose={this.props.onDelete} />
        ))}
        {this.renderInput()}
      </div>
    );
  }
}

export default TagSearch;
