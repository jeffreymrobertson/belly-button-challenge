// stoe the url to use in d3
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then(function(data){
    console.log(data);
})


function init(){
    dropDown = d3.select("#selDataset");

    d3.json(url).then(function(data){
        let names = data.names;

        names.forEach((id)=>{
            console.log(id)

            dropDown.append("option")
            .text(id)
            .property("value", id);
        });
        let sampleOne = names[0];

        console.log(sampleOne);

        buildMetaData(sampleOne);
        buildBarChart(sampleOne);
        buildBubbleChart(sampleOne);
    });

};

function buildMetaData(sample){
    d3.json(url).then((data) => {
        let metadata = data.metadata;

        let value = metadata.filter(result =>  result.id == sample)

        console.log(value);

        let valueData = value[0];

        d3.select("#sample-metadata").html("");

        Object.entries(valueData).forEach(([key,value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });

    });
};

function buildBarChart(sample){
    d3.json(url).then((data) => {
        let sampleData = data.samples;

        let value = sampleData.filter(result => result.id == sample);

        let valueData = value[0];

        let sampleValues = valueData.sample_values;
        let otuIds = valueData.otu_ids;
        let otuLabels = valueData.otu_labels;

        console.log(sampleValues,otuIds,otuLabels);

        let yticks = otuIds.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = sampleValues.slice(0,10).reverse()
        let labels = otuLabels.slice(0,10).reverse()
        let trace = {
            x: xticks,
            y: yticks,
            labels: labels,
            type: "bar",
            orientation:"h"
        };

        let layout = {
            title : "Top 10 OTUs Present"
        };

        Plotly.newPlot("bar",[trace],layout)
    })
};

function buildBubbleChart(sample){
    d3.json(url).then((data)=>{
        let sampleData = data.samples;
        let value = sampleData.filter(result => result.id == sample);

        let valueData = value[0];

        let otuIds = valueData.otu_ids;
        let sampleValues = valueData.sample_values;
        let otuLabels = valueData.otu_labels;

        let trace = {
            x: otuIds,
            y: sampleValues,
            text: otuLabels,
            mode: 'markers',
            marker: {
                color: otuIds,
                size: sampleValues,
                colorscale: "Earth"
            }
        };
        let layout = {
            title: "Bacteria Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };
        Plotly.newPlot("bubble",[trace],layout);
    });
};


function optionChanged(value){
    console.log(value);

    buildMetaData(value);
    buildBarChart(value);
    buildBubbleChart(value);
    buildGaugeChart(value);
};

init()