const WINNING_COMBINATIONS = [
    // Rows
    [
      { row: 0, column: 0 },
      { row: 0, column: 1 },
      { row: 0, column: 2 },
      { row: 0, column: 3 }
    ],
    [
      { row: 1, column: 0 },
      { row: 1, column: 1 },
      { row: 1, column: 2 },
      { row: 1, column: 3 }
    ],
    [
      { row: 2, column: 0 },
      { row: 2, column: 1 },
      { row: 2, column: 2 },
      { row: 2, column: 3 }
    ],
    [
      { row: 3, column: 0 },
      { row: 3, column: 1 },
      { row: 3, column: 2 },
      { row: 3, column: 3 }
    ],
  
    // Columns
    [
      { row: 0, column: 0 },
      { row: 1, column: 0 },
      { row: 2, column: 0 },
      { row: 3, column: 0 }
    ],
    [
      { row: 0, column: 1 },
      { row: 1, column: 1 },
      { row: 2, column: 1 },
      { row: 3, column: 1 }
    ],
    [
      { row: 0, column: 2 },
      { row: 1, column: 2 },
      { row: 2, column: 2 },
      { row: 3, column: 2 }
    ],
    [
      { row: 0, column: 3 },
      { row: 1, column: 3 },
      { row: 2, column: 3 },
      { row: 3, column: 3 }
    ],
  
    // Diagonals
    [
      { row: 0, column: 0 },
      { row: 1, column: 1 },
      { row: 2, column: 2 },
      { row: 3, column: 3 }
    ],
    [
      { row: 0, column: 3 },
      { row: 1, column: 2 },
      { row: 2, column: 1 },
      { row: 3, column: 0 }
    ]
  ];

  export default WINNING_COMBINATIONS