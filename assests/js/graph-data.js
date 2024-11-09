const dataOptions = {
  averageSalary: [
    { x: 127, y: 202, width: 60, height: 38, value: 316, color: "#F0883A" },
    { x: 272, y: 171, width: 60, height: 69, value: 515, color: "#714169" },
    { x: 417, y: 83, width: 60, height: 77, value: 700, color: "#2B9678" },
    { x: 562, y: 102, width: 60, height: 100, value: 800, color: "#4D9DE0" },  // New bar
  ],
  highestSalary: [
    { x: 127, y: 150, width: 60, height: 70, value: 400, color: "#F0883A" },
    { x: 272, y: 110, width: 60, height: 90, value: 500, color: "#714169" },
    { x: 417, y: 30, width: 60, height: 100, value: 700, color: "#2B9678" },
    { x: 562, y: 80, width: 60, height: 200, value: 900, color: "#4D9DE0" },  // New bar
  ],
  fresherSalary: [
    { x: 127, y: 190, width: 60, height: 50, value: 200, color: "#F0883A" },
    { x: 272, y: 170, width: 60, height: 70, value: 300, color: "#714169" },
    { x: 417, y: 100, width: 60, height: 90, value: 350, color: "#2B9678" },
    { x: 562, y: 160, width: 60, height: 100, value: 450, color: "#4D9DE0" },  // New bar
  ],
  opportunities: [
    { x: 127, y: 100, width: 60, height: 100, value: 800, color: "#F0883A" },
    { x: 272, y: 80, width: 60, height: 170, value: 1000, color: "#714169" },
    { x: 417, y: 30, width: 60, height: 190, value: 1500, color: "#2B9678" },
    { x: 562, y: 60, width: 60, height: 260, value: 2000, color: "#4D9DE0" },  // New bar
  ],
};

const lineGraphData = {
  averageSalary: [316, 515, 700, 800],
  highestSalary: [400, 500, 700, 900],
  fresherSalary: [200, 300, 350, 450],
  opportunities: [800, 1000, 1500, 2000],
};


const svgContainer = document.querySelector(".recharts-surface");
const optionItems = document.querySelectorAll(".option-item");
let currentIndex = 0;
let autoplayInterval;

// Function to render the chart
function renderChart(data) {
  
  svgContainer.innerHTML = ""; // Clear previous content
  drawAxes();
  drawBars(data);
  drawLineGraph(lineGraphData[optionItems[currentIndex].getAttribute("data-type")]);
}

// Draw bars
function drawBars(data, barSpacing = -5) {
  // Define baseX and labelSpacing based on screen size
  let baseX = 130; // Default starting position for larger screens
  let labelSpacing = 140; // Default space between labels for larger screens

  // Adjust values for small screens
  if (window.innerWidth < 368) {
    baseX = 110; // Starting position for very small screens
    labelSpacing = 50; // Smaller space between labels for very small screens
  } else if (window.innerWidth < 568) {
    baseX = 120; // Adjust starting position for small screens
    labelSpacing = 60; // Adjust space between labels for small screens
  }

  data.forEach(({ width, height, value, color }, index) => {
    // Determine the adjusted width based on screen size
    const adjustedWidth = window.innerWidth < 568 ? 30 : width; // Set a smaller width for small screens
    
    // Adjust the x position based on label spacing and index
    const adjustedX = baseX + index * labelSpacing;

    // Create the bar (rect) element
    const rect = createSvgElement("rect", {
      x: adjustedX,
      y: 220 - height,
      width: adjustedWidth, // Use the adjusted width
      height,
      fill: color,
      rx: 5, // Rounded corners
    });
    svgContainer.appendChild(rect);

    // Create the text element above the bar
    const text = createSvgElement("text", {
      x: adjustedX + adjustedWidth / 2, // Center the text in the bar
      y: 220 - height - 10, // Position the text above the bar
      fill: color,
      "text-anchor": "middle",
    });
    text.textContent = value;
    svgContainer.appendChild(text);

    // Create the x-axis label (assuming you have an array of labels corresponding to data)
    const xLabel = createSvgElement("text", {
      x: adjustedX + adjustedWidth / 2, // Center the label below the bar
      y: 230, // Position the label below the bar
      fill: color,
      "text-anchor": "middle",
      class: 'x-label', // Optional class for styling
    });
    
    // Only add x-labels when screen width is less than 568px
    if (window.innerWidth < 568) {
      xLabel.textContent = `202${index + 2}`; // Replace with actual label text
      svgContainer.appendChild(xLabel);
    }
  })    
}



function drawLineGraph(data) {
  // Check if the screen width is less than 568 pixels
  if (window.innerWidth >= 568) {
    const maxValue = Math.max(...data);
    const scaleFactor = 200 / maxValue;
    let linePath = "";

    // Generate the path for the line graph
    data.forEach((value, index) => {
      const xPos = 107 + index * 170; // Adjust spacing to fit four bars
      const yPos = 220 - value * scaleFactor;
      linePath += `${index === 0 ? "M" : "L"} ${xPos} ${yPos} `;
    });

    // Create the arrow marker dynamically
    const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
    marker.setAttribute("id", "arrow");
    marker.setAttribute("viewBox", "0 0 10 10");
    marker.setAttribute("refX", 10);  // Position at the end of the line
    marker.setAttribute("refY", 5);   // Center of the arrowhead
    marker.setAttribute("markerWidth", 5);
    marker.setAttribute("markerHeight", 5);
    marker.setAttribute("orient", "auto");

    const arrowPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    arrowPath.setAttribute("d", "M0,0 L10,5 L0,10 Z"); // Arrow shape
    arrowPath.setAttribute("fill", "#FF5733");          // Arrow color
    marker.appendChild(arrowPath);

    // Append marker to the SVG's <defs> section
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    defs.appendChild(marker);
    svgContainer.appendChild(defs);

    // Create the dotted line
    const dottedLine = document.createElementNS("http://www.w3.org/2000/svg", "path");
    dottedLine.setAttribute("d", linePath.trim());
    dottedLine.setAttribute("stroke", "#FF5733");
    dottedLine.setAttribute("stroke-width", 2);
    dottedLine.setAttribute("fill", "none");
    dottedLine.setAttribute("stroke-dasharray", "5,5");
    dottedLine.setAttribute("marker-end", "url(#arrow)"); // Use the arrow marker
    svgContainer.appendChild(dottedLine);

    // Create the solid line (smooth animation)
    const solidLine = document.createElementNS("http://www.w3.org/2000/svg", "path");
    solidLine.setAttribute("d", linePath.trim());
    solidLine.setAttribute("stroke", "#FF5733");
    solidLine.setAttribute("stroke-width", 2);
    solidLine.setAttribute("fill", "none");
    solidLine.setAttribute("stroke-linecap", "round");
    solidLine.setAttribute("marker-end", "url(#arrow)"); // Use the arrow marker
    solidLine.classList.add("solid-line");
    svgContainer.appendChild(solidLine);
  }
}


// Draw axes

function drawAxes() {
  // X-axis
  const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
  xAxis.setAttribute("class", "axis"); // Add axis class
  xAxis.setAttribute("x1", 100);
  xAxis.setAttribute("y1", 220);
  xAxis.setAttribute("x2", 650);
  xAxis.setAttribute("y2", 220);
  svgContainer.appendChild(xAxis);

  // Y-axis
  const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
  yAxis.setAttribute("class", "axis"); // Add axis class
  yAxis.setAttribute("x1", 100);
  yAxis.setAttribute("y1", 0);
  yAxis.setAttribute("x2", 100);
  yAxis.setAttribute("y2", 220);
  svgContainer.appendChild(yAxis);

  // Y-axis grid lines (dotted lines)
  const yLabels = {
      averageSalary: [0, 200, 400, 600, 800, 1000, 1200],
      highestSalary: [0, 200, 400, 600, 800, 1000, 1200],
      fresherSalary: [0, 50, 100, 150, 200],
      opportunities: [0, 200, 400, 600, 800, 1000, 1200, 1400, 1600],
  };

  const currentType = optionItems[currentIndex].getAttribute("data-type");
  const maxValue = Math.max(...yLabels[currentType]); // Maximum value for scaling
  const scaleFactor = 200 / maxValue; // Scale factor for positioning

  // Draw Y-axis grid lines
  yLabels[currentType].forEach((value) => {
      const yPos = 220 - (value * scaleFactor); // Adjust position for each label
      const dottedLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
      dottedLine.setAttribute("class", "dotted-line"); // Add dotted line class
      dottedLine.setAttribute("x1", 100);
      dottedLine.setAttribute("y1", yPos);
      dottedLine.setAttribute("x2", 20);
      dottedLine.setAttribute("y2", yPos);
      svgContainer.appendChild(dottedLine);
  });

  // X-axis labels

  const years = ["2022", "2023", "2024", "2025"];
  if (window.innerWidth >= 568) { // Check screen width
    years.forEach((year, index) => {
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      const adjustedX = window.innerWidth < 768 ? 120 + index * 90 : 147 + index * 145; // Adjusted x position for small screens
      text.setAttribute("x", adjustedX);
      text.setAttribute("y", 240);
      text.setAttribute("text-anchor", "middle");
      text.classList.add('x-label'); // Add class for styling
      text.textContent = year;
      svgContainer.appendChild(text);
    });
  }
  

  // Y-axis labels
  const yValues = yLabels[currentType];
  yValues.forEach((value) => {
      const yPos = 220 - (value * scaleFactor); // Adjust position for each label
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", 80);
      text.setAttribute("y", yPos);
      text.setAttribute("text-anchor", "end");
      text.textContent = value;
      svgContainer.appendChild(text);
  });
}
// Utility to create SVG elements
function createSvgElement(tag, attrs) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (let key in attrs) el.setAttribute(key, attrs[key]);
  return el;
}

// Update chart
function updateChart(index) {
  currentIndex = index;
  optionItems.forEach((item, i) => item.classList.toggle("active", i === index));
  renderChart(dataOptions[optionItems[index].getAttribute("data-type")]);
}

// Autoplay functions
function startAutoplay() {
  autoplayInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % optionItems.length;
    updateChart(currentIndex);
  }, 4000);
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

// Initialize the chart
updateChart(0);
startAutoplay();

// Add event listeners
optionItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    stopAutoplay();
    updateChart(index);
  });
});
// ---------------------------------when falls for <768px ------------------------
// function changeOption() {
//   // Remove active class from current option and indicator
//   options[currentIndex].classList.remove('active');
//   indicators[currentIndex].classList.remove('active');

//   // Update currentIndex to the next option
//   currentIndex = (currentIndex + 1) % options.length;

//   // Add active class to the next option and indicator
//   options[currentIndex].classList.add('active');
//   indicators[currentIndex].classList.add('active');

//   // Change the chart data based on the active option (optional)
//   updateChartData(options[currentIndex].dataset.type);
// }
// setInterval(changeOption, 3000);

// Initial call to display the first option and indicator
// changeOption();




// -----------------------------------------------------
// function generateBarGraph(dataOptions) {
//   const svg = document.getElementById('barGraph');

//   // Clear existing bars
//   svg.innerHTML = '';

//   // Create a bar for each salary category
//   for (const [category, bars] of Object.entries(dataOptions)) {
//       bars.forEach((barData) => {
//           // Create a rectangle for each bar
//           const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
//           bar.setAttribute("x", barData.x);
//           bar.setAttribute("y", barData.y - barData.height); // Adjust y for height
//           bar.setAttribute("width", barData.width);
//           bar.setAttribute("height", barData.height);
//           bar.setAttribute("fill", barData.color);

//           // Append the bar to the SVG
//           svg.appendChild(bar);

//           // Create a text label for the value
//           const valueText = document.createElementNS("http://www.w3.org/2000/svg", "text");
//           valueText.setAttribute("x", barData.x + barData.width / 2); // Center the text
//           valueText.setAttribute("y", barData.y - barData.height - 5); // Position above the bar
//           valueText.setAttribute("text-anchor", "middle"); // Center the text
//           valueText.setAttribute("fill", "#000"); // Set text color
//           valueText.textContent = barData.value; // Set text content to the value

//           // Append the text to the SVG
//           svg.appendChild(valueText);
//       });
//   }
// }

// // Generate the bar graph
// generateBarGraph(dataOptions);