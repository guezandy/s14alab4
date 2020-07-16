/**
 * @class Donut
 * Reference: https://www.d3-graph-gallery.com/graph/donut_basic.html
 */
class Donut {

    // Elements
    svg = null;
    g = null;
    xAxisG = null;
    yAxisG = null;

    // Configs
    svgW = 360;
    svgH = 360;
    gMargin = { top: 0, right: 0, bottom: 0, left: 0 };
    gW = this.svgW - (this.gMargin.right + this.gMargin.left);
    gH = this.svgH - (this.gMargin.top + this.gMargin.bottom);
    radius = Math.min(this.gW, this.gH) / 2;

    // axies
    scX = null
    scY = null
    yAxis = null
    xAxis = null
    pie = d3.pie().value(d => d.value);
    color = null

    /*
    Constructor
     */
    constructor(_data, _target) {
        // Assign parameters as object fields
        this.data = _data;
        this.target = _target;

        // Now init
        this.init();
    }

    /** @function init()
     * Perform one-time setup function
     *
     * @returns void
     */
    init() {
        // Define this vis
        const vis = this;

        // Set up the svg/g work space
        vis.svg = d3.select(`#${vis.target}`)
            .append('svg')
            .attr('width', vis.svgW)
            .attr('height', vis.svgH);
        vis.g = vis.svg.append('g')
            .attr('class', 'container')
            .style('transform', `translate(${vis.gW / 2}px, ${vis.gH / 2}px)`);

        // Now wrangle
        vis.wrangle();
    }

    /** @function wrangle()
     * Preps data for vis
     *
     * @returns void
     */
    wrangle() {
        // Define this vis
        const vis = this;

        vis.data_bins = vis.pie(d3.entries(vis.data.reduce((total, item) => {
            if (!Object.keys(total).includes(item.prog_lang)) {
                total[item.prog_lang] = 0;
            }
            total[item.prog_lang]++;
            return total;
        }, {})));

        vis.color = d3.scaleOrdinal()
            .domain(vis.data_bins)
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

        // Now render
        vis.render();
    }

    /** @function render()
     * Builds, updates, removes elements in vis
     *
     * @returns void
     */
    render() {
        // Define this vis
        const vis = this;
        vis.g
            .selectAll('whatever')
            .data(vis.data_bins)
            .enter()
            .append('path')
            .attr('d', d3.arc()
                .innerRadius(100)         // This is the size of the donut hole
                .outerRadius(vis.radius)
            )
            .attr('fill', function (d) { return (vis.color(d.data.key)) })
            .attr("stroke", "black")
            .style("stroke-width", "2px")
            .style("opacity", 0.7)
    }
}