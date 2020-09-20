export default async function importImages(html: string) {
  //   const html = await this.renderMarkdown(this.editor.getValue());
  const reg = new RegExp('<img ([^>]*)>', 'g');
  var images: string[] = [];
  do {
    var result = reg.exec(html);
    if (result !== null) {
      const part = result[1].split('=');
      var params: { [key: string]: string } = {};
      var key = '';
      var end = '';
      for (var i = 0; i < part.length; i++) {
        if (key === '') {
          key = part[i];
          end = part[i + 1][0];
        } else {
          const tmp = part[i].split(end);
          params[key] = tmp[1];
          key = tmp[2].trim();
        }
      }
      if (!!params['src']) {
        if (!!params['alt'] || !!params['title'])
          images.push(`${params['src']}#${!!params['title'] ? params['title'] : params['alt']}`);
        else images.push(params['src']);
      }
    }
  } while (result);
  return images;
  //   this.setState({ images });
}
