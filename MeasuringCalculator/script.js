var vesselCount = 1;
var totalVases = 0;
var totalWeight = 0;
function addVesselDetails() {
  var vesselDetailsContainer = document.getElementById('div-wipe');

  var newVesselDetails = document.createElement('div');
  newVesselDetails.className = 'vessel-details';

  newVesselDetails.innerHTML = `
    <span class="input-container">
      <label for="vessel-diameter"></label>
      <input type="number" class="vessel-diameter" placeholder="Burn Hour">
    </span>

    <span class="input-container">
      <label for="vessel-fill-height"></label>
      <input type="number" class="vessel-fill-height" placeholder="Vessel Fill Height">
    </span>

    <span class="input-container">
      <label for="vessel-quantity"></label>
      <input type="number" class="vessel-quantity" placeholder="Vessel Quantity">
    </span>
  `;

  vesselDetailsContainer.appendChild(newVesselDetails);
  vesselCount++;
}

function performCalculations() {
  var vesselDetails = document.getElementsByClassName('vessel-details');
  var resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';
  var metrics = document.getElementById('metrics').value;
  var burnHour = parseFloat(document.getElementById('burn-hour').value);
  for (var i = 0; i < vesselDetails.length; i++) {
    var vesselDiameter = parseFloat(vesselDetails[i].getElementsByClassName('vessel-diameter')[0].value);
    var vesselFillHeight = parseFloat(vesselDetails[i].getElementsByClassName('vessel-fill-height')[0].value);
    var vesselQuantity = parseInt(vesselDetails[i].getElementsByClassName('vessel-quantity')[0].value);

    // Perform calculations
    var sandCandlePerVase = ((vesselDiameter/2)*(vesselDiameter/2)*Math.PI*vesselFillHeight*8.51)/1000;
    var regularSize = 5/sandCandlePerVase;
    var eventSize = 25/sandCandlePerVase;
    var sandCandlesNeeded = sandCandlePerVase*vesselQuantity;
    totalVases = vesselQuantity + totalVases;
    totalWeight = sandCandlesNeeded + totalWeight;
    var sandCandlesUsedPerVessel = (0.050802345*burnHour)+0.12791305;
    var costPerVessel = sandCandlesUsedPerVessel*30;
    var totalSandCandlesUsed = totalVases*sandCandlesUsedPerVessel;
    var totalSandCandlesCost = costPerVessel*totalVases;
    
  }
  // Display the results
  var results = document.createElement('div');
  results.innerHTML = `
    <p>Regular Size: ${Math.round(regularSize)}</p>
    <p>Event Size: ${Math.round(eventSize)}</p>
    <p>Sand Candles Needed (kg): ${sandCandlesNeeded}</p>
    <p>Total Vases: ${totalVases}</p>
    <p>Total Weight (kg): ${totalWeight}</p>
    <p>Sand Candles Used per Vessel (kg): ${sandCandlesUsedPerVessel}</p>
    <p>Cost per Vessel (CAD): ${costPerVessel}</p>
    <p>Total Sand Candles Used (kg): ${totalSandCandlesUsed}</p>
    <p>Total Sand Candles Cost (CAD): ${totalSandCandlesCost}</p>
  `;
  
  resultsContainer.appendChild(results); 
}




// Add event listeners
document.getElementById('calculate-button').addEventListener('click', function() {
  performCalculations();
  document.getElementById('div-wipe').innerHTML = ''; // Clear the input fields
  regularSize = null;
  eventSize = null;
  sandCandlesNeeded = null;
  totalVases = null;
  totalWeight = null;
  sandCandlesUsedPerVessel = null;
  costPerVessel = null;
  totalSandCandlesUsed = null;
  totalSandCandlesCost = null;
});
document.getElementById('add-vessel-button').addEventListener('click', addVesselDetails);