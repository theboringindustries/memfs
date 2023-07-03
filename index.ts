import {
  addNode,
  findNode,
  makeNode,
  makeTree,
  removeNode,
  TNode,
  TTree,
} from "./constant";

let tree = makeTree();

const init = () => {
  tree = makeTree();
};

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

type TFSNode = TNode<TFile | TFolder>;

const _write = (path: string, content: any, root: TTree<any> = tree) => {
  const parsed = path.split("/").filter(Boolean);

  if (!parsed.length) {
    return root;
  }

  try {
    const target = findNode(root, [parsed[0]]);

    return addNode(
      removeNode(root, parsed[0]),
      parsed[0],
      write(parsed.slice(1).join("/"), content, target)
    );
  } catch (e) {
    const value = parsed[0].includes(".")
      ? makeFile(parsed[0], content)
      : makeFolder(parsed[0]);

    return write(
      parsed.join("/"),
      content,
      addNode(root, parsed[0], makeNode(value))
    );
  }
};

const read = (path: string) => {
  return findNode(tree, path.split("/").filter(Boolean)).value.content;
};

const _remove = (path: any, root: any = tree) => {
  const parsed = path.split("/").filter(Boolean);

  if (parsed.length === 1) {
    return removeNode(root, parsed[0]);
  }

  return addNode(
    removeNode(root, parsed[0]),
    parsed[0],
    remove(parsed.slice(1).join("/"), findNode(root, [parsed[0]]))
  );
};

const remove = (...args) => {
  // @ts-ignore
  tree = _remove(...args);

  return tree;
};

const write = (...args) => {
  // @ts-ignore
  tree = _write(...args);

  return tree;
};

const reset = init;

init();

export { write, read, remove, reset };
