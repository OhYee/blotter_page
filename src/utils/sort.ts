function getFirstCharGroup(s: string) {
  if (typeof String.prototype.localeCompare === 'undefined') return 0;

  if (s && s.length == 0) {
    return 0;
  }
  //         a b cd e f g h ij kl m n op q rs tuv wx y z
  var zh = '阿八嚓哒妸发旮哈讥讥咔垃痳拏噢妑七呥扨它穵穵穵夕丫帀'.split('');
  var c = s.charCodeAt(0);

  if (c >= 97 && c <= 122) {
    return c - 97 + 1;
  } else if (c >= 65 && c <= 90) {
    return c - 65 + 1;
  } else {
    for (var i = 1; i <= 26; ++i) {
      if (zh[i - 1].localeCompare(s[0], 'zh') <= 0 && s[0].localeCompare(zh[i], 'zh') < 0) {
        return i;
      }
    }
  }
  return 0;
}

export declare type TagGroup = { title: string; tags: Blotter.TagWithCount[] };
export const sortTagsByPinYin = (tags: Blotter.TagWithCount[]) => {
  if (!String.prototype.localeCompare) return tags.sort();

  var res: TagGroup[] = [];
  for (var i = 0; i < 27; ++i) {
    res.push({
      title: i == 0 ? '#' : String.fromCharCode(i + 65 - 1),
      tags: [],
    });
  }

  var l = tags.length;
  for (var i = 0; i < l; ++i) {
    var tag = tags[i];
    var group_id = getFirstCharGroup(tag.name);
    res[group_id].tags.push(tag);
  }

  for (var i = 0; i < 27; ++i) {
    res[i].tags.sort((a, b) => {
      return a.count == b.count ? 0 : a.count < b.count ? 1 : -1;
    });
  }
  return res;
};
