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
        buildGaugeChart(sampleOne);
    });
};

function buildGaugeChart(sample){
    d3.json(url).then((data)=>{
        let sampleData = data.samples;

        let value = sampleData.filter(result => result.id == sample);

        let valueData = value[0]

        let trace = {
            value: valueData.wfreq,
            type: "indicator",
            mode: "number+delta",
        gauge: {
            axis: { range: [null,9]},
            steps: [
                {range: [0,1]},
                {range: [1,2]},
                {range: [2,3]},
                {range: [3,4]},
                {range: [4,5]},
                {range: [5,6]},
                {range: [6,7]},
                {range: [7,8]},
                {range: [8,9]}
            ],

        },
        colorscale: "sequential"

        };

        Plotly.newPlot('mydiv', trace);
    });
}

init()