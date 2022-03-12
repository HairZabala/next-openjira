interface SeedData {
  entries: SeedEntry[]
}

interface SeedEntry {
  description: string;
  createdAt: number;
  status: string;
}


export const seedData: SeedData = {
  entries: [
    {
      description: "Proident magna ullamco adipisicing consequat anim.",
      createdAt: Date.now(),
      status: 'pending'
    },
    {
      description: "Eu enim nostrud do amet nostrud officia mollit elit aliquip nulla.",
      createdAt: Date.now() - 1000000,
      status: 'in-progress'
    },
    {
      description: "Sunt magna culpa labore veniam ea sunt culpa excepteur dolore qui excepteur Lorem veniam aliqua.",
      createdAt: Date.now() + 100000,
      status: 'finished'
    },
  ]
}