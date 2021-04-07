// Function for change on dropdown menu
function selectData(selectedID){

    // Check if value is selected in dropdown
    console.log(selectedID);
 
    // Read the json file for the data
    d3.json("samples.json").then((data) => {
 
   //  console.log(data);
 
    // Clears dropdown
    d3.select("#selDataset").html("");   
    
    // Select the metadata array and for each item append the item ID and adds ID to dropdown
    data.metadata.forEach(item =>
         {
          // console.log(item.id);
         d3.select ("#selDataset").append('option').attr('value', item.id).text(item.id);
         });
    // Selected value is passed
    d3.select("#selDataset").node().value = selectedID;
    
    // Filter Metadata for selected ID from dropdown
    const idMetadata = data.metadata.filter(item=> (item.id == selectedID));
       // {
       //    console.log("------------------------")
       //    console.log(item);
       //    console.log(item.id);
          
       // });
    // Check the metadata loaded for the selected ID
    console.log(idMetadata);
    
    const panelDisplay = d3.select("#sample-metadata");
    panelDisplay.html("");
    Object.entries(idMetadata[0]).forEach(item=> 
       {
          // console.log(item);
          panelDisplay.append("p").text(`${item[0]}: ${item[1]}`)
       });
 
    // BAR CHART
 
    // Filter sample array data for the selected ID
    const idSample = data.samples.filter(item => parseInt(item.id) == selectedID);
    
    // // Check values
    // console.log(typeof parseInt(item.id));
    // console.log(idSample[0].sample_values);  
    // console.log(idSample[0].otu_ids);  
    // console.log(idSample[0].otu_labels);  
    
    // Slice top 10 sample values
    var sampleValue = idSample[0].sample_values.slice(0,10);
    sampleValue= sampleValue.reverse();
    var otuID = idSample[0].otu_ids.slice(0,10);
    otuID = otuID.reverse();
    var otuLabels = idSample[0].otu_labels
    otuLabels = otuLabels.reverse();
 
    // // Check values
    //  console.log(sampleValue);
    //  console.log(otuID);
    //  console.log(otuLabels);
 
    // Y axis of bar chart
    const yAxis = otuID.map(item => 'OTU' + " " + item);
       // console.log(yAxis);
    
    // Define the layout and trace object, edit color and orientation
       const trace = {
       y: yAxis,
       x: sampleValue,
       type: 'bar',
       orientation: "h",
       text:  otuLabels,
       marker: {
          color: 'rgb(154, 140, 152)',
          line: {
             width: 3
         }
        }
       },
       layout = {
       title: 'Top 10 Operational Taxonomic Units (OTU)/Individual',
       xaxis: {title: 'Number of Samples Collected'},
       yaxis: {title: 'OTU ID'}
       };
 
       // Plot using Plotly
       Plotly.newPlot('bar', [trace], layout,  {responsive: true});    
       
 // BUBBLE CHART
 
 // Remove Sample value and otuID from individual
 var sampleValue1 =idSample[0].sample_values;
 var otuID1= idSample[0].otu_ids;
 
 // Define the layout and trace object, edit color and orientation
 const trace1 = {
    x: otuID1,
    y: sampleValue1,
    mode: 'markers',
    marker: {
      color: otuID1,
      
      size: sampleValue1
    }
  },
 
  layout1 = {
    title: '<b>Bubble Chart For Each Sample</b>',
    xaxis: {title: 'OTU ID'},
    yaxis: {title: 'Number of Samples Collected'},
    showlegend: false,
    height: 800,
    width: 1800
    };
    
 // Plot using Plotly
 Plotly.newPlot('bubble', [trace1], layout1);
 
 // BONUS: GAUGE CHART

 // Gauge Chart to plot weekly washing frequency 
 const gaugeDisplay = d3.select("#gauge");
 gaugeDisplay.html(""); 
 const washFreq = idMetadata[0].wfreq;
 
 const gaugeData = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: washFreq,
      title: { text: "<b>Belly Button Washing Frequency </b><br> (Scrubs Per Week)" },
      type: "indicator",
      mode: "gauge+number",     
       gauge: {
       axis: { range: [0,9] },
       bar: { color: "#f2e9e4" },
       steps: [
          { range: [0, 1], color: "#e5d5d0" },
          { range: [1, 2], color: "#dbc7c2" },
          { range: [2, 3], color: "#d2b9b4" },
          { range: [3, 4], color: "#c9ada7" },
          { range: [4, 5], color: "#ac9899" },
          { range: [5, 6], color: "#8a7e88" },
          { range: [6, 7], color: "#7d7482" },
          { range: [7, 8], color: "#706a7b" },
          { range: [8, 9], color: "#4a4e69" }
                
        ],
       threshold: {
          value: washFreq
        }
      }
    }
  ]; 
  const gaugeLayout = {  width: 600, 
                   height: 400, 
                   margin: { t: 0, b: 0 }, 
                    };
 
 // Plot using Plotly
  Plotly.newPlot('gauge', gaugeData, gaugeLayout); 
 
 });
 }
 
 // Initial test starts at ID 940
 selectData(940);

 // Event on change takes the value and calls the function during dropdown selection
//  d3.select(".onchange").on("change", function(d) {
//    // recover the option that has been chosen
//    var selectedOption = d3.select(this).property("value")
//    // run the updateChart function with this selected option
//    update(selectedOption)

function optionChanged(id) {
   resetData();
   buildCharts(newSample);
   buildMetadata(newSample);
}

//  });

 init();

// function buildMetadata(sample) {

//    // @TODO: Complete the following function that builds the metadata panel
   
//      // Use d3 to select the panel with id of `#sample-metadata`
//      // Use `.html("") to clear any existing metadata
//      var metadataIDTag = d3.select("#sample-metadata");
//      document.getElementById("sample-metadata").innerHTML = "";
//      //metadataIDTag.innerHTML = '';
//      var ul = metadataIDTag.append('ul'); 
   
     
   
//      // Use `d3.json` to fetch the metadata for a sample
//      var sampleURL = `/metadata/${sample}`;
     
//      d3.json(sampleURL).then(function(data){ 
//        mykeys = d3.keys(data).map(function(x){ return x.toUpperCase() })
//        myvalues = d3.values(data);
//        var myobjects = mykeys.map(function(e, i) {
//          return e + " : "+ myvalues[i] + "</br>";
//        });
      
//        ul.selectAll('li')
//           .data(myobjects)
//           .enter()
//           .append('li')
//           .html(String); 
//      });
//      // BONUS: Build the Gauge Chart
//      // buildGauge(data.WFREQ);
//    }
   
   
   
//    function buildCharts(sample) {
//      var sampleURL = `/samples/${sample}`;
//      d3.json(sampleURL).then(function(data){ 
   
//        // @TODO: Use `d3.json` to fetch the sample data for the plots
//        var otu_ids = [];
//        var otu_labels = [];
//        var sample_values = [];
       
//        //SORT THE ARRAYS BASED ON SAMPLE_VALUES
//          //1) combine the arrays:
//          var list = [];
//          for (var j = 0; j < data.sample_values.length; j++) {
//            list.push({'otu_ids': data.otu_ids[j], 'sample_values': data.sample_values[j], 'otu_labels': data.otu_labels[j]});
//          }
       
//          //2) sort:
//          list.sort(function(a, b) {
//            return ((a.sample_values < b.sample_values) ? -1 : ((a.sample_values == b.sample_values) ? 0 : 1));
//          });
   
//          //3) separate them back out:
//          for (var k = 0; k < list.length; k++) {
//            sample_values[k] = list[k].sample_values;
//            otu_ids[k] = list[k].otu_ids;
//            otu_labels[k]=list[k].otu_labels;
//          }
   
//        // @TODO: Build a Bubble Chart using the sample data
//        var bubbleTrace = {
//          x: otu_ids,
//          y: sample_values,
//          mode: 'markers',
//          marker: {
//            size: sample_values,
//            color: otu_ids,
//            colorscale: "Earth"
//          }
//        };
       
//        var bubbleLayout = {
//          title: `Belly Button Bacteria Bubble Chart for Sample ${sample}`,
//          showlegend: false,
//          xaxis: {
//            title:'otu_ids'
//          },
//          yaxis: {
//            title:'sample_values'
//          }
//        };
//        var bubbleID = document.getElementById('bubble');
//        Plotly.newPlot(bubbleID, [bubbleTrace], bubbleLayout);
//        // @TODO: Build a Pie Chart
     
//        // HINT: You will need to use slice() to grab the top 10 sample_values,
//        // otu_ids, and labels (10 each).
//        var pieTrace = {
//          values: sample_values.slice(0, 10),
//          labels: otu_ids.slice(0, 10),
//          hovertext: otu_labels.slice(0, 10),
//          hoverinfo: 'hovertext',
//          type: 'pie'
//        };
   
//        var pieLayout = {
//          title: `Pie Chart for top 10 Sample Values for Sample ${sample}`,
//        };
     
//        var pieID = document.getElementById('pie');
//        Plotly.plot(pieID, [pieTrace], pieLayout);
   
//      });
   
     
//    }
   
   
//    function init() {
//      // Grab a reference to the dropdown select element
//      var selector = d3.select("#selDataset");
   
//      // Use the list of sample names to populate the select options
//      d3.json("/names").then((sampleNames) => {
//        sampleNames.forEach((sample) => {
//          selector
//            .append("option")
//            .text(sample)
//            .property("value", sample);
//        });
   
//        // Use the first sample from the list to build the initial plots
//        const firstSample = sampleNames[0];
//        buildCharts(firstSample);
//        buildMetadata(firstSample);
//      });
//    }
   
//    function optionChanged(newSample) {
//      //Fetch new data each time a new sample is selected
//      buildCharts(newSample);
//      buildMetadata(newSample);
//    }
   
//    // Initialize the dashboard
//    init();