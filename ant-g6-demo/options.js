export const default_nodes = [
  {
    name: "root",
    children: [
      {
        name: "child1",
        children: [
          {
            name: "grandchild1",
            children: [
              {
                name: "greatgrandchild1",
                children: [],
              },
              {
                name: "greatgrandchild2",
                children: [],
              },
            ],
          },
          {
            name: "grandchild2",
            children: [],
          },
        ],
      },
      {
        name: "child2",
        children: [
          {
            name: "grandchild3",
            children: [],
          },
          {
            name: "grandchild4",
            children: [],
          },
        ],
      },
    ],
  },
];
export const default_edges = [
  {
    source: "root",
    target: "child1",
  },
  {
    source: "root",
    target: "child2",
  },
  {
    source: "child1",
    target: "grandchild1",
  },
  {
    source: "child1",
    target: "grandchild2",
  },
  {
    source: "grandchild1",
    target: "greatgrandchild1",
  },
  {
    source: "grandchild1",
    target: "greatgrandchild2",
  },
  {
    source: "child2",
    target: "grandchild3",
  },
  {
    source: "child2",
    target: "grandchild4",
  },
];