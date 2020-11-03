import React from 'react';

import { Flex } from '@/components/container';
import Input, { CheckBox } from '@/components/input';
import TagSearch from '@/components/tag_search';
import Tag from '@/components/tag';
import { Search } from '@/components/svg';

import { concat, ComponentProps } from '@/utils/component';

type CheckKey = 'title' | 'abstract' | 'raw';
const checkboxs: { key: CheckKey; name: string }[] = [
  { key: 'title', name: '标题' },
  { key: 'abstract', name: '摘要' },
  { key: 'raw', name: '内容' },
];

export declare type PostSearchProps = ComponentProps<{
  searchWord: string;
  onSearchChange: (value: string) => void;
  checkedKeys: CheckKey[];
  onCheckChange: (value: CheckKey[]) => void;
  withTags: Blotter.Tag[];
  withoutTags: Blotter.Tag[];
  onTagChange: (type: 'with' | 'without', tags: Blotter.Tag[]) => void;
  tags?: Blotter.Tag[];
}>;

function RenderTagSearch(props: { tags: Blotter.Tag[]; onChange: (tags: Blotter.Tag[]) => void }) {
  const { tags, onChange } = props;
  return (
    <TagSearch
      tags={tags}
      onAdd={(tag) => onChange(tags.concat([tag]))}
      onDelete={(tag) => onChange(tags.filter((t) => t.id !== tag.id))}
    />
  );
}

function PostSearch(props: PostSearchProps, ref: React.Ref<HTMLDivElement>) {
  const {
    searchWord,
    onSearchChange,
    checkedKeys,
    onCheckChange,
    withTags,
    withoutTags,
    onTagChange,
    tags,
    ...restProps
  } = props;
  return (
    <Flex {...restProps} ref={ref} direction="TB" fullWidth subAxis="flex-start">
      <Input
        style={{ width: '100%' }}
        placeholder="搜索文章"
        onChange={onSearchChange}
        prefix={<Search />}
        size="large"
      />
      <Flex mainAxis="flex-start">
        {[
          '搜索范围',
          ...checkboxs.map((item) => (
            <CheckBox
              key={item.key}
              value={checkedKeys.indexOf(item.key) !== -1}
              onChange={(checked) =>
                onCheckChange(
                  checked
                    ? checkedKeys.concat([item.key])
                    : checkedKeys.filter((t) => t != item.key),
                )
              }
            >
              {item.name}
            </CheckBox>
          )),
        ]}
      </Flex>
      <Flex mainAxis="flex-start" mainSize="small" subSize="small">
        <span>从这些标签里搜索：</span>
        <Flex.Item>
          <RenderTagSearch tags={withTags} onChange={(tags) => onTagChange('with', tags)} />
        </Flex.Item>
      </Flex>
      <Flex mainAxis="flex-start" mainSize="small" subSize="small">
        <span>从这些标签里排除：</span>
        <Flex.Item>
          <RenderTagSearch tags={withoutTags} onChange={(tags) => onTagChange('without', tags)} />
        </Flex.Item>
      </Flex>
      {!!tags && (
        <Flex mainAxis="flex-start" subSize="middle">
          {tags.map((tag) => (
            <Tag tag={tag} key={tag.id} />
          ))}
        </Flex>
      )}
    </Flex>
  );
}

export default React.forwardRef(PostSearch);
