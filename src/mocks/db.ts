export interface Location {
  id: number;
  name: string;
  robot: {
    id: string;
    is_online: boolean;
  };
}

export const locations: Location[] = [
  {
    id: 0,
    name: "Spicy restaurant",
    robot: {
      id: "abcde123",
      is_online: true,
    },
  },
  {
    id: 1,
    name: "Salty restaurant",
    robot: {
      id: "fghij456",
      is_online: false,
    },
  },
  {
    id: 2,
    name: "Mountain Peak",
    robot: {
      id: "klmno789",
      is_online: true,
    },
  },
  {
    id: 3,
    name: "Sunset Grill",
    robot: {
      id: "pqrst012",
      is_online: false,
    },
  },
  {
    id: 4,
    name: "Urban Diner",
    robot: {
      id: "uvwxy345",
      is_online: true,
    },
  },
  {
    id: 5,
    name: "Blue Lagoon",
    robot: {
      id: "zabcd678",
      is_online: false,
    },
  },
  {
    id: 6,
    name: "Spicy Fiesta",
    robot: {
      id: "efghi910",
      is_online: true,
    },
  },
  {
    id: 7,
    name: "Grill House",
    robot: {
      id: "jklmn112",
      is_online: false,
    },
  },
  {
    id: 8,
    name: "Garden Terrace",
    robot: {
      id: "opqrs314",
      is_online: true,
    },
  },
  {
    id: 9,
    name: "Coconut Grove",
    robot: {
      id: "tuvwx516",
      is_online: false,
    },
  },
  {
    id: 10,
    name: "Sapphire Sands",
    robot: {
      id: "yzabc718",
      is_online: true,
    },
  },
  {
    id: 11,
    name: "Emerald Bay",
    robot: {
      id: "defgh920",
      is_online: false,
    },
  },
  {
    id: 12,
    name: "Crimson Tide",
    robot: {
      id: "ijklm122",
      is_online: true,
    },
  },
  {
    id: 13,
    name: "Breeze Point",
    robot: {
      id: "nopqr324",
      is_online: false,
    },
  },
  {
    id: 14,
    name: "Harvest Moon",
    robot: {
      id: "stuvw526",
      is_online: true,
    },
  },
  {
    id: 15,
    name: "Amber Coast",
    robot: {
      id: "xyztuv738",
      is_online: true,
    },
  },
  {
    id: 16,
    name: "Lotus Blossom",
    robot: {
      id: "abcde963",
      is_online: false,
    },
  },
  {
    id: 17,
    name: "Golden Gate",
    robot: {
      id: "mnopq432",
      is_online: true,
    },
  },
  {
    id: 18,
    name: "Crimson Ember",
    robot: {
      id: "qrstuv729",
      is_online: false,
    },
  },
  {
    id: 19,
    name: "Silver Moon",
    robot: {
      id: "uvwxy530",
      is_online: true,
    },
  },
];
