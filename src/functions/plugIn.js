import { Node, Text } from "slate";

const getSingleNodeString = (n) => Node.string(n);
const getStringLength = (n) => n.map(getSingleNodeString).join("\n").length;

const splitNodeWithTextLimit = (childrens, currentLength, limit) => {
  let totalLength = currentLength;
  return childrens.reduce((mergedNodes, node) => {
    const nodeLength = getSingleNodeString(node).length;
    if (totalLength + nodeLength <= limit) {
      mergedNodes.push(node);
      totalLength = totalLength + nodeLength + 1;
      return mergedNodes;
    }

    if (totalLength < limit) {
      if (Text.isText(node)) {
        node.text = node.text.slice(0, limit - totalLength);
        totalLength = totalLength + node.text.length;
      } else {
        node.children = splitNodeWithTextLimit(
          node.children,
          0,
          limit - totalLength
        );
        totalLength =
          totalLength + node.children.map(getSingleNodeString).join("").length;
      }

      mergedNodes.push(node);
    }

    return mergedNodes;
  }, []);
};

export const withMaxLength = (limit) => (editor) => {
  console.log(limit);
  const { insertText, insertBreak, insertFragment } = editor;

  editor.getStringLength = () => {
    return getStringLength(editor.children);
  };

  editor.insertText = (text) => {
    if (editor.getStringLength() >= limit) return;
    insertText(text);
  };

  editor.insertBreak = () => {
    if (editor.getStringLength() >= limit) return;
    insertBreak();
  };

  editor.insertFragment = (fragment) => {
    const currentLength = editor.getStringLength();
    const fragmentLength = getStringLength(fragment);
    const totalLength = currentLength + fragmentLength;

    if (totalLength <= limit) {
      insertFragment(fragment);
      return;
    }

    // we need to cut text to make it fit
    const splitFragment = splitNodeWithTextLimit(
      fragment,
      currentLength,
      limit
    );

    if (splitFragment.length > 0) {
      insertFragment(splitFragment);
    }
    return;
  };

  return editor;
};
