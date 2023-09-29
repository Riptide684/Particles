const canvas_width = 1400;
const canvas_height = 600;
const resolution = 2;
const rows = canvas_height / resolution;
const columns = canvas_width / resolution;
const life_probability = 0.05;

var grid = [];

for (i = 0; i < rows; i++) {
  grid.push([]);
  for (j = 0; j < columns; j++) {
    grid[i].push(Math.random() < life_probability);
  }
}

function setup() {
  createCanvas(canvas_width, canvas_height);
}

function draw() {
  background(0);
  fill(255);
  stroke(0);

  for (i = 0; i < rows; i++) {
    for (j = 0; j < columns; j++) {
      if (grid[i][j]) {
        var x = resolution * j;
        var y = resolution * i;
        rect(x, y, resolution, resolution);
      }
    }
  }

  update_grid();
}


function update_grid() {
  var new_grid = JSON.parse(JSON.stringify(grid));
  for (i = 0; i < rows; i++) {
    for (j = 0; j < columns; j++) {
      var neighbours = count_neighbours(i, j);
      if (grid[i][j]) {
        if (neighbours < 2 || neighbours > 3) {
          new_grid[i][j] = 0;
        }
      } else {
        if (neighbours == 3) {
          new_grid[i][j] = 1;
        }
      }
    }
  }

  grid = new_grid;
}


function count_neighbours(i, j) {
  var total = 0;
  if (i > 0) {
    total += grid[i-1][j];
    if (j > 0) {total += grid[i-1][j-1];}
    if (j < columns - 1) {total += grid[i-1][j+1]}
  }
  if (j > 0) {
    total += grid[i][j-1];
    if (i < rows - 1) {total += grid[i+1][j-1];}
  }
  if (i < rows - 1) {
    total += grid[i+1][j];
    if (j < columns - 1) {total += grid[i+1][j+1];}
  }
  if (j < columns - 1) {total += grid[i][j+1];}

  return total;
}
