import { TreeNode } from "./obj-tree";

let tree = new TreeNode();

enum EType {
  FOLDER,
  FILE,
}

type TFile = {
  type: EType.FILE;
  content: string;
  name: string;
};
type TFolder = {
  type: EType.FOLDER;
  name: string;
};

const makeFile = (name: string, content: string): TFile => ({
  name,
  content,
  type: EType.FILE,
});
const makeFolder = (name: string): TFolder => ({
  name,
  type: EType.FOLDER,
});

const write = (path: string, content: any, root: TreeNode<any> = tree) => {
  const parsed = path.split("/").filter(Boolean);

  if (!parsed.length) {
    return root;
  }

  try {
    const target = root.find([parsed[0]]);

    target.add(parsed[0], write(parsed.slice(1).join("/"), content, target));
  } catch (e) {
    const value = parsed[0].includes(".")
      ? makeFile(parsed[0], content)
      : makeFolder(parsed[0]);

    return write(
      parsed.join("/"),
      content,
      root.add(parsed[0], new TreeNode(value))
    );
  }
};

const read = (path: string) => {
  return tree.find(path.split("/").filter(Boolean)).value.content;
};

const remove = (path: string, root: TreeNode<any> = tree) => {
  const parsed = path.split("/").filter(Boolean);

  if (parsed.length === 1) {
    return root.remove(parsed[0]);
  }

  return root.add(
    parsed[0],
    remove(parsed.slice(1).join("/"), root.find([parsed[0]]))
  );
};

const reset = () => {
  tree = new TreeNode();
};

export { write, read, remove, reset };
