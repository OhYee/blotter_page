import React from 'react';

import TagPart from '@/components/tag';
import Input from '@/components/input';
import Button from '@/components/button';
import { Loading } from '@/components/svg';
import { Flex } from '@/components/container';

import { tagsSearch } from '@/utils/api';
import { waitUntil } from '@/utils/debounce';

interface TagSearchProps extends React.ComponentProps<'base'> {
  onAdd: (tag: Blotter.Tag) => void;
  onDelete: (tag: Blotter.Tag) => void;
  tags: Blotter.Tag[];
}

type TagSearchState = {
  inputVisible: boolean;
  options: Blotter.Tag[];
  loading: boolean;
};

class TagSearch extends React.Component<TagSearchProps, TagSearchState> {
  constructor(props: any) {
    super(props);
    this.state = {
      inputVisible: false,
      options: [],
      loading: false,
    };
  }

  onClick = () => {
    this.setState({ inputVisible: true });
  };
  onSelect = (_, tag: Blotter.Tag) => {
    console.log('onChange', tag);
    if (typeof tag !== 'undefined') {
      this.add(tag);
    }
  };
  onChange = (value: string) => {
    if (value != '') {
      waitUntil(
        'search_tags',
        () => {
          this.setState({ loading: true });
          tagsSearch(value)
            .then((r) => this.setState({ options: r.tags }))
            .finally(() => this.setState({ loading: false }));
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
    setTimeout(() => {
      this.setState({ inputVisible: false });
    }, 100);
  };

  renderInput = () => {
    return this.state.inputVisible ? (
      <Input<Blotter.Tag>
        placeholder="搜索标签"
        style={{ width: '150px' }}
        onBlur={this.onBlur}
        size="small"
        onChange={this.onChange}
        onSelect={this.onSelect}
        options={this.state.options.map((tag) => ({ key: tag.name, value: tag }))}
        suffix={this.state.loading && <Loading />}
        autoFocus
      />
    ) : (
      <Button
        onClick={this.onClick}
        style={{ border: '1px dashed var(--primary)', transition: 'border var(--primary)' }}
      >
        新标签
      </Button>
    );
  };

  render() {
    return (
      <Flex mainSize="small" subSize="small" mainAxis="space-around">
        {[
          ...this.props.tags.map((tag) => (
            <TagPart key={tag.short} tag={tag} onClose={() => this.props.onDelete(tag)} />
          )),
          <Flex.Item key={'tag_search'}>{this.renderInput()}</Flex.Item>,
        ]}
      </Flex>
    );
  }
}

export default TagSearch;
